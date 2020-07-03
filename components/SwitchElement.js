import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, Switch } from 'react-native';

import Colors from '../constants/Colors';


export default function SwitchElement(props) {

  const [isEnabled, setIsEnabled] = useState(props.default);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  return (
    <Switch
      trackColor={{ false: "#c6c6c6", true: Colors.tintColor }}
      thumbColor={isEnabled ? "#fff" : "#fff"}
      ios_backgroundColor="#c6c6c6"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
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