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
} from 'native-base'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native'

import { APIFETCHLOCATION } from '../constants'
import { PantryItem, DrawerParamList, InventoryStackParamList } from '../types'

type InventoryMainRouteProp = RouteProp<
  InventoryStackParamList,
  'InventoryMain'
>

type InventoryMainNavigationProp = CompositeNavigationProp<
  StackNavigationProp<InventoryStackParamList, 'InventoryMain'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: InventoryMainRouteProp
  navigation: InventoryMainNavigationProp
}

type APIPantryItem = {
  name: string
  id: string
  thumbnail: string
  amount: number
}

export const getItems = (
  apiEndpointURL: string,
  setPantryItemList: (value: React.SetStateAction<PantryItem[]>) => void,
  setLoading: (value: React.SetStateAction<boolean>) => void
): void => {
  fetch(apiEndpointURL)
    .then((response) => response.json())
    .then((json) =>
      setPantryItemList(() => {
        const temp: PantryItem[] = []
        json.products.forEach((product: APIPantryItem) => {
          temp.push({
            name: product.name,
            id: product.id,
            thumbnail: product.thumbnail,
            quantity: product.amount,
          })
        })
        return temp
      })
    )
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
}

export default function InventoryMainScreen({
  route,
  navigation,
}: Props): React.ReactElement {
  const [isLoading, setLoading] = useState(true)
  const [pantryItemList, setPantryItemList] = useState<PantryItem[]>([])

  // see ../constants.tsx
  const apiEndpointURL = `${APIFETCHLOCATION}/api/v1/locations/${route.params.locationID}/products`

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
    getItems(apiEndpointURL, setPantryItemList, setLoading)
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
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate('InventorySearch', route.params)}
          >
            <Icon name='search' style={{ color: 'black' }} />
          </Button>
        </Right>
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
