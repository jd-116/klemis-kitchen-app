import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, FlatList, ListRenderItem, ActivityIndicator } from 'react-native'

import { Container, Text, Button, Icon, Thumbnail, Content, Left, Right, Header, List, ListItem } from 'native-base'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList, InventoryStackParamList } from './MainApp'

type InventoryMainRouteProp = RouteProp<InventoryStackParamList, 'InventoryMain'>

type InventoryMainNavigationProp = CompositeNavigationProp<
  StackNavigationProp<InventoryStackParamList, 'InventoryMain'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: InventoryMainRouteProp
  navigation: InventoryMainNavigationProp
}

export type PantryItem = {
  name: string,
  id: string,
  thumbnail: string,
  quantity: number
}

export default function InventoryMainScreen({ route, navigation }: Props) {
  const [isLoading, setLoading] = useState(true)
  const [pantryItemList, setPantryItemList] = useState<PantryItem[]>([])
  const apiEndpointURL = 'https://raw.githubusercontent.com/jd-116/klemis-kitchen-app/feature/api-integration/testing/InventoryMainTestJSON.json'

  const renderItem: ListRenderItem<PantryItem> = ({ item }) => {
    return (
      <ListItem onPress={() => navigation.navigate('InventoryDetails', { item: item, location: route.params })}>
        <Left>
          <Thumbnail source={{ uri: item.thumbnail }} style={styles.itemDetailImage} />
          <Text style={{ marginLeft: 10 }}>{item.name}{'\n'}{item.quantity} Remaining</Text>
        </Left>
        <Right>
          <Button transparent>
            <Icon name='arrow-forward' style={{ color: 'black' }} />
          </Button>
        </Right>
      </ListItem>
    )
  }

  useEffect(() => {
    fetch(apiEndpointURL)
      .then((response) => response.json())
      .then((json) => setPantryItemList(() => {
        var temp: PantryItem[] = []
        json.items.forEach((item: any) => {
          temp.push({ name: item.name, id: item.id, thumbnail: item.thumbnail, quantity: item.amount })
        })
        return temp
      }))
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
      </Header>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20 }}>
        {route.params.locationName}
      </Text>
      <Button style={styles.button}>
        <Text> View Schedule</Text>
      </Button>
      <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 30 }}>
        Inventory
      </Text>
      <Container style={{ backgroundColor: 'rgb(236, 232, 232)', maxHeight: 4}} />
      <Content>
        {isLoading ?
          <ActivityIndicator />
          :
          <FlatList
            data={pantryItemList}
            keyExtractor={item => item.name}
            renderItem={renderItem}
          />
        }
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'rgb(235, 164, 52)',
    width: (Dimensions.get('screen').width / 2.5),
    height: (Dimensions.get('screen').height / 20),
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginLeft: 20,
    marginTop: 10
  },
  itemDetailImage: {
    resizeMode: 'contain'
  },
})
