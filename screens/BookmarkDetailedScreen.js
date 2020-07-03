import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import NewsCard from '../components/NewsCard';

export default function BookmarkDetailedScreen(props) {

  const newsItem = props.route.params.newsItem
  const ImageURL = {uri: newsItem.image}

  return (
    <View style={styles.container}>
      <NewsCard 
        image={ImageURL} 
        title={newsItem.title}
        body={newsItem.body}
        onPress={() => props.navigation.navigate('Root', {
            newsItem: props.route.params.newsItem
        })}
        bookmark={true}
    />
    </View>
  );
}

BookmarkDetailedScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25
  }
});
