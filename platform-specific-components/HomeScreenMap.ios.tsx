import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';

import MapView from 'react-native-maps'

export default function HomeScreen() {
  return (
    <MapView
      style={styles.MapView}
      initialRegion={{
        latitude: 33.7759731,
        longitude: -84.3973371,
        latitudeDelta: .1,
        longitudeDelta: .45
      }}
    />
  )
}
const styles = StyleSheet.create({
  MapView: {
    width: (Dimensions.get('screen').width - 30),
    height: (Dimensions.get('screen').height / 3.5),
    marginVertical: 10,
    marginHorizontal: 15
  },
});
