import * as React from 'react';
import { Image, Button, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Colors from '../constants/Colors'
import * as Device from 'expo-device';

import PrimaryButton from '../components/PrimaryButton'

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


export default function FeedbackScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  const [FeedbackText, setFeedbackText] = React.useState('')

  const submitFeedback = () => {
    if(FeedbackText.length > 0) {
      const timestamp = new Date().getTime()
      const feedbackData = {
        feedback: FeedbackText.toString(),
        device: {
          brand: Device.brand,
          manufacturer: Device.manufacturer,
          modelName: Device.modelName,
          osVersion: Device.osVersion,
          osName: Device.osName
        }
      }
      firebase.database().ref("Feedback/"+timestamp).set(feedbackData, () => {
        alert('Thank you for taking the time to convey your feedback.')
        setFeedbackText('')
      })
    } else {
      alert('Please provide some feedback')
    }
  }

  return (
    <ScrollView 
      style={[styles.container, {backgroundColor: Theme.backgroundColor}]} 
      contentContainerStyle={[styles.contentContainer, {backgroundColor: Theme.backgroundColor}]}>
      <Text allowFontScaling={false} style={[styles.pageTitle, {color: Theme.grey}]}>Let us know what we can improve. You like something please let us know that too.</Text>
      <View style={[styles.textInputContainer, {backgroundColor: Theme.tileColor}]}>
        <TextInput
          placeholder="enter your feedback here"
          onChangeText={(value) => setFeedbackText(value)}
          style={[styles.textInput, {color: Theme.foregroundColor}]}
          numberOfLines={5}
          multiline
          value={FeedbackText} />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton buttonText='Submit' onPress={() => submitFeedback()} />
      </View>
    </ScrollView>
  );
}

FeedbackScreen.navigationOptions = {
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
  textInputContainer: {
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 25,
  },
  textInput: {
    width: '100%',
    height: 200,
    fontSize: 22,
    fontWeight: '600'
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 20,
    textAlign: 'center'
  },
  pageBody: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: '200',
    textAlign: 'justify',
    lineHeight: 30
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%'
  }
});
