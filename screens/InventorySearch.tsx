import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, FlatList, ListRenderItem, ActivityIndicator } from 'react-native'

import { Container, Text, Button, Icon, Thumbnail, Content, Left, Right, Header, ListItem, Item, Input } from 'native-base'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList, InventoryStackParamList } from './MainApp'
import { PantryItem } from './InventoryMain'

type InventorySearchRouteProp = RouteProp<InventoryStackParamList, 'InventorySearch'>

type InventorySearchNavigationProp = CompositeNavigationProp<
  StackNavigationProp<InventoryStackParamList, 'InventorySearch'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: InventorySearchRouteProp
  navigation: InventorySearchNavigationProp
}

export default function InventorySearch({ route, navigation }: Props) {
  const [isLoading, setLoading] = useState(true)
  const [pantryItemList, setPantryItemList] = useState<PantryItem[]>([])
  const [searchBarValue, setSearchBarValue] = useState('')
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

  const search = (query: string) => {
    if (query === '') return

    setLoading(true)
    console.log(apiEndpointURL + `?search=${query}`)
    fetch(apiEndpointURL + `?search=${query}`)
      .then((response) => {
        console.log(response.ok)
        if (response.ok) return response.json()
        throw new Error('Network response was bad')
      }).then((json) => setPantryItemList(() => {
        var temp: PantryItem[] = []
        json.items.forEach((item: any) => {
          temp.push({ name: item.name, id: item.id, thumbnail: item.thumbnail, quantity: item.amount })
        })
        return temp
      }))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  return (
    <Container style={{ flex: 1 }}>
      <Header searchBar rounded>
        <Item>
          <Input placeholder='Search' onChangeText={setSearchBarValue} style={{ marginLeft: 5 }} />
          <Button transparent onPress={() => search(searchBarValue)}>
            <Text>Search</Text>
          </Button>
        </Item>
      </Header>
      <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 30 }}>
        Inventory
      </Text>
      <Container style={{ backgroundColor: 'rgb(236, 232, 232)', maxHeight: 4 }} />
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
  search: {
    width: (Dimensions.get('screen').width / 2)
  },
  itemDetailImage: {
    resizeMode: 'contain'
  },
})
