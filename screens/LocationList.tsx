import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'

import { Container, Text, Button, Icon, Left, Right, Body, Title, Header, List, ListItem, Item } from 'native-base'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList, InventoryStackParamList } from './MainApp'

import * as data from '../testing/LocationsListTestJSON.json'

type LocationListRouteProp = RouteProp<InventoryStackParamList, 'LocationList'>

type LocationListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<InventoryStackParamList, 'LocationList'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: LocationListRouteProp
  navigation: LocationListNavigationProp
}

export default function LocationList({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [locationList, setLocationList] = useState<string[]>([])

  useEffect(() => {
    setLocationList(() => {
      var temp: any[] = []
      data.locations.forEach((item) => {
        temp.push(item.name)
      })
      return temp
    })
    //  fetch()
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
          <Title>Campus Locations</Title>
        </Body>
      </Header>
      {console.log(locationList)}
      <FlatList
        data={locationList}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <ListItem>
            <Left>
              <Text>{item}</Text>
            </Left>
            <Right>
              <Button transparent onPress={() => navigation.navigate('InventoryMain', { nameLoc: item })}>
                <Icon name='arrow-forward' style={{ color: 'black' }} />
              </Button>
            </Right>
          </ListItem>
        )}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row'
  },
})
