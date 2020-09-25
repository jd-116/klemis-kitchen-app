import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { Container, Text, Button, Icon, Card, Thumbnail, Content, Left, Right, Body, Title, Header, Row, List, ListItem } from 'native-base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native'
import { DrawerParamList, StackParamList } from '../App'
import { View } from '../components/Themed';

type InventoryMainRouteProp = RouteProp<StackParamList, 'InvenMain'>

type Props = {
  route: InventoryMainRouteProp
  navigation: StackParamList
}

export default function InventoryMainScreen({ route, navigation }: Props,) {
  const [imageURL, setImageURL] = useState('https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg')
  const [imageURL2, setImageURL2] = useState('https://cdn.discordapp.com/attachments/745017146534395964/756685605307547738/unknown.png')
  const [itemName, setItemName] = useState('Bananas')
  const [itemQuantity, setItemQuantity] = useState(3)

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
      <Text style={{ fontSize: 30, fontWeight: 'bold', borderLeftWidth: 20, borderLeftColor: 'white' }}>
        Checkout
      </Text>
      <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 30 }}>
        Your Cart
      </Text>
      <View style={{ backgroundColor: 'rgb(236, 232, 232)', height: 4, width: (Dimensions.get('screen').width), marginTop: 10 }}>
      </View>
      <Content>
        <List>
          <ListItem>
            <Left>
              <Thumbnail source={{ uri: imageURL }} style={styles.itemDetailImage} />
              <Text style={{ marginLeft: 10 }}>{itemName}{'\n'}{itemQuantity} in cart</Text>
            </Left>
            <Right>
              <Button transparent>
                <Text style={{ color: 'black' }}>-</Text>
              </Button>
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'rgb(235, 164, 52)',
    width: (Dimensions.get('screen').width / 2.6),
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
});
