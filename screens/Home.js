import React from 'react'
import { View, Text } from 'react-native'
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Current from './Current';
import IndiaStat from './IndiaStat'

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <NavigationContainer independent={true}>
      <Appbar.Header>
        <Appbar.Action icon="home" />
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <Tab.Navigator tabBarOptions={{
        activeTintColor: '#1B445F',
        labelStyle:{
          fontWeight: 'bold',
          fontFamily: 'sans',
        },
        indicatorStyle:{
          backgroundColor: '#1B445F',
          height:2,
        }
      }}>
        <Tab.Screen name="India " component={IndiaStat} />
        <Tab.Screen name="Your City" component={Current} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Home
