import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { Container, Text, Button, Icon, Card, Thumbnail, Content } from 'native-base';
import { RouteProp } from '@react-navigation/native'
import { StackParamList } from './MainApp'


type InventoryDetailsRouteProp = RouteProp<StackParamList, 'Details'>

type Props = {
  route: InventoryDetailsRouteProp
  navigation: StackParamList
}

export default function InventoryDetailsScreen({ route, navigation }: Props) {
  const [imageURL, setImageURL] = useState(route.params.pic)
  const [itemName, setItemName] = useState(route.params.nameItem)
  const [location, setLocation] = useState(route.params.nameLoc) //!TODO: remove
  const [itemQuantity, setItemQuantity] = useState(route.params.numItem)
  const [nutritionFactsLabel, setNutritionFactsLabel] = useState('http://www.scientifit.com/wp-content/uploads/2012/12/Nutrition-Facts-Label-Blondies.jpg')

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
        <Thumbnail source={{ uri: imageURL }} style={styles.itemDetailImage} />
        <Text style={styles.itemName}>{itemName}</Text>
        <Text style={styles.itemDetails}>{itemQuantity} Remaining at {location}</Text>
        <Button bordered success style={styles.addToCartButton}>
          <Icon name='add' />
          <Text>
            Add to Cart
          </Text>
        </Button>
        {/*
        <Text style={styles.nutritionalText}>
          Nutritional Information
        </Text>
        */}
        <Card style={styles.nutritionFactsCard}>
          <Thumbnail source={{ uri: nutritionFactsLabel }} style={styles.nutritionFactsLabel} />
        </Card>
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
    borderLeftWidth: 40,
    borderLeftColor: 'white',
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
