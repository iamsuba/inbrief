import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity, Switch } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
import Layout from './../constants/Layout'

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
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

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
      <ImageBackground
        style={styles.imageContainer}
        resizeMethod='resize'
        resizeMode='cover'
        source={require('./../assets/images/settingsbg.png')}>
          <Text allowFontScaling={false} style={[styles.pageTitle, {color: Theme.icon}]}>Settings</Text>
          <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.contentContainer}>
              <View style={[styles.settingsListContainer, {backgroundColor: Theme.tileColor}]}>
                <View style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}>
                  <Text allowFontScaling={false} style={[styles.settingName, {color: Theme.foregroundColor}]}>Notifications</Text>
                  <Switch
                    trackColor={{ false: Theme.grey, true: Theme.tintColor }}
                    thumbColor={Theme.icon}
                    ios_backgroundColor={Theme.backgroundColor}
                    onValueChange={(value) => toggleNotifications(value)}
                    value={isNotificationsEnabled}
                  />
                </View>
                <TouchableOpacity 
                  style={[styles.settingsItemContainer, {borderBottomColor: Theme.border}]}
                  onPress={() => navigation.navigate('About')}>
                  <Text allowFontScaling={false} style={[styles.settingName, {color: Theme.foregroundColor}]}>About</Text>
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
                  <Text allowFontScaling={false} style={[styles.settingName, {color: Theme.foregroundColor}]}>Privacy Policy</Text>
                  <Ionicons
                    name='ios-link'
                    size={28}
                    style={{ textAlign: 'center', marginTop: 4, marginRight: 15 }}
                    color={Theme.tintColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.settingsItemContainer, {borderBottomColor: 'transparent'}]}
                  onPress={() => WebBrowser.openBrowserAsync('https://www.inbrief.app/terms')}>
                  <Text allowFontScaling={false} style={[styles.settingName, {color: Theme.foregroundColor}]}>Terms of Use</Text>
                  <Ionicons
                    name='ios-link'
                    size={28}
                    style={{ textAlign: 'center', marginTop: 4, marginRight: 15 }}
                    color={Theme.tintColor}
                  />
                </TouchableOpacity>
              </View>
          </ScrollView>
      </ImageBackground>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    width: Layout.width,
    flex: 1
  },
  scrollContainer: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column'
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
    paddingHorizontal: 20
  },
  settingsListContainer: {
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    flex: 1
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
