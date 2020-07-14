import React from 'react';
import { 
  Image, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Animated,
  PanResponder } from 'react-native';

import { useColorScheme } from 'react-native-appearance';
import Colors from './../constants/Colors'
import NewsCard from '../components/NewsCard'
import PrimaryButton from '../components/PrimaryButton';

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

export default function FeedScreen(props) {

    const colorScheme = useColorScheme();
    const Theme = colorScheme === 'light' ? Colors.light : Colors.dark

    const [NewsFeed, setNewsFeed] = React.useState([])
    const [LoadingComplete, setLoadingComplete] = React.useState(false)

    React.useEffect(updateNewsFeed = () => {

        firebase.database().ref('LatestNews/').once('value', (snapshot) => {
            setNewsFeed(snapshot.val().reverse())
            setLoadingComplete(true)
            renderArticles()
        });
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
                    duration: 400
                }).start(() => {

                    setCurrentIndex(currentIndex - 1)
                    swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })

                })
            }
            else if (-gestureState.dy > 50 && -gestureState.vy > 0.7) {

                //console.log('Successful swipe up release')

                Animated.timing(position, {
                    toValue: ({ x: 0, y: -SCREEN_HEIGHT }),
                    duration: 400
                }).start(() => {

                    setCurrentIndex(currentIndex + 1)
                    position.setValue({ x: 0, y: 0 })

                })
            }
            else {
                Animated.parallel([
                    Animated.spring(position, {
                        toValue: ({ x: 0, y: 0 })
                    }),
                    Animated.spring(swipedCardPosition, {
                        toValue: ({ x: 0, y: -SCREEN_HEIGHT })
                    })

                ]).start()

            }
        }
    })

    const refreshFeed = () => {
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
                        source={ colorScheme === 'light' ? require('./../assets/images/loading.gif') : require('./../assets/images/loadingdark.gif')}/>
                        <Text style={[styles.loadingText, {color: Theme.foregroundColor}]}>Fetching your news feed</Text>
                </View>
            )
        } 
        else {
            return NewsFeed.map((item, i) => {
    
                if (i == currentIndex - 1) {
    
                    if (currentIndex == NewsFeed.length) {
                        return(
                            <View key={'endcard'} style={[styles.endCard, {backgroundColor: Theme.backgroundColor}]}>
                                <Image
                                    style={styles.endCardImage}
                                    source={require('./../assets/images/endcard.png')}/>
                                <Text style={[styles.endCardMessage, {color: Theme.foregroundColor}]}>You have caught up with all stories.</Text>
                                <PrimaryButton buttonText='Refresh Feed' onPress={() => refreshFeed()} />
                            </View>
                        )
                    }
                    else {
                        return (
                            <Animated.View key={item.id} style={swipedCardPosition.getLayout()}
                                {...panResponder.panHandlers}
                            >
                                <NewsCard 
                                    newsItem={item}
                                    onPress={() => props.navigation.navigate('Root', {
                                        newsItem: item
                                    })}
                                />
                            </Animated.View>
                        )
                    }
                }
                else if (i < currentIndex) {
                    return null
                }
                if (i == currentIndex) {
    
                    return (
    
                        <Animated.View key={item.id} style={position.getLayout()}
                            {...panResponder.panHandlers}
                        >
                            <NewsCard 
                                newsItem={item}
                                onPress={() => props.navigation.navigate('Root', {
                                    newsItem: item
                                })}
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
                            />
                        </Animated.View>
                    )
    
                }
            }).reverse()
        }

    }
  
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
    }
});