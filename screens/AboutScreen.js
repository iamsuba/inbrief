import * as React from 'react';
import { Image, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Colors from '../constants/Colors'

import PrimaryButton from '../components/PrimaryButton'
import { ScrollView } from 'react-native-gesture-handler';


export default function AboutScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image 
        style={styles.logo}
        source={require('./../assets/images/logo.png')}
      />
      <Text style={[styles.pageTitle, {color: Theme.foregroundColor}]}>About</Text>
      <Text style={[styles.pageBody, {color: Theme.foregroundColor}]}>CryptoInBrief is a product of InChain Corp. CryptoInBrief aims are providing curated crypto news content from select reputed publishers summarized into less than 70 words powered by Artificial Intelligence.</Text>
      <Text style={[styles.pageBody, {color: Theme.foregroundColor}]}>
      CryptoInBrief collects news from reputated blockchain news publishing websites. We do not copy or use thier entire news content. Our AI platform summarizes the news and we publish then in-brief. CryptoInBrief also provides credit to the original publisher and provides a link back to the original source of the article.
      </Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton buttonText='Back' onPress={() => navigation.goBack()} />
      </View>
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
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
  },
  pageBody: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: '200',
  },
  buttonContainer: {
    marginTop: 20
  }
});
