import React from 'react';
import { 
  Image, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Animated,
  PanResponder,
  Modal } from 'react-native';

import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
//import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import NewsCard from '../components/NewsCard'
import PrimaryButton from '../components/PrimaryButton';
import AsyncStorage from '@react-native-community/async-storage';
import { _ } from 'lodash'
import useColorScheme from '../hooks/useColorScheme';
import * as Device from 'expo-device';

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

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width
let readNewsList = []

export default function FeedScreen(props) {

    //Theme setup beings here
    const colorScheme = useColorScheme();
    const Theme = (colorScheme === 'dark') ? Colors.dark : Colors.light
    //Theme setup ends here

    //Guidance Popup beings here
    const [modalVisible, setModalVisible] = React.useState(false);

    const checkVirgin = async() => {
        const virginStatus = await AsyncStorage.getItem('@virgin')
        if(virginStatus == null) {
            setModalVisible(true)
        }
    }

    const updateVirgin = async() => {
        await AsyncStorage.setItem('@virgin', 'true')
        setModalVisible(false);
    }
    //Guidance Popup ends here

    //News feed preparation begins here
    const [NewsFeed, setNewsFeed] = React.useState([])
    const [LoadingComplete, setLoadingComplete] = React.useState(false)

    const checkIfRead = (newsId) => {
        const matchingList = _.filter(readNewsList, function(o) { return o == newsId })
        if(matchingList.length > 0) {
            return true
        } else {
            return false
        }
    }

    const prepareNewsFeed = (newsFeed) => {

        return newsFeed.map((item, key) => {
            if(checkIfRead(item.id)) {
                item.read = true
            }
            item.imageFile = {uri: item.image}
            return item
        })
    }

    const filterNewsFeed = (newsFeed) => {
        return _.filter(newsFeed, function(o) { return o.read === undefined })
    }

    React.useEffect(updateNewsFeed = () => {
        let mounted = true
        const LatestNewsRef = firebase.database().ref('LatestNews/')
        LatestNewsRef.once('value', async(snapshot) => {
            if(mounted) {
                const readNewsStr = await AsyncStorage.getItem('@ReadNews')
                if(readNewsStr !== null) {
                    readNewsList = (JSON.parse(readNewsStr))
                }
                const newsFeedWithImages = await prepareNewsFeed(snapshot.val().reverse())
                setNewsFeed(filterNewsFeed(newsFeedWithImages))
                setLoadingComplete(true)
                checkVirgin()
                registerForPushNotifications()
            }
        });

        return () => {
            mounted = false
        }
    }, [])

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const position = React.useRef(new Animated.ValueXY()).current
    const swipedCardPosition = React.useRef(new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT })).current

    //Swiping Gestures Handling
    const panResponder = PanResponder.create({

        onStartShouldSetPanResponder: (e, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {

            if (gestureState.dy > 0 && (currentIndex > 0)) {
                //console.log('Swiping down')
                swipedCardPosition.setValue({
                    x: 0, y: -SCREEN_HEIGHT + gestureState.dy
                })
            }
            else {
                //console.log('Swiping Up')
                position.setValue({ x: 0, y: gestureState.dy })

            }
        },
        onPanResponderRelease: (evt, gestureState) => {

            if (currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7) {
                
                //console.log('Successful swipe down release')

                Animated.timing(swipedCardPosition, {
                    toValue: ({ x: 0, y: 0 }),
                    duration: 400,
                    useNativeDriver: false
                }).start(() => {

                    setCurrentIndex(currentIndex - 1)
                    swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })

                })
            }
            else if (-gestureState.dy > 50 && -gestureState.vy > 0.7) {

                //console.log('Successful swipe up release')

                Animated.timing(position, {
                    toValue: ({ x: 0, y: -SCREEN_HEIGHT }),
                    duration: 400,
                    useNativeDriver: false
                }).start(async() => {

                    if(!checkIfRead(NewsFeed[currentIndex].id)) {
                        readNewsList.push(NewsFeed[currentIndex].id)
                        if(readNewsList.length > 50) {
                            readNewsList.shift()
                        }
                        await AsyncStorage.setItem('@ReadNews', JSON.stringify(readNewsList))
                    } 
                    setCurrentIndex(currentIndex + 1)
                    position.setValue({ x: 0, y: 0 })

                })
            }
            else {
                Animated.parallel([
                    Animated.spring(position, {
                        toValue: ({ x: 0, y: 0 }),
                        useNativeDriver: false
                    }),
                    Animated.spring(swipedCardPosition, {
                        toValue: ({ x: 0, y: -SCREEN_HEIGHT }),
                        useNativeDriver: false
                    })

                ]).start()

            }
        }
    })

    const refreshFeed = async(resetRead) => {
        if(resetRead) {
            readNewsList = []
            await AsyncStorage.setItem('@ReadNews', JSON.stringify(readNewsList))
        }
        position.setValue({ x: 0, y: 0 })
        swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })
        setCurrentIndex(0)
        setLoadingComplete(false)
        updateNewsFeed()
    }

    const renderArticles = () => {
        
        if(!LoadingComplete) {
            return (
                <View style={[styles.loadingContainer, {backgroundColor: Theme.fetchingBg}]}>
                    <Image
                        style={styles.loading}
                        source={ colorScheme === 'dark' ? require('./../assets/images/loadingdark.gif') : require('./../assets/images/loading.gif')}/>
                        <Text allowFontScaling={false} style={[styles.loadingText, {color: Theme.foregroundColor}]}>Fetching your news feed</Text>
                </View>
            )
        } 
        else {
            if (currentIndex == NewsFeed.length || NewsFeed.length == 0) {
                return(
                    <View key={'endcard'} style={[styles.endCard, {backgroundColor: Theme.backgroundColor}]}>
                        <Image
                            style={styles.endCardImage}
                            source={require('./../assets/images/endcard.png')}/>
                        <Text allowFontScaling={false} style={[styles.endCardMessage, {color: Theme.foregroundColor}]}>You have caught up with all stories.</Text>
                        <PrimaryButton buttonText='Refresh Feed' onPress={() => refreshFeed(true)} />
                    </View>
                )
            }

            return NewsFeed.map((item, i) => {
    
                if (i == currentIndex - 1) {
    
                    return (
                        <Animated.View key={item.id} style={swipedCardPosition.getLayout()}
                            {...panResponder.panHandlers}
                        >
                            <NewsCard 
                                newsItem={item}
                                onPress={() => props.navigation.navigate('Root', {
                                    newsItem: item
                                })}
                                refreshFeed={() => refreshFeed()}
                                feed={true}
                            />
                        </Animated.View>
                    )
                }
                else if (i < currentIndex) {
                    return null
                }
                if (i == currentIndex) {
    
                    return (
    
                        <Animated.View key={item.id} style={position.getLayout()}
                            {...panResponder.panHandlers}
                        >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                }}>
                                <View style={styles.centeredView}>
                                <View style={[styles.modalView, {backgroundColor: Theme.tileColor}]}>
                                    <Text allowFontScaling={false} style={[styles.modalTitle, {color: Theme.foregroundColor}]}>Get Started</Text>
                                    <View style={styles.modalItem}>
                                        <Image
                                            source={require('./../assets/images/swipeup.png')}
                                            style={styles.modalItemImage}
                                        />
                                        <View style={styles.modalItemTextContainer}>
                                            <Text allowFontScaling={false} style={[styles.modalItemText, {color: Theme.foregroundColor}]}>Swipe up for next article</Text>
                                        </View>
                                    </View>
                                    <View style={styles.modalItem}>
                                        <Image
                                            source={require('./../assets/images/swipedown.png')}
                                            style={styles.modalItemImage}
                                        />
                                        <View style={styles.modalItemTextContainer}>
                                            <Text allowFontScaling={false} style={[styles.modalItemText, {color: Theme.foregroundColor}]}>Swipe down for previous article</Text>
                                        </View>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                    <PrimaryButton buttonText='Okay' onPress={() => updateVirgin()} />
                                    </View>
                                </View>
                                </View>
                            </Modal>
                            <NewsCard 
                                newsItem={item}
                                onPress={() => props.navigation.navigate('Root', {
                                    newsItem: item
                                })}
                                refreshFeed={() => refreshFeed()}
                                feed={true}
                            />
                        </Animated.View>
                    )
                }
                else {
    
                    return (
                        <Animated.View key={item.id}>
                            <NewsCard 
                                newsItem={item}
                                onPress={() => props.navigation.navigate('Root', {
                                    newsItem: item
                                })}
                                refreshFeed={() => refreshFeed()}
                                feed={true}
                            />
                        </Animated.View>
                    )
    
                }
            }).reverse()
        }

    }
    //News feed preparation begins here

    //push notification setup begins here
    registerForPushNotifications = async() => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return;
        }
        const token = await Notifications.getExpoPushTokenAsync();

        const userData = {
            expoToken: token,
            notificationEnabled: true,
            device: {
                brand: Device.brand,
                manufacturer: Device.manufacturer,
                modelName: Device.modelName,
                osVersion: Device.osVersion,
                osName: Device.osName
            }
        }

        firebase.auth().signInAnonymously().catch(function(error) {});
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              let uid = user.uid
              firebase.database().ref('UserData/'+uid).once('value', async(snapshot) => {
                if(snapshot.val() == null) {
                    firebase.database().ref("UserData/"+uid).update(userData)
                }
              });
            }
          });

    }
    //push notification setup ends here
  
    return(
        renderArticles()
    );
  }
  
  FeedScreen.navigationOptions = {
    header: null
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    endCard: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    endCardImage: {
        height: 148,
        width: 148,
    },
    endCardMessage: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 25
    },
    centeredView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background: rgba(0, 0, 0, 0.7)'
    },
    modalView: {
        height: 300,
        width: 300,
        padding: 25,
    },
    modalTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        width: 250,
    },
    modalItemImage: {
        height: 48,
        width: 48
    },
    modalItemTextContainer: {
        marginLeft: 10,
        flex: 1
    },
    modalItemText: {
        fontSize: 16,
        fontWeight: '200',
    },
    buttonContainer: {
        marginTop: 20
    }
});