import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

import { APIFETCHLOCATION } from '../screens/MainApp'

import MapView, { Marker } from 'react-native-maps'

type PantryMarker = {
  coordinate: {
    latitude: number,
    longitude: number
  },
  title: string
  description: string
}

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(true)
  const [locationMarkerList, setLocationMarkerList] = useState<PantryMarker[]>([])

  //see ./MainApp.tsx
  let apiEndpointURL = ''
  if (APIFETCHLOCATION == 'localhost') apiEndpointURL = 'http://localhost:8080/api/v1/locations/'
  else apiEndpointURL = 'https://raw.githubusercontent.com/jd-116/klemis-kitchen-app/feature/homescreen-map-markers/testing/LocationsTestsJSON.json'

  useEffect(() => {
    fetch(apiEndpointURL)
      .then((response) => response.json())
      .then((json) => setLocationMarkerList(() => {
        var temp: PantryMarker[] = []
        json.locations.forEach((location: any) => {
          temp.push({
            coordinate: {
              latitude: location.location.latitude,
              longitude: location.location.longitude
            },
            title: location.name,
            description: 'hi'
          })
        })
        return temp
      }))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {isLoading ?
        <ActivityIndicator />
        :
        <MapView
          style={styles.MapView}
          showsUserLocation={true}

          initialRegion={{
            latitude: 33.7759731,
            longitude: -84.3973371,
            latitudeDelta: .10001,
            longitudeDelta: .450001
          }}
        >
          {locationMarkerList.map((location) => {
            return (<Marker
              coordinate={{
                latitude: location.coordinate.latitude,
                longitude: location.coordinate.longitude
              }}
              title={location.title}
            />
            )
          })}
        </MapView>
      }
    </>
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
