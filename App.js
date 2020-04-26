import React, { Component } from 'react'
import {
  DefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper'
import Splash from './screens/Splash'
import {BottomNav} from './consts/BottomNav'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#04395e',
    accent: '#f1c40f',
  },
};
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
    <PaperProvider theme={theme}>
      <Stack.Navigator initialRouteName={Splash}>
        <Stack.Screen options={{headerShown: false}} name="Splash" component={Splash} />
        <Stack.Screen options={{headerShown: false}} name="BottomNav" component={BottomNav} />
      </Stack.Navigator>
    </PaperProvider>
    </NavigationContainer>
  );
}
export default App