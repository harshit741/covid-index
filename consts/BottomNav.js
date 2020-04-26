import  React from 'react';
import { BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home'
import Feeds from '../screens/Feeds'
import Global from '../screens/Global'
import Faq from '../screens/Faq'
import Splash from '../screens/Splash';



const Tab = createBottomTabNavigator();

export class BottomNav extends React.Component {
  constructor(){
    super()
  }

  render() {
    return (
      <NavigationContainer independent={true}>
      <Tab.Navigator initialRouteName={Splash} tabBarOptions={{
        activeTintColor: '#04395e',
        swipeEnabled: true,

      }}>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Feeds" component={Feeds} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="rss" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Global" component={Global} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="globe" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="FAQ" component={Faq} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="help-with-circle" color={color} size={size} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
}

