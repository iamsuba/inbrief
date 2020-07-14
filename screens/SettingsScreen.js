import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import SwitchElement from '../components/SwitchElement';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const Theme = colorScheme === 'light' ? Colors.light : Colors.dark

  const isEnabled = true

  return (
    <View style={[styles.container, {backgroundColor: Theme.backgroundColor}]}>
      <ScrollView style={[styles.container, {backgroundColor: Theme.backgroundColor}]} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.pageTitle, {color: Theme.foregroundColor}]}>Settings</Text>
        <View style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}>
          <Text style={[styles.settingName, {color: Theme.foregroundColor}]}>Notifications</Text>
          <SwitchElement default={true}/>
        </View>
        <TouchableOpacity 
          style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}
          onPress={() => navigation.navigate('About')}>
          <Text style={[styles.settingName, {color: Theme.foregroundColor}]}>About</Text>
          <Ionicons
            name='ios-arrow-forward'
            size={28}
            style={{ textAlign: 'center', marginTop: 4, marginRight: 15 }}
            color={Theme.foregroundColor}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}
          onPress={() => WebBrowser.openBrowserAsync('https://www.inbrief.app/privacy')}>
          <Text style={[styles.settingName, {color: Theme.foregroundColor}]}>Privacy Policy</Text>
          <Ionicons
            name='ios-link'
            size={28}
            style={{ textAlign: 'center', marginTop: 4, marginRight: 15 }}
            color={Theme.tintColor}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}
          onPress={() => WebBrowser.openBrowserAsync('https://www.inbrief.app/terms')}>
          <Text style={[styles.settingName, {color: Theme.foregroundColor}]}>Terms of Use</Text>
          <Ionicons
            name='ios-link'
            size={28}
            style={{ textAlign: 'center', marginTop: 4, marginRight: 15 }}
            color={Theme.tintColor}
          />
        </TouchableOpacity>
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
