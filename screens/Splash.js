import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {Text} from 'react-native-paper'
import Carousel from 'react-native-looped-carousel'
import BottomNav from '../consts/BottomNav'
const { width, height } = Dimensions.get('window');

class Splash extends Component {
 
  constructor() {
    super();
 
    this.state = {
      size: { width, height },
      text: '',
      imgPosition: new Animated.ValueXY({x:130,y:0}),
      textPosition: new Animated.ValueXY({x:-300,y:320}),
    };
    Animated.sequence([
      Animated.timing(this.state.imgPosition,{
        useNativeDriver: false,
      toValue:{x:130,y:300},
      duration:1500,
      easing:Easing.bounce     
    }),
    Animated.spring(this.state.textPosition,{
      useNativeDriver: false,
      toValue:{x:100, y:320},
      stiffness:100
    })]).start();
  }
 
  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
    
  }
 
  render() {
    return (
      <View style={styles.container} onLayout={this._onLayoutDidChange} >

        <Carousel
          style={this.state.size}
          currentPage={0}
          autoplay
          isLooped={false}
          bulletStyle={{borderColor:'#02101a'}}
          bullets
          chosenBulletStyle={{backgroundColor:'#02101a'}}
        >
          <View style={[styles.caraBackground,this.state.size]}>
              <Animated.View style={this.state.imgPosition.getLayout()}>
                <Image source={require('../src/virus.png')} style={styles.img}/>
              </Animated.View>
              <Animated.View  style={this.state.textPosition.getLayout()}>
                <Text style={[styles.brand,{fontSize:38}]}>
                  Corona Tracker
                </Text>
              </Animated.View>
          </View>
          <View style={[this.state.size, styles.container]}>
                 <Text style={styles.title}>
                   Wear A Mask
                 </Text>
                 <Animated.View>
                    <Image source={require('../src/wearmask.png')} style={styles.img}/>
                  </Animated.View>
                 <Text style={styles.subtitle}>
                   Always wear a mask before going out or if you are suffering from coughing and sneezing.
                 </Text>
              </View>
          <View style={[styles.container, this.state.size]}>
                <Text style={styles.title}>
                  Take Care Of Old People
                </Text>
                <Animated.View>
                  <Image source={require('../src/protectold.png')} style={styles.img}/>
                </Animated.View>
                <Text  style={styles.subtitle}>
                  People of older ages are more prone to COVID-19 as the immune system of humans weakens with age.
                </Text>
          </View>
          <View style={[styles.container, this.state.size]}>
                <Text style={styles.title}>
                  Sanitize Your Hands Properly
                </Text>
                <Animated.View>
                  <Image source={require('../src/sanitizehand.png')} style={styles.img}/>
                </Animated.View>
                <Text  style={styles.subtitle}>
                  Use an alcohol-based hand sanitizer that contains at least 60% alcohol to disinfect your hand at regular basis.
                </Text>
          </View>
          <View style={[styles.container, this.state.size]}>
                <Text style={styles.title}>
                  Practice Social Distancing 
                </Text>
                <Animated.View>
                  <Image source={require('../src/socialdistancing.png')} style={styles.img}/>
                </Animated.View>
                <Text style={styles.subtitle}>
                  Practice social distancing and maintain space between yourself and others to prevent infection and its spread.
                </Text>
          </View>
          <View style={[styles.container, this.state.size]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('BottomNav')}>
                  <Text style={styles.subtitle}>
                      Go to Navigation
                  </Text>
                </TouchableOpacity> 
          </View>
        </Carousel>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#04395e',

  },
  img:{
    height:200,
    maxHeight:250,
    width:200,
    maxWidth:250,
    padding:10,
  },
  title:{
    fontSize: 32,
    fontWeight:'600',
    color:'#ead7bc',
    paddingVertical:10,
    paddingHorizontal:20,
    borderBottomWidth:1,
    borderBottomColor:'#dd876a',
    borderRadius:5,
    marginBottom:100,
    backgroundColor:'#042f4d'
  },
  brand:{
    fontSize: 32,
    fontWeight:'600',
    color:'#ead7bc',
    marginBottom:20,
  },
  subtitle:{
    fontSize:20,
    fontWeight:'500',
    margin:10,
    padding:30,
    color:'#90a6d1',
    justifyContent:'space-evenly',
    backgroundColor:'#042f4d',
    borderRadius:25,
    marginTop:20
  },
  textinput:{
    width:400,
    margin:20
  }
});
export default Splash