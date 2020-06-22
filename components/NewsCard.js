import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, Dimensions } from 'react-native';

import Colors from '../constants/Colors';
import * as WebBrowser from 'expo-web-browser'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function NewsCard(props) {
  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.imageContainer}
        source={props.image}>
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
              <Text style={styles.newsTitle}>{props.title}</Text>
              <Text style={styles.newsTimestamp}>Jun 19, 2020 at 14:08 UTC</Text>
              <Text style={styles.newsBody}>{props.body}</Text>
            </View>
            <TouchableOpacity style={styles.sourceContainer} onPress={() => WebBrowser.openBrowserAsync('https://www.coindesk.com/kin-community-approves-move-from-stellar-fork-to-solanas-blockchain')}>
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
            </TouchableOpacity>
          </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '55%',
    padding: 20,
    paddingTop: 50,
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
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
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
    textAlign: 'left',
    lineHeight: 22
  },
  sourceContainer: {
    backgroundColor: 'white',
    height: 90,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
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
})