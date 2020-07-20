import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, Switch } from 'react-native';

import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'


export default function SwitchElement(props) {

  const colorScheme = useColorScheme();
  const Theme = colorScheme === 'light' ? Colors.light : Colors.dark

  const [isEnabled, setIsEnabled] = useState(props.default);
  const toggleSwitch = () => {
    props.onValueChange(!isEnabled);
    setIsEnabled(previousState => !previousState);
  }

  return (
    <Switch
      trackColor={{ false: Theme.backgroundColor, true: Theme.tintColor }}
      thumbColor={Theme.icon}
      ios_backgroundColor={Theme.backgroundColor}
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