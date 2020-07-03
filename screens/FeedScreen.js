import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { 
  Image, 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Animated,
  PanResponder,
  Modal } from 'react-native';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import NewsCard from '../components/NewsCard'
import NewsFeedData from '../assets/temp/newsFeedData.json'
import PrimaryButton from '../components/PrimaryButton';

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

class FeedScreen extends React.Component {


    constructor(props) {
        super(props)

        this.position = new Animated.ValueXY()
        this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT })

        this.state = {
            currentIndex: 0
        }

    }

    componentWillMount() {

        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                if (gestureState.dy > 0 && (this.state.currentIndex > 0)) {
                    //console.log('Swiping down')
                    this.swipedCardPosition.setValue({
                        x: 0, y: -SCREEN_HEIGHT + gestureState.dy
                    })
                }
                else {
                    //console.log('Swiping Up')
                    this.position.setValue({ x: 0, y: gestureState.dy })

                }
            },
            onPanResponderRelease: (evt, gestureState) => {

                if (this.state.currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7) {
                    
                    //console.log('Successful swipe down release')

                    Animated.timing(this.swipedCardPosition, {
                        toValue: ({ x: 0, y: 0 }),
                        duration: 400
                    }).start(() => {

                        this.setState({ currentIndex: this.state.currentIndex - 1 })
                        this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })

                    })
                }
                else if (-gestureState.dy > 50 && -gestureState.vy > 0.7) {

                    //console.log('Successful swipe up release')

                    Animated.timing(this.position, {
                        toValue: ({ x: 0, y: -SCREEN_HEIGHT }),
                        duration: 400
                    }).start(() => {

                        this.setState({ currentIndex: this.state.currentIndex + 1 })
                        this.position.setValue({ x: 0, y: 0 })

                    })
                }
                else {
                    Animated.parallel([
                        Animated.spring(this.position, {
                            toValue: ({ x: 0, y: 0 })
                        }),
                        Animated.spring(this.swipedCardPosition, {
                            toValue: ({ x: 0, y: -SCREEN_HEIGHT })
                        })

                    ]).start()

                }
            }
        })

    }
    
    refreshFeed = () => {
        this.position = new Animated.ValueXY()
        this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT })
        this.setState({ currentIndex: 0 })
    }

    renderArticles = () => {

        // //console.log('props in feed', this.props)
        // if(this.props.route.params) {
        //     this.setState({
        //         currentIndex: this.props.route.params.currentIndex
        //     })
        // }

        return NewsFeedData.map((item, i) => {


            const ImageURL = {uri: item.image}

            //console.log("i", i, "currentIndex", this.state.currentIndex)


            if (i == this.state.currentIndex - 1) {

                //console.log('This card has been swiped up recently')

                if (this.state.currentIndex == 10) {
                    //console.log('::::::::End of cards detected::::::::::::')
                    return(
                        <View key={'endcard'} style={styles.endCard}>
                            <Image
                                style={styles.endCardImage}
                                source={require('./../assets/images/endcard.png')}/>
                            <Text style={styles.endCardMessage}>You have caught up with all stories.</Text>
                            <PrimaryButton buttonText='Refresh Feed' onPress={() => this.refreshFeed()} />
                        </View>
                    )
                }
                else {
                    return (
                        <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                            <NewsCard 
                                image={ImageURL} 
                                title={item.title}
                                body={item.body}
                                onPress={() => this.props.navigation.navigate('Root', {
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
            else if (i < this.state.currentIndex) {
                //console.log("before returning null", i, this.state.currentIndex)
                return null
            }
            if (i == this.state.currentIndex) {

                //console.log('This card is the active card on display')

                return (

                    <Animated.View key={item.id} style={this.position.getLayout()}
                        {...this.PanResponder.panHandlers}
                    >
                        <NewsCard 
                            image={ImageURL} 
                            title={item.title}
                            body={item.body}
                            onPress={() => this.props.navigation.navigate('Root', {
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderArticles()}
            </View>
        );
    }
}
export default FeedScreen;

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