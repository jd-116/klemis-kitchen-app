import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';

import { Container, Text, Button, Icon, Card, Thumbnail, Content } from 'native-base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../App'

type TabTwoScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Locations'>;
};

type Props = {
  navigation: DrawerParamList
}

export default function TabTwoScreen({ navigation }: Props) {
  const [imageURL, setImageURL] = useState('https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg')
  const [itemName, setItemName] = useState('Bananas')
  const [location, setLocation] = useState('West Village') //!TODO: remove
  const [itemQuantity, setItemQuantity] = useState(3)
  const [nutritionFactsLabel, setNutritionFactsLabel] = useState('http://www.scientifit.com/wp-content/uploads/2012/12/Nutrition-Facts-Label-Blondies.jpg')

  return (
    <Container>
      <Container style={styles.buttonHeader}>
        <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon name='menu' style={{ color: 'black' }} />
        </Button>
        <Button transparent>
          <Icon name='arrow-back' style={styles.leftArrow} />
        </Button>
      </Container>
      <Image source={{ uri: imageURL }} style={styles.itemDetailImage} />
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
      <Content>
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
    fontSize: 40
  },
  itemDetails: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 30
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
    flex: .07,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 0
  },
  leftArrow: {
    color: 'black',
    marginLeft: 0
  }
});