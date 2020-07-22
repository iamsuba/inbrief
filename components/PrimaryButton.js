import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'


export default function PrimaryButton(props) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: Theme.tintColor}]}
        onPress={() => props.onPress()}
        >
          <Text allowFontScaling={false} style={[styles.buttonText, {color: Theme.buttonText}]}>{props.buttonText}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 30
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400'
  }
})