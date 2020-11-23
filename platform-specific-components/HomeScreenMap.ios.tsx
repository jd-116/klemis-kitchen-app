import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, ActivityIndicator, AsyncStorage } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'

import { APIFETCHLOCATION } from '../constants'
import { MapStackParamList, DrawerParamList } from '../types'

type PantryMarker = {
  coordinate: {
    latitude: number
    longitude: number
  }
  name: string
  id: string
  description: string
  token: string | null
}

type APILocation = {
  location: {
    latitude: number
    longitude: number
  }
  name: string
  id: string
}

type LocationListRouteProp = RouteProp<MapStackParamList, 'Home'>

type LocationListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList, 'Home'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: LocationListRouteProp
  navigation: LocationListNavigationProp
}

export default function HomeScreen({ navigation }: Props): React.ReactElement {
  const [isLoading, setLoading] = useState(true)
  const [locationMarkerList, setLocationMarkerList] = useState<PantryMarker[]>(
    []
  )

  // see ../constants.tsx
  const apiEndpointURL = `${APIFETCHLOCATION}/locations`

  function renderItem(
    coordinate: { latitude: number; longitude: number },
    name: string,
    id: string,
    token: string | null
  ) {
    return (
      <Marker
        key={name}
        coordinate={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }}
        title={name}
      >
        <Callout
          onPress={() =>
            navigation.navigate('InventoryMain', {
              location: {
                locationName: name,
                locationID: id
              },
              token: token
            })
          }
        />
      </Marker>
    )
  }

  useEffect(() => {AsyncStorage.getItem('token').then((token) => 
    fetch(apiEndpointURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JSON.parse(JSON.stringify(token))}`,
      },
    })
      .then((response) => response.json())
      .then((json) =>
        setLocationMarkerList(() => {
          const temp: PantryMarker[] = []
          json.locations.forEach((location: APILocation) => {
            temp.push({
              coordinate: {
                latitude: location.location.latitude,
                longitude: location.location.longitude,
              },
              name: location.name,
              id: location.id,
              description: 'hi',
              token: token
            })
          })
          return temp
        })
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  )}, [])

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MapView
          style={styles.MapView}
          showsUserLocation={true}
          initialRegion={{
            latitude: 33.7759731,
            longitude: -84.3973371,
            latitudeDelta: 0.005,
            longitudeDelta: 0.025,
          }}
        >
          {locationMarkerList.map((location) => {
            return renderItem(location.coordinate, location.name, location.id, location.token)
          })}
        </MapView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  MapView: {
    width: Dimensions.get('screen').width - 30,
    height: Dimensions.get('screen').height / 3.5,
    marginVertical: 10,
    marginHorizontal: 15,
  },
})
