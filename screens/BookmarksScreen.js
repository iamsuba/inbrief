import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import moment from 'moment-timezone';
import * as Localization from 'expo-localization'
import Layout from './../constants/Layout'

import AsyncStorage from '@react-native-community/async-storage'

const SCREEN_HEIGHT = Dimensions.get("window").height

export default function BookmarksScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  const [Bookmarks, setBookmarks] = React.useState([])

  const getBookmarks = async() => {
    const bookmarks = await AsyncStorage.getItem('@Bookmarks')
    return bookmarks
  }

  React.useEffect(() => {
    //console.log('Bookmarks mounted')
    const unsubscribe = navigation.addListener('focus', () => {
      getBookmarks().then(response => {
        if(response !== null) {
          setBookmarks(Object.values(JSON.parse(response)))
        }
      })
    })

    return () => {
      //console.log('Bookmarks unmounted')
      unsubscribe
    }
  }, [navigation])

  const getLocalTimestamp = (timestamp) => {
    const Timestamp = new Date(timestamp)
    return moment(Timestamp).tz(Localization.timezone).format('MMMM Do YYYY, h:mm a')
  }

  const BookmarksList = () => {
    if(Bookmarks.length > 0) {
      return(
        Bookmarks.map((newsItem) => 
          <TouchableOpacity
            style={[styles.newsItemContainer, {backgroundColor: Theme.tileColor, shadowColor: Theme.shadow}]} 
            key={newsItem.id} 
            onPress={() => navigation.navigate('BookmarkDetailed', {
              newsItem: newsItem
            })}>
            <Text allowFontScaling={false} style={[styles.newsTitle, {color: Theme.foregroundColor}]}>{newsItem.title}</Text>
            <Text allowFontScaling={false} style={[styles.newsTimestamp, {color: Theme.foregroundColor}]}>{getLocalTimestamp(newsItem.timestamp)}</Text>
          </TouchableOpacity>
        )
      )
    } else {
      return (
        <View style={styles.emptyBookmarksContainer}>
          <Image
              style={styles.emptyBookmarksImage}
              source={require('./../assets/images/emptybookmarks.png')}/>
          <Text allowFontScaling={false} style={[styles.emptyBookmarksMessage, {color: Theme.foregroundColor}]}>You do not have any bookmarks saved at the moment</Text>
        </View>
      )
    }
  }

  return (
    <View style={[styles.container, {backgroundColor: Theme.backgroundColor}]}>
      <ImageBackground
        style={styles.imageContainer}
        resizeMethod='resize'
        resizeMode='cover'
        source={require('./../assets/images/bookmarksbg.png')}>
          <Text allowFontScaling={false} style={[styles.pageTitle, {color: Theme.icon}]}>Bookmarks</Text>
          <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.contentContainer}>
            {BookmarksList()}
          </ScrollView>
      </ImageBackground>
    </View>
  );
}

BookmarksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    width: Layout.width,
    flex: 1,
    height: 250
  },
  scrollContainer: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column'
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 40,
    marginHorizontal: 20
  },
  emptyBookmarksContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
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
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginVertical: 5,
    marginHorizontal: 20
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
