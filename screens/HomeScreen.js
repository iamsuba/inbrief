import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import moment from 'moment-timezone';
import * as Localization from 'expo-localization'
import Layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen(props) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  return (
    // <View style={styles.container}>
     <ScrollView 
      style={[styles.scrollContainer, {backgroundColor: Theme.tintColor}]} 
      contentContainerStyle={[styles.contentContainer, {backgroundColor: Theme.backgroundColor}]}
      showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={[styles.imageContainer]}
          source={require('../assets/images/homebg.png')}>
          <Image style={styles.logo} source={require('./../assets/images/homelogo.png')}/>
          <View style={[styles.wideTileContainer, {backgroundColor: Theme.cardTile, shadowColor: Theme.shadow}]}>
            <Text style={[styles.tileTitle, {color: Theme.icon}]}>Go to News Feed</Text>
            <Ionicons
              name='md-arrow-forward'
              size={28}
              style={{ textAlign: 'center', marginTop: 4, marginRight: 15 }}
              color={Theme.icon}
            />
          </View>
          <View style={styles.newsCategoriesContainer}>
            <View style={[styles.squareTileContainer, {backgroundColor: Theme.cardTile, shadowColor: Theme.shadow, marginRight: 7.5}]}>
              <Image style={styles.newsCategoryIcon} source={require('./../assets/images/pricemovements.png')}/>
              <Text style={[styles.tileTitle, {color: Theme.icon}]}>Price Movements</Text>
            </View>
            <View style={[styles.squareTileContainer, {backgroundColor: Theme.cardTile, shadowColor: Theme.shadow, marginLeft: 7.5}]}>
              <Image style={styles.newsCategoryIcon} source={require('./../assets/images/officialupdates.png')}/>
              <Text style={[styles.tileTitle, {color: Theme.icon}]}>Official Announcements</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.highlightsContainer}>
          <Text style={styles.highlightsTitle}>Today's Highlights</Text>
          <View style={[styles.newsItemContainer, {borderBottomColor: Theme.border}]}>
            <Text style={[styles.newsItemTitle, {color: Theme.foregroundColor}]}>3 Reasons Bitcoin’s Price Could Soon Rise to $10K</Text>
            <Text style={[styles.newsItemTimestamp, {color: Theme.grey}]}>Jul 23, 2020 at 11:55</Text>
          </View>
          <View style={[styles.newsItemContainer, {borderBottomColor: Theme.border}]}>
            <Text style={[styles.newsItemTitle, {color: Theme.foregroundColor}]}>3 Reasons Bitcoin’s Price Could Soon Rise to $10K</Text>
            <Text style={[styles.newsItemTimestamp, {color: Theme.grey}]}>Jul 23, 2020 at 11:55</Text>
          </View>
          <View style={[styles.newsItemContainer, {borderBottomColor: Theme.border}]}>
            <Text style={[styles.newsItemTitle, {color: Theme.foregroundColor}]}>3 Reasons Bitcoin’s Price Could Soon Rise to $10K</Text>
            <Text style={[styles.newsItemTimestamp, {color: Theme.grey}]}>Jul 23, 2020 at 11:55</Text>
          </View>
          <View style={[styles.newsItemContainer, {borderBottomColor: Theme.border}]}>
            <Text style={[styles.newsItemTitle, {color: Theme.foregroundColor}]}>3 Reasons Bitcoin’s Price Could Soon Rise to $10K</Text>
            <Text style={[styles.newsItemTimestamp, {color: Theme.grey}]}>Jul 23, 2020 at 11:55</Text>
          </View>
          <View style={[styles.newsItemContainer, {borderBottomColor: Theme.border}]}>
            <Text style={[styles.newsItemTitle, {color: Theme.foregroundColor}]}>3 Reasons Bitcoin’s Price Could Soon Rise to $10K</Text>
            <Text style={[styles.newsItemTimestamp, {color: Theme.grey}]}>Jul 23, 2020 at 11:55</Text>
          </View>
        </View>
      </ScrollView>
    // </View>
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
