import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Animated,
    Easing,
    Image,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    Text
} from 'react-native'
import BottomNav from '../consts/BottomNav'

const { width, height } = Dimensions.get('window');
const x = width / 2 - 75;
const y = height / 2 - 180
const xtext = width / 2 - 150
const ytext = height / 2 - 150

class Splash extends Component {

    constructor() {
        super();

        this.state = {
            size: { width, height },
            text: '',
            imgPosition: new Animated.ValueXY({ x: x, y: 0 }),
            textPosition: new Animated.ValueXY({ x: -350, y: ytext }),
        };
        Animated.sequence([
            Animated.timing(this.state.imgPosition, {
                useNativeDriver: false,
                toValue: { x: x, y: y },
                duration: 1500,
                easing: Easing.bounce
            }),
            Animated.spring(this.state.textPosition, {
                useNativeDriver: false,
                toValue: { x: xtext, y: ytext },
                stiffness: 100
            })]).start();
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('BottomNav')
        }, 4000)
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });

    }

    render() {
        return (
            <View style={styles.container} onLayout={this._onLayoutDidChange} >
                <ImageBackground source={require('../src/bg.png')} style={styles.image}>
                    <View style={[styles.caraBackground, this.state.size]}>
                        <Animated.View style={this.state.imgPosition.getLayout()}>
                            <Image source={require('../src/coronavirus_PNG30.png')} style={styles.img} />
                        </Animated.View>
                        <Animated.View style={this.state.textPosition.getLayout()}>
                            <Text style={[styles.brand, { fontSize: 38 }]}>
                                Corona Tracker
                            </Text>
                        </Animated.View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    caraBackground: {
        flex: 1,
        margin: 10
    },
    img: {
        height: 200,
        maxHeight: 250,
        width: 200,
        maxWidth: 250,
        padding: 10,
    },
    brand: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ead7bc',
        marginBottom: 20,
        fontFamily: 'serif'
    },
    ActivityIndicator: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }

});
export default Splash