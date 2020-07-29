import * as React from 'react';
import { Image, Button, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Colors from '../constants/Colors'
import GetLocalTime from '../utilities/GetLocalTime';
import _ from 'lodash'

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

export default function PriceMovementsScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  const [PriceMovementsFeed, setPriceMovementsFeed] = React.useState([])

  React.useEffect(updateNewsFeed = () => {
    firebase.database().ref('LatestNews/').once('value', async(snapshot) => {
          const priceMovementsWithImages = await preparePriceMovements(_.filter(snapshot.val(), function(o) { return o.category.priceMovements }).reverse())
          setPriceMovementsFeed(priceMovementsWithImages)
      });
  }, [])

  const preparePriceMovements = (priceMovements) => {
    priceMovements.map(item => {
        item.imageFile = {uri: item.image}
    })
    return priceMovements
  }

  const renderPriceMovements = () => {
    return PriceMovementsFeed.map(item => {
      return (
        <TouchableOpacity 
          style={[styles.newsItemContainer, {borderBottomColor: Theme.border}]}
          key={item.id}
          onPress={() => navigation.navigate('PriceMovementsDetailed', {
            newsItem: item
          })}>
          <Text style={[styles.newsItemTitle, {color: Theme.foregroundColor}]}>{item.title}</Text>
          <Text style={[styles.newsItemTimestamp, {color: Theme.grey}]}>{GetLocalTime(item.timestamp)}</Text>
        </TouchableOpacity>
      )
    })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {renderPriceMovements()}
    </ScrollView>
  );
}

PriceMovementsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 50
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