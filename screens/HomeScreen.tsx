import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { DrawerParamList } from './MainApp';
import { RouteProp } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

import { Button, Icon, Container, Text } from "native-base";
import HomeScreenMap from '../platform-specific-components/HomeScreenMap'

type HomeScreenRouteProp = RouteProp<DrawerParamList, 'Home'>

type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>

type Props = {
  route: HomeScreenRouteProp
  navigation: HomeScreenNavigationProp
}

export default function HomeScreen({ navigation }: Props) {
  const [name, setName] = useState('George Burdell')

  return (
    <Container style={styles.container}>
      <Container style={styles.top}>
        <Button transparent style={styles.backButton} onPress={() => navigation.openDrawer()}>
          <Icon name='menu' style={{ color: '#fff' }} />
        </Button>
        <Button transparent style={styles.searchButton}>
          <Icon name='search' style={{ color: '#fff' }} />
        </Button>
      </Container>
      <Container style={styles.belowTop}>
        <Text style={styles.titleName}>
          Welcome Back, {name.split(' ')[0]}!
        </Text>
      </Container>
      <Container style={styles.topMiddle}>
        <Text style={styles.titleMap}>
          Locations Near Me
        </Text>
      </Container>
      <Container style={styles.middle}>
        <HomeScreenMap />
      </Container>
      <Container style={styles.deliveries}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
          Delivery Schedule
        </Text>
        <Button style={styles.buttons}>
          <Text style={{ fontSize: 12 }}>
            View All
          </Text>
        </Button>
      </Container>
      <Container style={styles.announcements}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
          Announcements
        </Text>
        <Button style={styles.buttons}>
          <Text style={{ fontSize: 12 }}>
            View All
          </Text>
        </Button>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83ba83',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  top: {
    flex: .35,
    width: Dimensions.get('screen').width,
    height: (Dimensions.get('screen').height / 10),
    backgroundColor: '#83ba83',
    borderTopWidth: 10,
    borderTopColor: '#83ba83',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  belowTop: {
    flex: .2,
    backgroundColor: '#83ba83',
  },
  titleName: {
    color: 'white',
    fontSize: 18,
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',
    width: Dimensions.get('screen').width
  },
  titleMap: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    borderLeftWidth: 15,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    width: Dimensions.get('screen').width
  },
  backButton: {
    backgroundColor: '#83ba83',
  },
  searchButton: {
    backgroundColor: '#83ba83',
    flexDirection: 'row-reverse',
  },
  middle: {
    flex: 1.4,
    width: (Dimensions.get('screen').width),
    height: (Dimensions.get('screen').height / 2.3),
    backgroundColor: '#fff',
  },
  middleImage: {
    width: (Dimensions.get('screen').width / 1.1),
    height: (Dimensions.get('screen').height / 2.5),
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    resizeMode: 'contain',
    borderLeftWidth: 20,
    borderLeftColor: 'white'
  },
  topMiddle: {
    flex: .24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'flex-end',
    width: Dimensions.get('screen').width
  },
  announcements: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width,
    borderRightWidth: 15,
    borderRightColor: '#fff',
    borderLeftWidth: 15,
    borderLeftColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveries: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width,
    borderRightWidth: 15,
    borderRightColor: '#fff',
    borderLeftWidth: 15,
    borderTopWidth: 15,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: 'rgb(235, 164, 52)',
    width: (Dimensions.get('screen').width / 4),
    height: (Dimensions.get('screen').height / 20),
  },
})
