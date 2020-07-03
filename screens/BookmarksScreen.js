import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import Bookmarks from './../assets/temp/newsFeedData.json'

export default function BookmarksScreen({ navigation }) {

  const BookmarksList = Bookmarks.map((newsItem) => 
    <TouchableOpacity 
      style={styles.newsItemContainer} 
      key={newsItem.id} 
      onPress={() => navigation.navigate('BookmarkDetailed', {
        newsItem: newsItem
      })}>
      <Text style={styles.newsTitle}>{newsItem.title}</Text>
      <Text style={styles.newsTimestamp}>June 2, 2019 at 00:35 pm</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.pageTitle}>Bookmarks</Text>
        {BookmarksList}
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
    backgroundColor: '#f7f7f7',
    padding: 15
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20
  },
  newsItemContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  newsTimestamp: {
    fontSize: 14,
    color: '#c3c3c3',
    marginTop: 10
  }
});
