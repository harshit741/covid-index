import React, { Component } from 'react'
import {
  Provider as PaperProvider
} from 'react-native-paper'
import Splash from './screens/Splash'
import BottomNav from './consts/BottomNav'
import EnterOtp from './screens/EnterOtp'



export class App extends Component {
  render() {
    return (
      <PaperProvider>
          {/* <Splash /> */}
          {/* <BottomNav /> */}
          <EnterOtp />
      </PaperProvider>
    )
  }
}

export default App