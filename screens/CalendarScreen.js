import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native-appearance';
import Colors from '../constants/Colors'
import moment from 'moment-timezone';
import * as Localization from 'expo-localization'
import Layout from './../constants/Layout'

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

export default function CalendarScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light

  const [Events, setEvents] =  React.useState([]);
  const [IsLoading, setIsLoading] = React.useState(true)

  React.useEffect(updateNewsFeed = () => {
    //console.log('Calendar mounted')
    const unsubscribe = navigation.addListener('focus', () => {
      firebase.database().ref('Calendar/').once('value', async(snapshot) => {
          setEvents(Object.values(snapshot.val()))
          setIsLoading(false)
      });
    })

    return () => {
      //console.log('Calendar unmounted')
      unsubscribe
    }
  }, [])

  const getDate = (schedule) => {
    return moment(schedule).format('DD')
  }

  const getMonthYear = (schedule) => {
    return moment(schedule).format('MMMM YYYY')
  }

  const renderEventItems = (event, isToday) => {
    if(isToday) {
      return event.map((item, key) => {
        return (
          <View key={key} style={[styles.eventItemContainer, {borderBottomColor: key==(event.length-1) ? 'transparent' : Theme.tintColor}]}>
            <Text style={[styles.eventItemTitle, {color: Theme.icon}]}>{item.title}</Text>
            <Text style={[styles.eventItemToken, {color: Theme.icon}]}>{item.tokenName} ({item.tokenSymbol})</Text>
          </View>
        )
      })
    } else {
      return event.map((item, key) => {
        return (
          <View key={key} style={[styles.eventItemContainer, {borderBottomColor: key==(event.length-1) ? 'transparent' : Theme.border}]}>
            <Text style={[styles.eventItemTitle, {color: Theme.foregroundColor}]}>{item.title}</Text>
            <Text style={[styles.eventItemToken, {color: Theme.grey}]}>{item.tokenName} ({item.tokenSymbol})</Text>
          </View>
        )
      })
    }
  }

  const renderEventCards = () => {
    if(IsLoading) {
      return (
        <View style={[styles.loadingContainer, {backgroundColor: Theme.fetchingBg}]}>
            <Image
              style={styles.loading}
              source={ colorScheme === 'dark' ? require('./../assets/images/loadingdark.gif') : require('./../assets/images/loading.gif')}/>
              <Text allowFontScaling={false} style={[styles.loadingText, {color: Theme.foregroundColor}]}>Fetching Calendar Events</Text>
        </View>
      )
    } else {
      return Events.map((item, key) => {
        const cardSchedule = Object.values(item)[0].date
        const currentDate = moment().format('YYYY-MM-DD')
        if(moment(currentDate).isAfter(cardSchedule)) {
          return;
        }
        else if(currentDate == cardSchedule) {
          return (
            <View key={key} style={[styles.eventCard, {backgroundColor: Theme.cardTile, shadowColor: Theme.shadow}]}>
              <View style={styles.eventHeader}>
                <View style={styles.eventScheduleContainer}>
                  <Text style={[styles.eventDate, {color: Theme.icon}]}>{getDate(cardSchedule)} </Text>
                  <Text style={[styles.eventMonthYear, {color: Theme.icon}]}>{getMonthYear(cardSchedule)}</Text>
                </View>
                <View style={[styles.todayTile, {backgroundColor: Theme.tintColor}]}>
                  <Text style={[styles.todayText, {color: Theme.icon}]}>Today</Text>
                </View>
              </View>
              {renderEventItems(Object.values(item), true)}
            </View>
          )
        } else {
          return (
            <View key={key} style={[styles.eventCard, {backgroundColor: Theme.tileColor, shadowColor: Theme.shadow}]}>
              <View style={styles.eventHeader}>
                <View style={styles.eventScheduleContainer}>
                  <Text style={[styles.eventDate, {color: Theme.tintColor}]}>{getDate(cardSchedule)} </Text>
                  <Text style={[styles.eventMonthYear, {color: Theme.tintColor}]}>{getMonthYear(cardSchedule)}</Text>
                </View>
              </View>
              {renderEventItems(Object.values(item))}
            </View>
          )
        }
      })
    }
  }

  return (
    <View 
      style={[styles.container, {backgroundColor: Theme.backgroundColor}]}>
      <ImageBackground
        style={styles.imageContainer}
        resizeMethod='resize'
        resizeMode='cover'
        source={require('./../assets/images/calendarbg.png')}>
        <Text allowFontScaling={false} style={[styles.pageTitle, {color: Theme.icon}]}>Calendar</Text>
        <ScrollView 
          style={styles.scrollContainer}  
          contentContainerStyle={styles.contentContainer}>
            {renderEventCards()}
          </ScrollView>
      </ImageBackground>
    </View>
  );
}

CalendarScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
      height: 72,
      width: 72
  },
  loadingText: {
      fontSize: 22,
      marginTop: 15
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    marginBottom: 50
  },
  imageContainer: {
    width: Layout.width,
    flex: 1,
    height: 250
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
    marginHorizontal: 20
  },
  eventCard: {
    borderRadius: 10,
    padding: 25,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15
  },
  eventScheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  eventDate: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  eventMonthYear: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 3
  },
  eventItemContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1
  },
  eventItemTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  eventItemToken: {
    fontSize: 16,
    fontWeight: '200',
    marginTop: 5
  },
  todayTile: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  todayText: {
    fontSize: 18,
    fontWeight: '400'
  }
});
