import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity, Share } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import AsyncStorage from '@react-native-community/async-storage'
import SourceLogos from './../constants/SourceLogos'
import moment from 'moment-timezone';
import * as Localization from 'expo-localization'
import Layout from './../constants/Layout'
//import * as Device from 'expo-device';
//const DeviceType = Device.getDeviceTypeAsync().then(value => { return(Device.DeviceType[value]) })
//const ImageHeight = (DeviceType == 'TABLET') ? '80%' : '55%'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

import * as firebase from 'firebase'

const firebaseconfig = {
    apiKey: "AIzaSyCbu1l26CLzY4FsThPOyr_XOMQGiIvzVyY",
    authDomain: "market-outlines.firebaseapp.com",
    databaseURL: "https://market-outlines.firebaseio.com",
    projectId: "market-outlines",
    storageBucket: "market-outlines.appspot.com",
    messagingSenderId: "622842250618",
    appId: "1:622842250618:web:78ba56da7bb126496a02c3",
    measurementId: "G-C0J0LRM2XV"
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseconfig)
  }


export default function NewsCard(props) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light
  const NavIcon = (props.bookmark) ? 'md-arrow-round-back' : 'md-home'
  const newsItem =  props.newsItem
  const SourceLogo = SourceLogos[Theme.theme][newsItem.source]
  const Timestamp = new Date(newsItem.timestamp)
  //const LocalTimestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Timestamp)
  const LocalTimestamp = moment(Timestamp).tz(Localization.timezone).format('MMMM Do YYYY, h:mm a')

  const [BookmarkStatus, setBookmarkStatus] = React.useState(false)

  const shareNews = async() => {
    try {
        const result = await Share.share({
            message: '"' + newsItem.title + '."'
                + '\n\n' 
                + newsItem.body 
                + '\n\n\nRead blockchain news curated and summarized by AI with InBrief. Get the app at http://www.InBrief.app',
        });
    } catch(e) {
        console.log(e)
    }
  }

  //AsyncStorage.clear()

  const getBookmarks = async() => {
    try{
      const bookmarksJSON = await AsyncStorage.getItem('@Bookmarks');
      return bookmarksJSON != null ? JSON.parse(bookmarksJSON) : null
    } catch(e) {
      console.log(e)
    }
  }

  const addBookmark = async() => {
    try{
      const bookmarkItem = {}
      bookmarkItem[newsItem.id] = newsItem
      await AsyncStorage.mergeItem('@Bookmarks', JSON.stringify(bookmarkItem))
      setBookmarkStatus(true)

      //getBookmarks().then(value => console.log('\n\n\nAfter Add \n\n\n', value))

    } catch(e) {
      console.log(e)
    }
  }

  const removeBookmark = async() => {
    try{
      await getBookmarks()
      .then(async(bookmarks) => {
        if(delete bookmarks[newsItem.id]) {
          await AsyncStorage.setItem('@Bookmarks', JSON.stringify(bookmarks))
        }
        setBookmarkStatus(false)
        //getBookmarks().then(value => console.log('\n\n\nAfter Remove \n\n\n', value))
      })
    } catch(e) {
      console.log(e)
    }
  }

  getBookmarks()
  .then((bookmarks) => {
    if(bookmarks == null || bookmarks[newsItem.id] == undefined) {
      setBookmarkStatus(false)
    } else {
      setBookmarkStatus(true)
    }
  })

const SourceLogoContainer = SourceLogo !== undefined ? <Image style={styles.sourceImage} source={SourceLogo} /> : <Text allowFontScaling={false} style={[styles.sourceName, {color: Theme.foregroundColor}]}>{newsItem.source}</Text>

  return (
    <View style={[styles.container, {backgroundColor: Theme.backgroundColor}]}>
      <ImageBackground 
        style={styles.imageContainer}
        source={newsItem.imageFile}>
          <View style={styles.menuContainer}>
            <View style={styles.menuRow}>
              <TouchableOpacity 
                style={[styles.menuItem, {backgroundColor: Theme.tintColor, shadowColor: Theme.shadowColor}]}
                onPress={() => props.onPress()}>
                <Ionicons
                  name={NavIcon}
                  size={30}
                  style={{ textAlign: 'center', marginTop: 3 }}
                  color={Theme.icon}
                />
              </TouchableOpacity>
              <View style={styles.secondaryMenuItemsContainer}>
                <TouchableOpacity 
                  style={BookmarkStatus ? [styles.secondaryMenuItemSelected, {backgroundColor: Theme.tintColor}] : [styles.secondaryMenuItem, {backgroundColor: Theme.darkGrey}]}
                  onPress={() => (BookmarkStatus ? removeBookmark() : addBookmark())}>
                  <Ionicons
                    name={'md-bookmark'}
                    size={24}
                    style={{ textAlign: 'center', marginTop: 6 }}
                    color={Theme.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.secondaryMenuItem, {backgroundColor: Theme.darkGrey}]}
                  onPress={() => shareNews()}>
                  <Ionicons
                    name='md-share-alt'
                    size={28}
                    style={{ textAlign: 'center', marginTop: 4 }}
                    color={Theme.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.newsContainer}>
            <View style={[styles.contentContainer, {shadowColor: Theme.shadowColor, backgroundColor: Theme.tileColor}]}>
              <Text allowFontScaling={false} style={[styles.newsTitle, {color: Theme.foregroundColor}]}>{newsItem.title}</Text>
              <Text allowFontScaling={false} style={[styles.newsTimestamp, {color: Theme.foregroundColor}]}>{LocalTimestamp}</Text>
              <Text allowFontScaling={false} style={[styles.newsBody, {color: Theme.foregroundColor}]}>{newsItem.body}</Text>
            </View>
            <TouchableOpacity style={[styles.sourceContainer, {shadowColor: Theme.shadowColor, backgroundColor: Theme.tileColor}]} onPress={() => WebBrowser.openBrowserAsync(newsItem.sourceArticleURL)}>
              <View style={styles.sourceDescContainer}>
                <Text allowFontScaling={false} allowFontScaling={false} style={[styles.sourceText, {color: Theme.foregroundColor}]}>Read the full story in detail at</Text>
                {SourceLogoContainer}
              </View>
              <View style={styles.sourceIconContainer}>
                <Ionicons
                  name='md-arrow-round-forward'
                  size={30}
                  style={{ textAlign: 'center', marginTop: 6 }}
                  color={Theme.tintColor}
                />
              </View>
            </TouchableOpacity>
          </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '55%',
    padding: 20,
    paddingTop: 50
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  menuRow: {
    height: 50,
    flexDirection: 'row',
    flex: 1,
  },
  secondaryMenuItemsContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1
  },
  menuItem: {
    height: 36,
    width: 36,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  secondaryMenuItem: {
    height: 36,
    width: 36,
    borderRadius: 8,
    marginLeft: 10
  },
  secondaryMenuItemSelected: {
    height: 36,
    width: 36,
    borderRadius: 8,
    marginLeft: 10
  },
  newsContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    maxWidth: 500,
  },
  contentContainer: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    padding: 25,
    backgroundColor: 'red',
  },
  newsTitle: {
    fontSize: Layout.fontSize.newsTitle,
    fontWeight: 'bold'
  },
  newsTimestamp: {
    fontSize: 12,
    fontWeight: '100',
    marginTop: 5
  },
  newsBody: {
    fontSize: Layout.fontSize.newsBody,
    fontWeight: '300',
    marginTop: 10,
    textAlign: 'left'
  },
  sourceContainer: {
    backgroundColor: 'white',
    height: 70,
    marginTop: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sourceText: {
    fontSize: 14,
    fontWeight: '100'
  },
  sourceImage: {
    marginTop: 5,
    height: 25,
    width: 125
  },
  sourceName: {
    fontSize: 24,
    marginTop: 5
  }
})