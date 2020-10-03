import React from 'react'
import { StyleSheet } from 'react-native'

import { Container, Text, Button, Icon, Left, Right, Body, Title, Header, List, ListItem } from 'native-base'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList, InventoryStackParamList } from './MainApp'

type LocationListRouteProp = RouteProp<InventoryStackParamList, 'LocationList'>

type LocationListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<InventoryStackParamList, 'LocationList'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: LocationListRouteProp
  navigation: LocationListNavigationProp
}

export default function LocationList({ navigation }: Props) {

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
        <Body>
          <Title>Campus Locations</Title>
        </Body>
      </Header>
      <List>
        <ListItem>
          <Left>
            <Text>West Village</Text>
          </Left>
          <Right>
            <Button transparent onPress={() => navigation.navigate('InventoryMain', { nameLoc: 'West Village' })}>
              <Icon name='arrow-forward' style={{ color: 'black' }} />
            </Button>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>The Quad</Text>
          </Left>
          <Right>
            <Button transparent onPress={() => navigation.navigate('InventoryMain', { nameLoc: 'The Quad' })}>
              <Icon name='arrow-forward' style={{ color: 'black' }} />
            </Button>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Library</Text>
          </Left>
          <Right>
            <Button transparent onPress={() => navigation.navigate('InventoryMain', { nameLoc: 'Library' })}>
              <Icon name='arrow-forward' style={{ color: 'black' }} />
            </Button>
          </Right>
        </ListItem>
      </List>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row'
  },
})
