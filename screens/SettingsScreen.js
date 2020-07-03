import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, Switch, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import SwitchElement from '../components/SwitchElement';

export default function SettingsScreen() {

  const isEnabled = true

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.pageTitle}>Settings</Text>
        <View style={styles.settingsItemContainer}>
          <Text style={styles.settingName}>Dark Mode</Text>
          <SwitchElement default={false}/>
        </View>
        <View style={styles.settingsItemContainer}>
          <Text style={styles.settingName}>Swipe Sound</Text>
          <SwitchElement default={false}/>
        </View>
        <View style={styles.settingsItemContainer}>
          <Text style={styles.settingName}>Notifications</Text>
          <SwitchElement default={true}/>
        </View>
      </ScrollView>
    </View>
  );
}

SettingsScreen.navigationOptions = {
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
  settingsItemContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settingName: {
    fontSize: 20,
    fontWeight: '300'
  }
});
