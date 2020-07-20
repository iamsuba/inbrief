import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity, Switch } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

import * as firebase from 'firebase'

const firebaseconfig = {
    apiKey: "AIzaSyCbu1l26CLzY4FsThPOyr_XOMQGiIvzVyY",
    authDomain: "market-outlines.firebaseapp.com",
    databaseURL: "https://market-outlines.firebaseio.com",
    projectId: "market-outlines",
    storageBucket: "market-outlines.appspot.com",
    messagingSenderId: "622842250618",
    appId: "1:622842250618:web:78ba56da7bb126496a02c3",
    measurementId: "G-C0J0LRM2XV"
  }

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseconfig)
}

export default function SettingsScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const Theme = colorScheme === 'light' ? Colors.light : Colors.dark

  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false)
  const [existingStatus, setExistingStatus] = React.useState(Permissions.getAsync(Permissions.NOTIFICATIONS))

  React.useEffect(() => {
    firebase.auth().signInAnonymously().catch(function(error) {});
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          let uid = user.uid
          firebase.database().ref('UserData/'+uid).once('value', async(snapshot) => {
            if(snapshot.val() !== null) {
              setIsNotificationsEnabled(snapshot.val().notificationEnabled)
            }
          });
        }
      });
}, [])

  const toggleNotifications = async(value) => {
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      setExistingStatus(status)
      if (status !== 'granted') {
        return;
      }
    }
    setIsNotificationsEnabled(value)
    firebase.auth().signInAnonymously().catch(function(error) {});
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          let uid = user.uid
          firebase.database().ref("UserData/"+uid+"/notificationEnabled/").set(value)
        }
      });
  }

  return (
    <View style={[styles.container, {backgroundColor: Theme.backgroundColor}]}>
      <ScrollView style={[styles.container, {backgroundColor: Theme.backgroundColor}]} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.pageTitle, {color: Theme.foregroundColor}]}>Settings</Text>
        <View style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}>
  <Text style={[styles.settingName, {color: Theme.foregroundColor}]}>Notifications</Text>
      <Switch
          trackColor={{ false: Theme.backgroundColor, true: Theme.tintColor }}
          thumbColor={Theme.icon}
          ios_backgroundColor={Theme.backgroundColor}
          onValueChange={(value) => toggleNotifications(value)}
          value={isNotificationsEnabled}
        />
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
