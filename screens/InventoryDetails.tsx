import React, { useState } from 'react';
import { StyleSheet, Dimensions, Modal, TouchableOpacity, Alert, View } from 'react-native';

import { Container, Text, Button, Icon, Card, Thumbnail, Content } from 'native-base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../App'

type InventoryDetailsScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Details'>;
};

type Props = {
  navigation: DrawerParamList
}

export default function InventoryDetailsScreen({ navigation }: Props) {
  const [imageURL, setImageURL] = useState('https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg')
  const [itemName, setItemName] = useState('Bananas')
  const [location, setLocation] = useState('West Village') //!TODO: remove
  const [itemQuantity, setItemQuantity] = useState(3)
  const [nutritionFactsLabel, setNutritionFactsLabel] = useState('http://www.scientifit.com/wp-content/uploads/2012/12/Nutrition-Facts-Label-Blondies.jpg')

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const [checkoutNumber, setCheckoutNumber] = useState(0);
  const reset = () => setCheckoutNumber(0);
  const increment = () => setCheckoutNumber(checkoutNumber => checkoutNumber + 1);
  const decrement = () => setCheckoutNumber(checkoutNumber => checkoutNumber - 1)
  if (checkoutNumber == -1) {reset()};

  const showError = () => {
    setErrorMessageVisible(true);
    setTimeout(() => {
      setErrorMessageVisible(false)
    }, 1000);
  }

  return (
    <Container>
    <Modal
        animationType = "none"
        transparent = {true}
        visible = {modalVisible}
        onRequestClose={() => {
            console.log("Modal has been closed.");
        }}>
      <Modal
        animationType = "fade"
        transparent = {true}
        visible = {errorMessageVisible}
        onRequestClose={() => {
            console.log("Error message has been closed.");
        }}>
        <View style={styles.errorCaptureView}>
          <View style={styles.errorMessageView}>
            <Text style={{color: 'white'}}>Error: Not enough {itemName.toLowerCase()} at {location}.</Text>
          </View>
        </View>
      </Modal>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>How many {itemName.toLowerCase()}?</Text>
          <View style={styles.counterView}>
            <Button style={styles.decrementButton}
              onPress={() => decrement()}>
              <Text style={{ color: 'black' }}>-</Text>
            </Button>
            <Text style={{fontSize: 36}}>{checkoutNumber}</Text>
            <Button style={styles.incrementButton}
              onPress={() => increment()}>
              <Icon name='add' style={{ color: 'black' }} />
            </Button>
          </View>
          <View style = {styles.modalExitView}>
            <Button
              style={{backgroundColor: "white" }}
              onPress={() => {
                if (checkoutNumber <= itemQuantity) {
                    setModalVisible(!modalVisible);
                } else {
                    showError();
                }
              }}>
              <Text style={styles.textStyle}>CONFIRM</Text>
            </Button>
            <Button
              style={{backgroundColor: "white" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                reset();
              }}>
              <Text style={styles.textStyle}>CANCEL</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
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
        <Button bordered success style={styles.addToCartButton}
            onPress={() => {setModalVisible(true);}}>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    height: (Dimensions.get('screen').height * .3),
    width: (Dimensions.get('screen').width) * .7,
    justifyContent: "space-around"
  },
  textStyle: {
    color: "green",
    textAlign: "center"
  },
  modalText: {
    textAlign: "left",
    textAlignVertical: "top",
    alignItems:"flex-start",
    marginBottom: 20
  },
  incrementButton: {
      backgroundColor: "white",
      marginRight: 15
  },
  decrementButton: {
      backgroundColor: "white",
      marginLeft: 15
  },
  errorCaptureView: {
      flexDirection: "column-reverse",
      alignItems: "center",
  },
  errorMessageView: {
    backgroundColor: "black",
    height: (Dimensions.get('screen').height * .05),
    width: (Dimensions.get('screen').width) * .9,
    marginTop: (Dimensions.get('screen').height * .05),
    alignItems: "center",
    justifyContent: 'center',
  },
  counterView: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  modalExitView: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
  }
});
