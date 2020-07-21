import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'

export default function TabBarIcon(props) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Theme.tabIconSelected : Theme.tabIconDefault}
    />
  );
}
