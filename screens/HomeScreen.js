import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useLinkProps } from '@react-navigation/native';
import FeedScreen from './FeedScreen';

export default function HomeScreen(props) {

  const newsItem =  props.route.params

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={require('./../assets/images/logo.png')}/>
      <Text style={styles.welcomeText}>Your news feed briefed</Text>
      <TouchableOpacity 
        style={styles.newsContainer}
        onPress={() => props.navigation.navigate('Feed')}>
        <ImageBackground
          style={styles.newsImage}
          source={newsItem.image}>
        </ImageBackground>
        <View style={styles.newsContentContainer}>
          <Text style={styles.newsTitle}>{newsItem.title}</Text>
          <Text style={styles.newsTimestamp}>Jun 19, 2020 at 14:08 UTC</Text>
          <Text style={styles.newsBody}>{newsItem.body}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 15
  },
  logo: {
    height: 48,
    width: 48,
    marginTop: 50
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 10
  },
  newsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  newsImage: {
    flex: 2
  },
  newsContentContainer: {
    flex: 3,
    padding: 20
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
    lineHeight: 22,
    flexShrink: 1
  },

});
