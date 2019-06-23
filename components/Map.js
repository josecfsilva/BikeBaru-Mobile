import React from "react";
import { StyleSheet, View, Alert, Image, Text, Platform, TouchableOpacity, Button } from "react-native";
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import haversine from "haversine";
import { Stopwatch } from 'react-native-stopwatch-timer';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      circuitStarted: false,
      distanceTravelled: 0.0,

      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),

      isStopwatchStart: false,
      resetStopwatch: false
    };
  }

  componentDidMount() {
    const { coordinate } = this.state;

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };
        console.log({ newCoordinate });

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calculateDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  saveCircuit() {
    const initial_location = "teste";
    const final_location = "teste";
    const time = this.currentTime;
    const distance = parseFloat(this.state.distanceTravelled).toFixed(2);
    const velocity = 10;
    const calories = 0;

    fetch('https://bikebaru-server.herokuapp.com/circuits/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify({
        initial_location,
        final_location,
        time,
        distance,
        velocity,
        calories,
        partner_id: 1,
      })
    })
      .then(Alert.alert('Estatísticas do Circuito', 'Distância: ' + distance + ' km' + '\nTempo: ' + time + "\nVelocidade Média: " + velocity + ' km/h'))
      .catch(err => console.error(err));
  }

  // Map
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  // Distance
  calculateDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  // Time
  startStopStopWatch() {
    this.setState({ isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false });
  }

  resetStopwatch() {
    this.setState({ isStopwatchStart: false, resetStopwatch: true });
  }

  getFormattedTime = (time) => {
    this.currentTime = time;
  }

  // Start Circuit
  startCircuit = () => {
    this.setState({
      circuitStarted: true,
      distanceTravelled: 0.00,
      routeCoordinates: [],
      prevLatLng: {}
    });
    this.startStopStopWatch();
  }

  // Finish Circuit
  finishCircuit = () => {
    this.setState({
      circuitStarted: false,
      routeCoordinates: [],
      distanceTravelled: 0.00,
      prevLatLng: {}
    });

    this.saveCircuit();
    this.startStopStopWatch();
    this.resetStopwatch();
  }

  render() {
    let content = null;

    if (this.state.circuitStarted == true) {
      content = (
        <View style={styles.buttonContainer}>
          <View style={[styles.bubble, styles.button]}>

            <Text style={{ fontWeight: 'bold' }}>Distância</Text>
            <Text style={{ marginBottom: 10 }}>{parseFloat(this.state.distanceTravelled).toFixed(2)} km</Text>

            <Text style={{ fontWeight: 'bold' }}>Tempo</Text>
            <Stopwatch laps start={this.state.isStopwatchStart} reset={this.state.resetStopwatch} options={styles} getTime={this.getFormattedTime} />
          </View>
          <View style={[styles.bubble, styles.button]}>
            <Button onPress={this.finishCircuit} title="Terminar Circuito" />
          </View>
        </View>
      );
    } else {
      content = (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Button onPress={this.startCircuit} title="Iniciar Circuito" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} showUserLocation followUserLocation loadingEnabled region={this.getMapRegion()}>
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={3} />
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}>
            <Image source={require("../assets/images/bike.png")} style={{ height: 35, width: 35 }} />
          </Marker.Animated>
        </MapView>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});