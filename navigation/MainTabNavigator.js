import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/MapScreen';
import CircuitsScreen from '../screens/CircuitsScreen';

const MapStack = createStackNavigator({
  Map: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Mapa',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-map' : 'md-map'
      }
    />
  ),
};

const CircuitsStack = createStackNavigator({
  Circuits: CircuitsScreen,
});

CircuitsStack.navigationOptions = {
  tabBarLabel: 'Circuitos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-bicycle' : 'md-bicycle'
      }
    />
  ),
};

export default createBottomTabNavigator({
  MapStack,
  CircuitsStack,
});
