import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { Container, Text, Button, Icon, Card, Thumbnail, Content, Left, Right, Body, Title, Header, Row, List, ListItem } from 'native-base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList, StackParamList } from '../App'
import { View } from '../components/Themed';

type Props = {
  navigation: StackParamList
}

export default function TabFourScreen({ navigation }: Props) {
  const [imageURL, setImageURL] = useState('https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg')
  const [imageURL2, setImageURL2] = useState('https://cdn.discordapp.com/attachments/745017146534395964/756685605307547738/unknown.png')
  const [itemName, setItemName] = useState('Bananas')
  const [itemName2, setItemName2] = useState('Pop Tarts')
  const [itemQuantity, setItemQuantity] = useState(3)
  const [itemQuantity2, setItemQuantity2] = useState(26)

  return (
    <Container style = {{flex: 1}}>
      <Header style = {styles.header}>
          <Left style = {{flexDirection: 'row'}}>
                <Button transparent onPress={() => navigation.openDrawer()}>
                  <Icon name='menu' style={{ color: 'black' }} />
                </Button>
              <Button transparent onPress={() => navigation.goBack()}>
                  <Icon name='arrow-back' style={{ color: 'black' }} />
              </Button>
          </Left>
      </Header>
      <Text style = {{fontSize: 30, fontWeight: 'bold', borderLeftWidth: 20, borderLeftColor: 'white'}}>
        {navigation.nameLoc}
      </Text>
      <Button style = {styles.button}> 
        <Text> View Schedule</Text>
      </Button>
      <Text style = {{fontSize: 20, marginLeft: 20, marginTop: 30}}>
        Inventory
      </Text>
      <View style = {{backgroundColor: 'rgb(236, 232, 232)', height: 4, width: (Dimensions.get('screen').width), marginTop: 10}}>
      </View>
      <Content>
        <List>
          <ListItem>
            <Left>
              <Thumbnail source={{ uri: imageURL }} style={styles.itemDetailImage} />
              <Text style = {{marginLeft:10}}>{itemName}{'\n'}{itemQuantity} Remaining</Text>
            </Left>
            <Right>
              <Button transparent>
                <Icon name='arrow-forward' style={{ color: 'black' }} />
              </Button>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Thumbnail source={{ uri: imageURL2 }} style={styles.itemDetailImage} />
              <Text style = {{marginLeft:10}}>{itemName2}{'\n'}{itemQuantity2} Remaining</Text>
            </Left>
            <Right>
              <Button transparent>
                <Icon name='arrow-forward' style={{ color: 'black' }} />
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