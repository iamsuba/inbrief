import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'

export default function GetSavedTheme(props) {

  const SavedTheme = async() => {
    return await AsyncStorage.getItem('@Theme')
  }
  SavedTheme().then(value => {
    console.log(value);
    return value
  })
}