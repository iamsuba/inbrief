import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native-appearance';
import Colors from '../constants/Colors'
import moment from 'moment-timezone';
import * as Localization from 'expo-localization'

export default function CalendarDetailedScreen(props) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light


  return (
    <View style={[styles.container, {backgroundColor: Theme.backgroundColor}]}>
      <ScrollView 
        style={[styles.container, {backgroundColor: Theme.backgroundColor}]} 
        contentContainerStyle={styles.contentContainer}>
        <Text allowFontScaling={false} style={[styles.pageTitle, {color: Theme.foregroundColor}]}>Calendar Detailed Page</Text>
      </ScrollView>
    </View>
  );
}

CalendarDetailedScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20
  },
  emptyBookmarksContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBookmarksImage: {
    height: 96,
    width: 96,
  },
  emptyBookmarksMessage: {
      fontSize: 22,
      fontWeight: '200',
      marginTop: 20,
      marginBottom: 25,
      textAlign: 'center'
  }
});
