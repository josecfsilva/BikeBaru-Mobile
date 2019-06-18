import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Map from '../components/Map';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

MapScreen.navigationOptions = {
  title: 'Mapa',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
