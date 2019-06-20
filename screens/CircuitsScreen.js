import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Circuits from '../components/Circuits';

export default function CircuitsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Circuits />
    </ScrollView>
  );
}

CircuitsScreen.navigationOptions = {
  title: 'Lista de Circuitos',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
