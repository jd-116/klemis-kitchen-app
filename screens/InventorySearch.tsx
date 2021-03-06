import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  Container,
  Text,
  Button,
  Icon,
  Thumbnail,
  Content,
  Left,
  Right,
  Header,
  ListItem,
  Item,
  Input,
} from 'native-base'
import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Dimensions,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native'

import { TokenContext } from '../App'
import { APIFETCHLOCATION } from '../constants'
import { PantryItem, DrawerParamList, InventoryStackParamList } from '../types'
import { getItems } from './InventoryMain'

type InventorySearchRouteProp = RouteProp<
  InventoryStackParamList,
  'InventorySearch'
>

type InventorySearchNavigationProp = CompositeNavigationProp<
  StackNavigationProp<InventoryStackParamList, 'InventorySearch'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: InventorySearchRouteProp
  navigation: InventorySearchNavigationProp
}

export default function InventorySearch({
  route,
  navigation,
}: Props): React.ReactElement {
  const [isLoading, setLoading] = useState(true)
  const [pantryItemList, setPantryItemList] = useState<PantryItem[]>([])
  const [searchBarValue, setSearchBarValue] = useState('')

  const [token, setToken] = useContext(TokenContext)

  // see ../constants.tsx
  const apiEndpointURL = `${APIFETCHLOCATION}/locations/${route.params.locationID}/products`

  const renderItem: ListRenderItem<PantryItem> = ({ item }) => {
    return (
      <ListItem
        onPress={() =>
          navigation.navigate('InventoryDetails', {
            itemID: item.id,
            location: route.params,
          })
        }
      >
        <Left>
          <Thumbnail
            source={
              item.thumbnail
                ? { uri: item.thumbnail }
                : require('../assets/images/ImageUnavailable.png')
            }
            style={styles.itemDetailImage}
          />
          <Text style={{ marginLeft: 10 }}>
            {item.name}
            {'\n'}
            {item.quantity} Remaining
          </Text>
        </Left>
        <Right>
          <Button
            transparent
            onPress={() =>
              navigation.navigate('InventoryDetails', {
                itemID: item.id,
                location: route.params,
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
    getItems(apiEndpointURL, token, setPantryItemList, setLoading)
  }, [])

  const search = (query: string) => {
    if (query === '') return
    setLoading(true)
    getItems(
      `${apiEndpointURL}?search=${query}`,
      token,
      setPantryItemList,
      setLoading
    )
  }

  return (
    <Container style={{ flex: 1 }}>
      <Header searchBar rounded>
        <Button
          style={{ marginRight: 8 }}
          transparent
          onPress={() => navigation.goBack()}
        >
          <Icon name='arrow-back' style={{ color: 'black' }} />
        </Button>
        <Item>
          <Input
            placeholder='Search'
            onChangeText={setSearchBarValue}
            style={{ marginLeft: 5 }}
          />
        </Item>
        <Button transparent onPress={() => search(searchBarValue)}>
          <Text>Search</Text>
        </Button>
      </Header>
      <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 30 }}>
        Inventory
      </Text>
      <Container
        style={{ backgroundColor: 'rgb(236, 232, 232)', maxHeight: 4 }}
      />
      <Content>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={pantryItemList}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'rgb(235, 164, 52)',
    width: Dimensions.get('screen').width / 2.5,
    height: Dimensions.get('screen').height / 20,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginLeft: 20,
    marginTop: 10,
  },
  search: {
    width: Dimensions.get('screen').width / 2,
  },
  itemDetailImage: {
    resizeMode: 'contain',
  },
})
