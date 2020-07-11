import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage'

const SCREEN_HEIGHT = Dimensions.get("window").height

export default function BookmarksScreen(props) {

  const [Bookmarks, setBookmarks] = React.useState([])
  const [LoadingComplete, setLoadingComplete] = React.useState(false)

  const getBookmarks = async() => {
    const BookmarksArr = []
    const bookmarks = await AsyncStorage.getItem('@Bookmarks')
    if(bookmarks !== null) {
      Object.entries(JSON.parse(bookmarks)).map(([key, value]) => {
        BookmarksArr.push(value)
      });
    }
    return BookmarksArr
  }

  React.useEffect(() => {  
    getBookmarks().then(response => {
      setBookmarks(response)
      setLoadingComplete(true)
    })
  }, [props.route.params])

  const getLocalTimestamp = (timestamp) => {
    const Timestamp = new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Timestamp)
  }

  const BookmarksList = () => {
    if(Bookmarks.length > 0) {
      return(
        Bookmarks.map((newsItem) => 
          <TouchableOpacity
            style={styles.newsItemContainer} 
            key={newsItem.id} 
            onPress={() => props.navigation.navigate('BookmarkDetailed', {
              newsItem: newsItem
            })}>
            <Text style={styles.newsTitle}>{newsItem.title}</Text>
            <Text style={styles.newsTimestamp}>{getLocalTimestamp(newsItem.timestamp)}</Text>
          </TouchableOpacity>
        )
      )
    } else {
      return (
        <View style={styles.emptyBookmarksContainer}>
          <Image
              style={styles.emptyBookmarksImage}
              source={require('./../assets/images/emptybookmarks.png')}/>
          <Text style={styles.emptyBookmarksMessage}>You do not have any bookmarks saved at the moment</Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.pageTitle}>Bookmarks</Text>
        {BookmarksList()}
      </ScrollView>
    </View>
  );
}

BookmarksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 15,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20
  },
  emptyBookmarksContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBookmarksImage: {
    height: 96,
    width: 96,
  },
  emptyBookmarksMessage: {
      fontSize: 22,
      fontWeight: '200',
      marginTop: 20,
      marginBottom: 25,
      textAlign: 'center'
  },
  newsItemContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  newsTimestamp: {
    fontSize: 14,
    color: '#c3c3c3',
    marginTop: 10
  }
});
