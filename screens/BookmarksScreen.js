import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'

import AsyncStorage from '@react-native-community/async-storage'

const SCREEN_HEIGHT = Dimensions.get("window").height

export default function BookmarksScreen(props) {

  const colorScheme = useColorScheme();
  const Theme = colorScheme === 'light' ? Colors.light : Colors.dark

  const [Bookmarks, setBookmarks] = React.useState([])

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
            style={[styles.newsItemContainer, {borderBottomColor: Theme.border}]} 
            key={newsItem.id} 
            onPress={() => props.navigation.navigate('BookmarkDetailed', {
              newsItem: newsItem
            })}>
            <Text style={[styles.newsTitle, {color: Theme.foregroundColor}]}>{newsItem.title}</Text>
            <Text style={[styles.newsTimestamp, {color: Theme.foregroundColor}]}>{getLocalTimestamp(newsItem.timestamp)}</Text>
          </TouchableOpacity>
        )
      )
    } else {
      return (
        <View style={styles.emptyBookmarksContainer}>
          <Image
              style={styles.emptyBookmarksImage}
              source={require('./../assets/images/emptybookmarks.png')}/>
          <Text style={[styles.emptyBookmarksMessage, {color: Theme.foregroundColor}]}>You do not have any bookmarks saved at the moment</Text>
        </View>
      )
    }
  }

  return (
    <View style={[styles.container, {backgroundColor: Theme.backgroundColor}]}>
      <ScrollView 
        style={[styles.container, {backgroundColor: Theme.backgroundColor}]} 
        contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.pageTitle, {color: Theme.foregroundColor}]}>Bookmarks</Text>
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
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  newsTimestamp: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '200'
  }
});
