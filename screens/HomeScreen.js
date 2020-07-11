import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

export default function HomeScreen(props) {

  const newsItem =  props.route.params.newsItem
  const ImageURL = {uri: newsItem.image}
  const Timestamp = new Date(newsItem.timestamp)
  const LocalTimestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Timestamp)

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
          source={ImageURL}>
        </ImageBackground>
        <View style={styles.newsContentContainer}>
          <Text style={styles.newsTitle}>{newsItem.title}</Text>
          <Text style={styles.newsTimestamp}>{LocalTimestamp}</Text>
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
