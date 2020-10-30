import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { MapStackParamList, DrawerParamList } from '../types'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { APIFETCHLOCATION } from '../constants'
import { DrawerNavigationProp } from '@react-navigation/drawer'

type PantryMarker = {
  coordinate: {
    latitude: number
    longitude: number
  }
  name: string
  id: string
  description: string
}

type APILocation = {
  location: {
    latitude: number
    longitude: number
  }
  id: string
  name: string
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

export default function HomeScreen({ navigation, route }: Props): React.ReactElement {
  const [isLoading, setLoading] = useState(true)
  const [locationMarkerList, setLocationMarkerList] = useState<PantryMarker[]>(
    []
  )

  // see ../constants.tsx
  const apiEndpointURL = `${APIFETCHLOCATION}/api/v1/locations`
  
  function renderItem(coordinate: {latitude: number, longitude: number}, name: string, id: string)
  {
    return (
      <Marker
        key={name}
        coordinate={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }}
        title={name}
        onPress={() => 
          navigation.navigate('InventoryMain', {
            locationName:name,
            locationID:id,
          })
        }
      />
    )
  }

  useEffect(() => {
    fetch(apiEndpointURL)
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
            })
          })
          return temp
        })
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

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
            return (
              renderItem(location.coordinate, location.name, location.id)
            )
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
