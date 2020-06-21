import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, ImageBackground, rgba, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, Directions } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function FeedScreenOld() {

  const image = { uri: "https://static.coindesk.com/wp-content/uploads/2020/06/generic-price-chart-710x458.jpg" };

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.imageContainer}
        source={image}>
          <View style={styles.menuContainer}>
            <View style={styles.menuRow}>
              <View style={styles.menuItem}>
                <Ionicons
                  name='md-home'
                  size={30}
                  style={{ textAlign: 'center', marginTop: 3 }}
                  color='#fff'
                />
              </View>
              <View style={styles.secondaryMenuItemsContainer}>
                <View style={styles.secondaryMenuItem}>
                  <Ionicons
                    name='md-bookmark'
                    size={24}
                    style={{ textAlign: 'center', marginTop: 6 }}
                    color='#fff'
                  />
                </View>
                <View style={styles.secondaryMenuItem}>
                  <Ionicons
                    name='md-share-alt'
                    size={28}
                    style={{ textAlign: 'center', marginTop: 4 }}
                    color='#fff'
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.newsContainer}>
            <View style={styles.spaceContainer}></View>
            <View style={styles.contentContainer}>
              <Text style={styles.newsTitle}>First Mover: Compound’s COMP Token More Than Doubles in Price Amid DeFi Mania</Text>
              <Text style={styles.newsTimestamp}>Jun 19, 2020 at 14:08 UTC</Text>
              <Text style={styles.newsBody}>The token is so new that not even cryptocurrency data sites are using consistent methodologies for deriving COMP’s market value. The website DeFi Market Cap bases the calculation on the 10 million tokens in existence, for a market value of about $2 billion. But CoinGecko bases its figure on a circulating supply of 2.56 million tokens, for a market value of $537 million.</Text>
            </View>
            <View style={styles.sourceContainer}>
              <View style={styles.sourceDescContainer}>
                <Text style={styles.sourceText}>Read the full story in detail at</Text>
                <Image style={styles.sourceImage} source={require('../assets/temp/coindesk.png')} />
              </View>
              <View style={styles.sourceIconContainer}>
                <Ionicons
                  name='md-arrow-round-forward'
                  size={36}
                  style={{ textAlign: 'center', marginTop: 10 }}
                  color={Colors.tintColor}
                />
              </View>
            </View>
          </View>
      </ImageBackground>
    </View>
  );
}

FeedScreenOld.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '55%',
    padding: 20,
    paddingTop: 50
  },
  menuContainer: {
    flex: 1
  },
  menuRow: {
    height: 50,
    flexDirection: 'row',
    flex: 1
  },
  secondaryMenuItemsContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1
  },
  menuItem: {
    backgroundColor: Colors.tintColor,
    height: 36,
    width: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  secondaryMenuItem: {
    backgroundColor: Colors.darkGrey,
    height: 36,
    width: 36,
    borderRadius: 8,
    marginLeft: 10
  },
  newsContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  contentContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 25
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
    textAlign: 'justify',
    lineHeight: 20
  },
  sourceContainer: {
    backgroundColor: 'white',
    height: 90,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sourceText: {
    fontSize: 14,
    fontWeight: '100'
  },
  sourceImage: {
    marginTop: 10
  }
});
