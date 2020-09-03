import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';

import { Container, Text, Button, Icon } from 'native-base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../App'
import { max } from 'react-native-reanimated';

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
          <Icon name='left-arrow' style={styles.leftArrow} />
        </Button>
      </Container>
      <Image source={{ uri: imageURL }} style={styles.itemDetailImage} />
      <Text style={styles.itemName}>{itemName}</Text>
      <Text style={styles.itemDetails}>{itemQuantity} Remaining at {location}</Text>
      <Button bordered success style={styles.addToCartButton}>
        <Icon name='plus' />
        <Text>
          Add to Cart
        </Text>
      </Button>
      <Container style={styles.nutritionFactsLabel}>
        <Image source={{ uri: nutritionFactsLabel }} style={{ height:200 }}/>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  itemName: {
    marginLeft: 10,
    fontSize: 40
  },
  itemDetails: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 30
  },
  addToCartButton: {
    marginLeft: 10,
  },
  itemDetailImage: {
    height: (Dimensions.get('window').height / 3),
    marginLeft: 10,
  },
  nutritionFactsLabel: {
    height: (Dimensions.get('window').height / 2),
  },
  buttonHeader: {
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
