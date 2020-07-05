import React from 'react';
import { 
  Image, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Animated,
  PanResponder } from 'react-native';

import NewsCard from '../components/NewsCard'
import NewsFeedData from '../assets/temp/newsFeedData.json'
import PrimaryButton from '../components/PrimaryButton';

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width


export default function FeedScreen(props) {

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const position = React.useRef(new Animated.ValueXY()).current
    const swipedCardPosition = React.useRef(new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT })).current

    //console.log(position, swipedCardPosition)

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
    }


    const renderArticles = () => {
        //console.log('Rendering')

        return NewsFeedData.map((item, i) => {

            //console.log('currentIndex', currentIndex)
            const ImageURL = {uri: item.image}

            if (i == currentIndex - 1) {

                if (currentIndex == 10) {
                    return(
                        <View key={'endcard'} style={styles.endCard}>
                            <Image
                                style={styles.endCardImage}
                                source={require('./../assets/images/endcard.png')}/>
                            <Text style={styles.endCardMessage}>You have caught up with all stories.</Text>
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
                                image={ImageURL} 
                                title={item.title}
                                body={item.body}
                                onPress={() => props.navigation.navigate('Root', {
                                    newsItem: {
                                        image: ImageURL,
                                        title: item.title,
                                        body: item.body
                                    }
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
                            image={ImageURL} 
                            title={item.title}
                            body={item.body}
                            onPress={() => props.navigation.navigate('Root', {
                                image: ImageURL,
                                title: item.title,
                                body: item.body
                            })}
                        />
                    </Animated.View>
                )
            }
            else {

                return (
                    <Animated.View key={item.id}>
                        <NewsCard 
                            image={ImageURL} 
                            title={item.title}
                            body={item.body}
                        />
                    </Animated.View>
                )

            }
        }).reverse()

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
    endCard: {
        backgroundColor: '#f7f7f7',
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