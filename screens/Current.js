import React, { Component } from 'react'
import { View, Text, PermissionsAndroid } from 'react-native'
import { Appbar } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import Loc from 'react-native-locationiq';
import { fetchData } from '../src/api/StateData'

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


export class Current extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentLongitude: 0.0,
      currentLatitude: 0.0,
      state: 'unknown',
      city: 'unknown',
      myCity: {
        active: null,
        confirmed: null,
        deceased: null
      }

    }
  }

  async componentDidMount() {

    const data = await fetchData(data)

    locationPermission()

    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        this.setState({ currentLatitude: currentLatitude, currentLongitude: currentLongitude });
        Loc.reverse(this.state.currentLatitude, this.state.currentLongitude)  
        .then(json => {
          var address = json.address;
          console.log(address.city, address.state);
          if (typeof data === "object") {
            var response = data.data;
            var myState = response[address.state]
            var myCity = myState["districtData"][address.city]
            console.log(myCity)
            this.setState({
              city: address.city,
              state: address.state,
              myCity: {
                active: myCity.active,
                confirmed: myCity.confirmed,
                deceased: myCity.deceased
              }
            })
          }
        })
        .catch(error => console.warn(error));
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      <View>
        <Text style={{fontSize:24, fontWeight:'bold'}}>
        Location:  {this.state.city} {this.state.state}
        </Text>
        <Text style={{fontSize:24, fontWeight:'bold'}}>
        Active Cases:  {this.state.myCity.active} 
        </Text>
        <Text style={{fontSize:24, fontWeight:'bold'}}>
        Confirmed Cases:  {this.state.myCity.confirmed}
        </Text>
        <Text style={{fontSize:24, fontWeight:'bold'}}>
        Deceased:  {this.state.myCity.deceased}
        </Text>
      </View>
    )
  }
} 

export default Current
