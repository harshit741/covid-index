// Second Screen which will be used to show backpress
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text ,BackHandler } from 'react-native';
//import all the components we are going to use.

export default class SecondPage extends Component {
  constructor(props) {
    super(props)
    //Binding handleBackButtonClick function with this
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress 
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    // This is the Last method in the activity lifecycle
    // Removing Event Listener for the BackPress 
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    // Registered function to handle the Back Press
    // We are generating an alert to show the back button pressed
    alert('You clicked back. Now Screen will move to ThirdPage');
    // We can move to any screen. If we want
    this.props.navigation.navigate('ThirdPage');
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }
  static navigationOptions = {
     //Setting the header of the screen
    title: 'Second Page',
  };
  render() {
    const { navigate } = this.props.navigation; 
    return (
      <View style={styles.container}>
        <Text>
          You are on SecondPage
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// Third Screen which will be used to show backpress
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text ,BackHandler } from 'react-native';
//import all the components we are going to use.

export default class ThirdPage extends Component {
  constructor(props) {
    super(props)
    //Binding handleBackButtonClick function with this
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress 
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    // This is the Last method in the activity lifecycle
    // Removing Event Listener for the BackPress 
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    // Registered function to handle the Back Press
    // To popup the default screen while going back you can use goBack
    this.props.navigation.goBack(null);
    // To exit from your App you can use BackHandler.exitApp();. 
    // Just comment the above line and uncomment the below to use it 
    //BackHandler.exitApp();
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    // Try to make it false also
    return true;
  }
  static navigationOptions = {
    title: 'Third Page',
    //Sets Header text of Status Bar
  };
  render() {
    const { navigate } = this.props.navigation; 
    return (
      <View style={styles.container}>
        <Text>
          You are on Third Page
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});