import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function CircuitsScreen() {
  return (
    <ScrollView style={styles.container}>
        <Text>Aqui é a lista de Circuitos!</Text>
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
