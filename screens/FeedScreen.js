import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { 
  Image, 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Animated,
  PanResponder } from 'react-native';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import NewsCard from '../components/NewsCard'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const ARTICLES = [
    { id: "1", uri: require('./../assets/temp/newsimage1.jpg') },
    { id: "2", uri: require('./../assets/temp/newsimage2.jpg') },
    { id: "3", uri: require('./../assets/temp/newsimage3.jpg') },
    { id: "4", uri: require('./../assets/temp/newsimage4.jpg') }
]

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
                    this.swipedCardPosition.setValue({
                        x: 0, y: -SCREEN_HEIGHT + gestureState.dy
                    })
                }
                else {

                    this.position.setValue({ x: 0, y: gestureState.dy })

                }
            },
            onPanResponderRelease: (evt, gestureState) => {

                if (this.state.currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7) {
                    Animated.timing(this.swipedCardPosition, {
                        toValue: ({ x: 0, y: 0 }),
                        duration: 400
                    }).start(() => {

                        this.setState({ currentIndex: this.state.currentIndex - 1 })
                        this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })

                    })
                }
                else if (-gestureState.dy > 50 && -gestureState.vy > 0.7) {

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
    renderArticles = () => {

        return ARTICLES.map((item, i) => {

            if (i == this.state.currentIndex - 1) {

                return (
                    <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
                        {...this.PanResponder.panHandlers}
                    >
                        <NewsCard image={ARTICLES[i].uri} />
                    </Animated.View>
                )
            }
            else if (i < this.state.currentIndex) {
                return null
            }
            if (i == this.state.currentIndex) {

                return (

                    <Animated.View key={item.id} style={this.position.getLayout()}
                        {...this.PanResponder.panHandlers}
                    >
                        <NewsCard image={ARTICLES[i].uri} />
                    </Animated.View>
                )
            }
            else {

                return (
                    <Animated.View key={item.id}>
                        <NewsCard image={ARTICLES[i].uri} />
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
    }
});