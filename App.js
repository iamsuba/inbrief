import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import FeedScreen from './screens/FeedScreen'
import LinkingConfiguration from './navigation/LinkingConfiguration';
import BookmarkDetailedScreen from './screens/BookmarkDetailedScreen';
import AboutScreen from './screens/AboutScreen'

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppearanceProvider>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator initialRouteName='FeedScreen' headerMode='none'>
              <Stack.Screen name="Feed" component={FeedScreen} />
              <Stack.Screen name="BookmarkDetailed" component={BookmarkDetailedScreen} />
              <Stack.Screen name="About" component={AboutScreen} />
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AppearanceProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
