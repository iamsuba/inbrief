import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import NewsCard from '../components/NewsCard';

export default function HighlightsDetailedScreen(props) {

  const newsItem = props.route.params.newsItem

  return (
    <View style={styles.container}>
      <NewsCard 
        newsItem={newsItem}
        onPress={() => props.navigation.goBack()}
        bookmark={true}
    />
    </View>
  );
}

HighlightsDetailedScreen.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25
  }
});
