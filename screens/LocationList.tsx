import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  Container,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Title,
  Header,
  ListItem,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native'

import { APIFETCHLOCATION } from '../constants'
import { DrawerParamList, InventoryStackParamList, Location } from '../types'

type LocationListRouteProp = RouteProp<InventoryStackParamList, 'LocationList'>

type LocationListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<InventoryStackParamList, 'LocationList'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: LocationListRouteProp
  navigation: LocationListNavigationProp
}

type APILocation = {
  name: string
  id: string
}

export default function LocationList({
  navigation,
}: Props): React.ReactElement {
  const [isLoading, setLoading] = useState(true)
  const [locationList, setLocationList] = useState<Location[]>([])

  // see ../constants.tsx
  const apiEndpointURL = `${APIFETCHLOCATION}/locations`

  const renderItem: ListRenderItem<Location> = ({
    item: { locationName, locationID },
  }) => {
    return (
      <ListItem
        key={locationID}
        onPress={() =>
          navigation.navigate('InventoryMain', {
            locationName,
            locationID,
          })
        }
      >
        <Left>
          <Text>{locationName}</Text>
        </Left>
        <Right>
          <Button
            transparent
            onPress={() =>
              navigation.navigate('InventoryMain', {
                locationName,
                locationID,
              })
            }
          >
            <Icon name='arrow-forward' style={{ color: 'black' }} />
          </Button>
        </Right>
      </ListItem>
    )
  }

  useEffect(() => {
    fetch(apiEndpointURL)
      .then((response) => response.json())
      .then((json) =>
        setLocationList(() => {
          const temp: Location[] = []
          json.locations.forEach((item: APILocation) => {
            temp.push({ locationName: item.name, locationID: item.id })
          })
          return temp
        })
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Container style={{ flex: 1 }}>
      <Header style={styles.header}>
        <Left style={{ flexDirection: 'row' }}>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name='menu' style={{ color: 'black' }} />
          </Button>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' style={{ color: 'black' }} />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: 'black' }}>Campus Locations </Title>
        </Body>
      </Header>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={locationList}
          keyExtractor={(item) => item.locationName}
          renderItem={renderItem}
        />
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
})
