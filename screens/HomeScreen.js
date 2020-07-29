import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import Layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash'
import GetLocalTime from '../utilities/GetLocalTime'

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

export default function HomeScreen(props) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  const [HighlightsFeed, setHighlightsFeed] = React.useState([])

  React.useEffect(updateNewsFeed = () => {
    firebase.database().ref('LatestNews/').once('value', async(snapshot) => {
          const highlightsWithImages = await prepareHighlights(_.filter(snapshot.val(), function(o) { return o.category.highlights }).reverse())
          setHighlightsFeed(highlightsWithImages)
      });
  }, [])

  const prepareHighlights = (highlights) => {
    highlights.map(item => {
        item.imageFile = {uri: item.image}
    })
    return highlights
  }


  const renderHighlights = () => {
    return HighlightsFeed.map(item => {
      return (
        <TouchableOpacity 
          style={[styles.newsItemContainer, {borderBottomColor: Theme.border}]}
          key={item.id}
          onPress={() => props.navigation.navigate('HighlightsDetailed', {
            newsItem: item
          })}>
          <Text style={[styles.newsItemTitle, {color: Theme.foregroundColor}]}>{item.title}</Text>
          <Text style={[styles.newsItemTimestamp, {color: Theme.grey}]}>{GetLocalTime(item.timestamp)}</Text>
        </TouchableOpacity>
      )
    })
  }


  return (
     <ScrollView 
      style={[styles.scrollContainer, {backgroundColor: Theme.tintColor}]} 
      contentContainerStyle={[styles.contentContainer, {backgroundColor: Theme.backgroundColor}]}
      showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={[styles.imageContainer]}
          source={require('../assets/images/homebg.png')}>
          <Image style={styles.logo} source={require('./../assets/images/homelogo.png')}/>
          <TouchableOpacity 
            style={[styles.wideTileContainer, {backgroundColor: Theme.cardTile, shadowColor: Theme.shadow}]}
            onPress={() => props.navigation.navigate('Feed')}>
            <Text style={[styles.tileTitle, {color: Theme.icon}]}>Go to News Feed</Text>
            <Ionicons
              name='md-arrow-forward'
              size={28}
              style={{ textAlign: 'center', marginTop: 4, marginRight: 15 }}
              color={Theme.icon}
            />
          </TouchableOpacity>
          <View style={styles.newsCategoriesContainer}>
            <TouchableOpacity 
              style={[styles.squareTileContainer, {backgroundColor: Theme.cardTile, shadowColor: Theme.shadow, marginRight: 7.5}]}
              onPress={() => props.navigation.navigate('PriceMovements')}>
              <Image style={styles.newsCategoryIcon} source={require('./../assets/images/pricemovements.png')}/>
              <Text style={[styles.tileTitle, {color: Theme.icon}]}>Price{'\n'}Movements</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.squareTileContainer, {backgroundColor: Theme.cardTile, shadowColor: Theme.shadow, marginLeft: 7.5}]}
              onPress={() => props.navigation.navigate('OfficialUpdates')}>
              <Image style={styles.newsCategoryIcon} source={require('./../assets/images/officialupdates.png')}/>
              <Text style={[styles.tileTitle, {color: Theme.icon}]}>Official{'\n'}Updates</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.highlightsContainer}>
          <Text style={styles.highlightsTitle}>Highlights</Text>
          {renderHighlights()}
        </View>
      </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  imageContainer: {
    padding: 20,
    width: Layout.width
  },
  logo: {
    height: 58,
    width: 157,
    marginTop: 50
  },
  wideTileContainer: {
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  newsCategoriesContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  squareTileContainer: {
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
  },
  tileTitle: {
    fontSize: 18
  },
  newsCategoryIcon: {
    height: 36,
    width: 36,
    marginBottom: 10,
    alignSelf: 'flex-end'
  },
  highlightsContainer: {
    padding: 20
  },
  highlightsTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  newsItemContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1
  },
  newsItemTitle: {
    fontSize: 20,
    fontWeight: '300'
  },
  newsItemTimestamp: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5
  }
});
