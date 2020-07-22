import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import moment from 'moment-timezone';
import * as Localization from 'expo-localization'

export default function HomeScreen(props) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  const newsItem =  props.route.params.newsItem
  const ImageURL = {uri: newsItem.image}
  const Timestamp = new Date(newsItem.timestamp)
  //const LocalTimestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Timestamp)
  const LocalTimestamp = moment(Timestamp).tz(Localization.timezone).format('MMMM Do YYYY, h:mm a')

  return (
    <View style={[styles.container, {backgroundColor: Theme.backgroundColor}]}>
      <Image 
        style={styles.logo}
        source={require('./../assets/images/logo.png')}/>
      <Text allowFontScaling={false} style={[styles.welcomeText, {color: Theme.foregroundColor}]}>Your news feed briefed</Text>
      <TouchableOpacity 
        style={[styles.newsContainer, {backgroundColor: Theme.tileColor, shadowColor: Theme.shadowColor}]}
        onPress={() => props.navigation.navigate('Feed')}>
        <ImageBackground
          style={styles.newsImage}
          source={ImageURL}>
        </ImageBackground>
        <View style={styles.newsContentContainer}>
          <Text allowFontScaling={false} style={[styles.newsTitle, {color: Theme.foregroundColor}]}>{newsItem.title}</Text>
          <Text allowFontScaling={false} style={[styles.newsTimestamp, {color: Theme.foregroundColor}]}>{LocalTimestamp}</Text>
          <Text allowFontScaling={false} style={[styles.newsBody, {color: Theme.foregroundColor}]}>{newsItem.body}</Text>
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
    marginTop: 20,
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
