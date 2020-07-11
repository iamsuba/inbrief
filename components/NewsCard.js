import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity, Share } from 'react-native';

import Colors from '../constants/Colors';
import * as WebBrowser from 'expo-web-browser'
import AsyncStorage from '@react-native-community/async-storage'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function NewsCard(props) {

  const NavIcon = (props.bookmark) ? 'md-arrow-round-back' : 'md-home'
  const newsItem =  props.newsItem
  const ImageURL = {uri: newsItem.image}
  const Timestamp = new Date(newsItem.timestamp)
  const LocalTimestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Timestamp)

  const [BookmarkStatus, setBookmarkStatus] = React.useState(false)

  const shareNews = async() => {
    try {
        const result = await Share.share({
            message: '"' + newsItem.title + '."'
                + '\n\n' 
                + newsItem.body 
                + '\n\n\nRead blockchain news curated and summarized by AI with MarketOutlines. Get the app at http://www.marketoutlines.com',
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
    if(bookmarks[newsItem.id] == undefined) {
      setBookmarkStatus(false)
    } else {
      setBookmarkStatus(true)
    }
  })

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.imageContainer}
        source={ImageURL}>
          <View style={styles.menuContainer}>
            <View style={styles.menuRow}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => props.onPress()}>
                <Ionicons
                  name={NavIcon}
                  size={30}
                  style={{ textAlign: 'center', marginTop: 3 }}
                  color='#fff'
                />
              </TouchableOpacity>
              <View style={styles.secondaryMenuItemsContainer}>
                <TouchableOpacity 
                  style={BookmarkStatus ? styles.secondaryMenuItemSelected : styles.secondaryMenuItem}
                  onPress={() => (BookmarkStatus ? removeBookmark() : addBookmark())}>
                  <Ionicons
                    name={'md-bookmark'}
                    size={24}
                    style={{ textAlign: 'center', marginTop: 6 }}
                    color='#fff'
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.secondaryMenuItem}
                  onPress={() => shareNews()}>
                  <Ionicons
                    name='md-share-alt'
                    size={28}
                    style={{ textAlign: 'center', marginTop: 4 }}
                    color='#fff'
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.newsContainer}>
            <View style={styles.spaceContainer}></View>
            <View style={styles.contentContainer}>
              <Text style={styles.newsTitle}>{newsItem.title}</Text>
              <Text style={styles.newsTimestamp}>{LocalTimestamp}</Text>
              <Text style={styles.newsBody}>{newsItem.body}</Text>
            </View>
            <TouchableOpacity style={styles.sourceContainer} onPress={() => WebBrowser.openBrowserAsync(newsItem.sourceArticleURL)}>
              <View style={styles.sourceDescContainer}>
                <Text style={styles.sourceText}>Read the full story in detail at</Text>
                <Image style={styles.sourceImage} source={require('../assets/temp/coindesk.png')} />
              </View>
              <View style={styles.sourceIconContainer}>
                <Ionicons
                  name='md-arrow-round-forward'
                  size={36}
                  style={{ textAlign: 'center', marginTop: 10 }}
                  color={Colors.tintColor}
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
    position: 'absolute',
    backgroundColor: '#f5f5f5'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '55%',
    padding: 20,
    paddingTop: 50,
  },
  menuContainer: {
    flex: 1
  },
  menuRow: {
    height: 50,
    flexDirection: 'row',
    flex: 1
  },
  secondaryMenuItemsContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1
  },
  menuItem: {
    backgroundColor: Colors.tintColor,
    height: 36,
    width: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  secondaryMenuItem: {
    backgroundColor: Colors.darkGrey,
    height: 36,
    width: 36,
    borderRadius: 8,
    marginLeft: 10
  },
  secondaryMenuItemSelected: {
    backgroundColor: Colors.tintColor,
    height: 36,
    width: 36,
    borderRadius: 8,
    marginLeft: 10
  },
  newsContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    padding: 25
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  newsTimestamp: {
    fontSize: 12,
    fontWeight: '100',
    marginTop: 5
  },
  newsBody: {
    fontSize: 16,
    fontWeight: '200',
    marginTop: 10,
    textAlign: 'left',
    lineHeight: 22
  },
  sourceContainer: {
    backgroundColor: 'white',
    height: 90,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sourceText: {
    fontSize: 14,
    fontWeight: '100'
  },
  sourceImage: {
    marginTop: 10
  }
})