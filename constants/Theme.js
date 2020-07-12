import React from 'react';
import { Appearance } from 'react-native-appearance'

const tintColor = '#1654F0'
const themeColors = {
  "light": {
    theme: 'light',
    tintColor: tintColor,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColor,
    tabBar: '#fff',
    shadow: '#000',
    icon: '#fff',
    backgroundColor: '#f7f7f7',
    tileColor: '#fff',
    grey: '#d7d7d7',
    darkGrey: '#c3c3c3',
    buttonText: '#fff',
    foregroundColor: '#000'
  },
  "dark": {
    theme: 'dark',
    tintColor: tintColor,
    tabIconDefault: '#555',
    tabIconSelected: tintColor,
    tabBar: '#222',
    shadow: '#000',
    icon: '#fff',
    backgroundColor: '#333',
    tileColor: '#222222',
    grey: '#d7d7d7',
    darkGrey: '#c3c3c3',
    buttonText: '#fff',
    foregroundColor: '#fff'
  }
}

export default function Theme() {

  const [ThemeColorsList, setThemeColorsList] = React.useState(themeColors['light'])
  const osTheme = Appearance.getColorScheme();
  setThemeColorsList[themeColors[osTheme]]

  return (ThemeColorsList);
}


// export default {
//   tintColor,
//   tabIconDefault: '#ccc',
//   tabIconSelected: tintColor,
//   tabBar: '#fff',
//   errorBackground: 'red',
//   errorText: '#fff',
//   warningBackground: '#EAEB5E',
//   warningText: '#666804',
//   noticeBackground: tintColor,
//   noticeText: '#fff',
//   darkGrey: '#333333'
// };
