import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HighlightsDetailedScreen from '../screens/HighlightsDetailedScreen'
import PriceMovementsScreen from './../screens/PriceMovementsScreen'
import PriceMovementsDetailedScreen from './../screens/PriceMovementsDetailedScreen'
import OfficialUpdatesScreen from './../screens/OfficialUpdatesScreen'
import OfficialUpdatesDetailedScreen from './../screens/OfficialUpdatesDetailedScreen'
import CalendarScreen from '../screens/CalendarScreen'
import CalendarDetailedScreen from '../screens/CalendarDetailedScreen'
import BookmarksScreen from '../screens/BookmarksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarkDetailedScreen from '../screens/BookmarkDetailedScreen';
import AboutScreen from '../screens/AboutScreen'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
   <Stack.Navigator initialRouteName='HomeScreen'>
     <Stack.Screen name="Home" component={HomeScreen} options={{header: () => null}}/>
     <Stack.Screen name="HighlightsDetailed" component={HighlightsDetailedScreen} options={{header: () => null}}/>
     <Stack.Screen name="PriceMovements" component={PriceMovementsScreen} options={{ title: 'Price Movements' }}/>
     <Stack.Screen name="PriceMovementsDetailed" component={PriceMovementsDetailedScreen} options={{header: () => null}}/>
     <Stack.Screen name="OfficialUpdates" component={OfficialUpdatesScreen} options={{ title: 'Official Updates' }}/>
     <Stack.Screen name="OfficialUpdatesDetailed" component={OfficialUpdatesDetailedScreen} options={{header: () => null}}/>
   </Stack.Navigator>
  )
}

const CalendarStack = () => {
 const Stack = createStackNavigator();
 return (
  <Stack.Navigator initialRouteName='CalendarScreen'>
    <Stack.Screen name="Calendar" component={CalendarScreen} options={{header: () => null}}/>
    <Stack.Screen name="CalendarDetailed" component={CalendarDetailedScreen} />
  </Stack.Navigator>
 )
}

const BookmarksStack = () => {
 const Stack = createStackNavigator();
 return (
  <Stack.Navigator initialRouteName='BookmarksScreen'>
    <Stack.Screen name="Bookmarks" component={BookmarksScreen} options={{header: () => null}}/>
    <Stack.Screen name="BookmarkDetailed" component={BookmarkDetailedScreen} options={{header: () => null}}/>
  </Stack.Navigator>
 )
}

const SettingsStack = () => {
 const Stack = createStackNavigator();
 return (
  <Stack.Navigator initialRouteName='SettingsScreen'>
    <Stack.Screen name="Settings" component={SettingsScreen} options={{header: () => null}}/>
    <Stack.Screen name="About" component={AboutScreen} />
  </Stack.Navigator>
 )
}

export default function BottomTabNavigator({ navigation, route }) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator 
      initialRouteName={INITIAL_ROUTE_NAME} 
      tabBarOptions={
        {
          showLabel: false,
          style: {
            backgroundColor: Theme.tabBar,
            borderTopColor: 'transparent'
          }
        }
      }>
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calendar" />,
        }}
      />
      <BottomTab.Screen
        name="Bookmarks"
        component={BookmarksStack}
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-bookmark" />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Bookmarks':
      return 'Bookmarks';
    case 'Settings':
      return 'Settings';
  }
}
