import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

import { Container, Text, Button, Icon, Card, Thumbnail, Content } from 'native-base';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { APIFETCHLOCATION, DrawerParamList, InventoryStackParamList } from './MainApp'
import { PantryItem } from './InventoryMain'


type InventoryDetailsRouteProp = RouteProp<InventoryStackParamList, 'InventoryDetails'>

type InventoryDetailsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<InventoryStackParamList, 'InventoryDetails'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: InventoryDetailsRouteProp
  navigation: InventoryDetailsNavigationProp
}

type PantryItemWithNutritionalFacts = {
  item: PantryItem,
  nutritionalFacts: string | null
}

export default function InventoryDetailsScreen({ route, navigation }: Props) {
  const [isLoading, setLoading] = useState(true)
  const [pantryItem, setPantryItem] = useState<PantryItemWithNutritionalFacts>({
    item: {
      name: 'Unknown',
      id: 'ID Unknown',
      thumbnail: 'null',
      quantity: 0
    },
    nutritionalFacts: 'null'
  }) //random default value otherwise the thing yells at me

  //see ./MainApp.tsx
  let apiEndpointURL = ''
  if (APIFETCHLOCATION == 'localhost') apiEndpointURL = `http://localhost:8080/api/v1/locations/${route.params.location.locationID}/products/${route.params.itemID}`
  else apiEndpointURL = 'https://raw.githubusercontent.com/jd-116/klemis-kitchen-app/feature/api-integration/testing/InventoryDetailsTestJSON.json'

  useEffect(() => {
    fetch(apiEndpointURL)
      .then((response) => response.json())
      .then((json) => setPantryItem((): any => {
        console.log(json)
        return ({
          item: {
            name: json.name,
            id: json.id,
            thumbnail: json.thumbnail,
            quantity: json.amount
          },
          nutritionalFacts: json.nutritional_facts
        })
      }))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
      console.log(pantryItem)
  }, [])

  return (
    <Container>
      <Content style={{ marginTop: 0 }}>
        <Container style={styles.buttonHeader}>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name='menu' style={{ color: 'black' }} />
          </Button>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' style={styles.leftArrow} />
          </Button>
        </Container>
        {isLoading ?
          <ActivityIndicator />
          :
          <>
            <Thumbnail source={pantryItem.item.thumbnail ? { uri: pantryItem.item.thumbnail } : require('../assets/images/ImageUnavailable.png')} style={styles.itemDetailImage} />
            <Text style={styles.itemName}>{pantryItem.item.name}</Text>
            <Text style={styles.itemDetails}>{pantryItem.item.quantity} Remaining at {route.params.location.locationName}</Text>
            {pantryItem.nutritionalFacts ?
              <Card style={styles.nutritionFactsCard}>
                <Thumbnail source={pantryItem.nutritionalFacts ? { uri: pantryItem.nutritionalFacts } : { uri: undefined }} style={styles.nutritionFactsLabel} />
              </Card>
              : undefined}
          </>
        }
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  itemName: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: (Dimensions.get('screen').width / 20)
  },
  itemDetails: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: (Dimensions.get('screen').width / 20)
  },
  addToCartButton: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 30
  },
  itemDetailImage: {
    marginTop: 10,
    width: (Dimensions.get('screen').width / 3),
    height: (Dimensions.get('screen').height / 6),
    marginLeft: 20,
    resizeMode: 'contain'
  },
  nutritionFactsCard: {
    marginLeft: 25,
    height: (Dimensions.get('screen').height / 1.15),
    width: (Dimensions.get('screen').width / 1.1),
  },
  nutritionalText: {
    fontSize: 30,
    marginLeft: 40,
    borderTopWidth: 30,
    borderTopColor: 'white'
  },
  nutritionFactsLabel: {
    height: (Dimensions.get('screen').height * .8),
    width: (Dimensions.get('screen').width) * .9,
    resizeMode: 'contain'
  },
  buttonHeader: {
    height: (Dimensions.get('screen').height / 20),
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0
  },
  leftArrow: {
    color: 'black',
    marginLeft: 0
  }
});
