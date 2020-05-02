import React, { Component } from 'react'
import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import Loc from 'react-native-locationiq';
import { Button, Card, Title, Paragraph } from 'react-native-paper'
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
        deceased: null,
        recovered: null,
        delta: {
          confirmed: null,
          deceased: null,
          recovered: null
        }
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
            if (typeof data === "object") {
              var response = data.data;
              var myState = response[address.state]
              var myCity = myState["districtData"][address.city]
              var delta = myCity["delta"]
              console.log(address.city, address.state);              //loging location
              console.log(myCity)                                    //loging data
              this.setState({
                city: address.city,
                state: address.state,
                myCity: {
                  active: myCity.active,
                  confirmed: myCity.confirmed,
                  deceased: myCity.deceased,
                  recovered: myCity.recovered,
                  delta: {
                    confirmed: delta.confirmed,
                    deceased: delta.deceased,
                    recovered: delta.recovered
                  }
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
      <View style={styles.container}>
        <View>
          <Text style={styles.location}>
            {this.state.city}, {this.state.state}
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={[styles.data , {borderBottomColor:'#ff0000'}]}>
            <Text style={styles.title}>Confirmed</Text>
            <Text style={[styles.dataNumbers ,  {color:'#ff0000'}]}>{this.state.myCity.confirmed}</Text>
            <Text>{this.state.myCity.delta.confirmed > 0 ? '+' + this.state.myCity.delta.confirmed : null}</Text>
          </View>
          <View style={[styles.data , {borderBottomColor:'#3c6ff8'}]}>
            <Text style={styles.title}>Active</Text>
            <Text style={[styles.dataNumbers ,  {color:'#3c6ff8'}]}>{this.state.myCity.active}</Text>
          </View>
          <View style={[styles.data , {borderBottomColor:'#00be3f'}]}>
            <Text style={styles.title}>Recovered</Text>
            <Text style={[styles.dataNumbers ,  {color:'#00be3f'}]}>{this.state.myCity.recovered}</Text>
            <Text>{this.state.myCity.delta.recovered > 0 ? '+' +this.state.myCity.delta.recovered : null}</Text>
          </View>
          <View style={[styles.data , {borderBottomColor:'#4d4d4d'}]}>
            <Text  style={styles.title}>Deceased</Text>
            <Text style={[styles.dataNumbers ,  {color:'#4d4d4d'}]}>{this.state.myCity.deceased}</Text>
            <Text>{this.state.myCity.delta.deceased > 0 ? '+' +this.state.myCity.delta.deceased : null}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Current

const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginHorizontal: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  location: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
    shadowColor: 'red',
    shadowOffset: { width: 10, height: 2 },
    elevation: 3,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
  data: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 4,
    margin: 5,
    height: 110,
    maxHeight: 150,
    alignItems: "center",
    borderBottomWidth: 3
  },
  dataContainer: {
    flexDirection: 'row',
    margin: 5,
    marginBottom: 0
  },
  title:{
    fontFamily:'sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical:5,
  },
  dataNumbers:{
    fontSize: 30
  }

})