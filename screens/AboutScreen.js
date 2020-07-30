import * as React from 'react';
import { Image, Button, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Colors from '../constants/Colors'

import PrimaryButton from '../components/PrimaryButton'


export default function AboutScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image 
        style={styles.logo}
        source={require('./../assets/images/logo.png')}
      />
      <Text allowFontScaling={false} style={[styles.pageBody, {color: Theme.foregroundColor}]}>InBrief is a product of InChain Corp. InBrief aims are providing curated crypto news content from select reputed publishers summarized into less than 70 words powered by Artificial Intelligence.</Text>
      <Text allowFontScaling={false} style={[styles.pageBody, {color: Theme.foregroundColor}]}>
      InBrief collects news from reputated blockchain news publishing websites. We do not copy or use thier entire news content. Our AI platform summarizes the news and we publish then in-brief. InBrief also provides credit to the original publisher and provides a link back to the original source of the article.
      </Text>
    </ScrollView>
  );
}

AboutScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    padding: 25,
  },
  logo: {
    height: 72,
    width: 72
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
  },
  pageBody: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: '200',
    textAlign: 'justify',
    lineHeight: 30
  },
  buttonContainer: {
    marginTop: 20
  }
});
