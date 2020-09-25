import React from 'react'
import { StyleSheet } from 'react-native'

import { Container, Text, Button, Icon, Left, Right, Body, Title, Header, List, ListItem } from 'native-base'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from './MainApp'

type LocationListScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Locations'>
}

type Props = {
  navigation: DrawerParamList
}

export default function LocationListScreen({ navigation }: Props) {

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
            <Button transparent onPress={() => navigation.navigate('InvenMain', { nameLoc: 'West Village' })}>
              <Icon name='arrow-forward' style={{ color: 'black' }} />
            </Button>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>The Quad</Text>
          </Left>
          <Right>
            <Button transparent onPress={() => navigation.navigate('InvenMain', { nameLoc: 'The Quad' })}>
              <Icon name='arrow-forward' style={{ color: 'black' }} />
            </Button>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Library</Text>
          </Left>
          <Right>
            <Button transparent onPress={() => navigation.navigate('InvenMain', { nameLoc: 'Library' })}>
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
