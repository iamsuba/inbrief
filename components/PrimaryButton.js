import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';


export default function PrimaryButton(props) {
  return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.onPress()}
        >
          <Text style={styles.buttonText}>{props.buttonText}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: Colors.tintColor,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400'
  }
})