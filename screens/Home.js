import React, { Component } from 'react'
import { View, Text, PermissionsAndroid, AsyncStorage } from 'react-native'
import { Appbar } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import Loc from 'react-native-locationiq';
import {fetchData} from '../src/api/StateData'  


Loc.init("12137dbd193f40"); //My locationIQ API Key

const locationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "This app requires your location to work",
        
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Location permission denied, Please enable it in settings");
    }
  } catch (err) {
    console.warn(err);
  }
};


export class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
          currentLongitude : 0.0,
          currentLatitude : 0.0,
          state: 'unknown',
          city: 'unknown',

        }
    }

    async componentDidMount() {
      locationPermission()
      Geolocation.getCurrentPosition(
        position => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          const currentLatitude = JSON.stringify(position.coords.latitude);
          this.setState({ currentLongitude: currentLongitude });
          this.setState({ currentLatitude: currentLatitude });
        },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      this.watchID = Geolocation.watchPosition(position => {
       const currentLongitude = JSON.stringify(position.coords.longitude);
       const currentLatitude = JSON.stringify(position.coords.latitude);
       this.setState({ currentLongitude: currentLongitude });
       this.setState({ currentLatitude: currentLatitude });
       Loc.reverse(this.state.currentLatitude,this.state.currentLongitude)
       .then(json => {
           var address = json.address;
           console.log(address.city,address.state);
           this.setState({city : address.city})
           this.setState({state : address.state})
           
       })
       .catch(error => console.warn(error));
      });
      const data = await fetchData(data)
      var mod = new Object(data)
      var modState = this.state.state
      var modCity = this.state.city
      console.log(city)
      console.log(mod["data"][modState]["districtData"][modCity])
    };

    render() {
        return (
            <View>
              <Appbar.Header>
                <Appbar.Action icon="home"/>
                <Appbar.Content title="Home"/>
              </Appbar.Header>
              <Text>
                {this.state.currentLatitude}
              </Text>
              <Text>
                {this.state.currentLongitude}
              </Text>
              <Text>
                {this.state.city} {this.state.state}
              </Text>
            </View>
        )
    }
}

export default Home
