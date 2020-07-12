import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import SwitchElement from '../components/SwitchElement';

export default function SettingsScreen() {

  const colorScheme = useColorScheme();
  const Theme = colorScheme === 'light' ? Colors.light : Colors.dark

  const isEnabled = true

  return (
    <View style={[styles.container, {backgroundColor: Theme.backgroundColor}]}>
      <ScrollView style={[styles.container, {backgroundColor: Theme.backgroundColor}]} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.pageTitle, {color: Theme.foregroundColor}]}>Settings</Text>
        <View style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}>
          <Text style={[styles.settingName, {color: Theme.foregroundColor}]}>Dark Mode</Text>
          <SwitchElement default={false}/>
        </View>
        <View style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}>
          <Text style={[styles.settingName, {color: Theme.foregroundColor}]}>Swipe Sound</Text>
          <SwitchElement default={false}/>
        </View>
        <View style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}>
          <Text style={[styles.settingName, {color: Theme.foregroundColor}]}>Notifications</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settingName: {
    fontSize: 20,
    fontWeight: '300'
  }
});
