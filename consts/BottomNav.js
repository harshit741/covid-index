import  React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { NavigationContainer } from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import Home from '../screens/Home'
import Feeds from '../screens/Feeds'
import Global from '../screens/Global'
import Faq from '../screens/Faq'
import Splash from '../screens/Splash';



const Tab = createMaterialBottomTabNavigator();

export class BottomNav extends React.Component {
  constructor(){
    super()
  }

  render() {
    return (
      <NavigationContainer independent={true}>
      <Tab.Navigator
        backBehavior='order'
        activeColor= '#04395e'
        shifting= {true}
        barStyle={{ backgroundColor: '#fff'}}
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={20} />
          ),
        }} />
        <Tab.Screen name="Feeds" component={Feeds} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="rss" color={color} size={20} />
          ),
        }} />
        <Tab.Screen name="Global" component={Global} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="globe" color={color} size={20} />
          ),
        }} />
        <Tab.Screen name="FAQ" component={Faq} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="help-with-circle" color={color} size={20} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
}

