import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { Text } from '../components/Themed';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../App';

import {  Button, Icon, Body, Title, Thumbnail, Container, Card, Content } from "native-base";
import { useState } from 'react';

 type HomeScreenParamProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'HomeScreen'>
};

type Props = {
  navigation: DrawerParamList
}

export default function HomeScreen({ navigation }: Props) {
  const [imageURL, setImageURL] = useState('https://cdn.discordapp.com/attachments/664605666815639552/751561243978104903/iu.png')
  return (
    <Container style = {styles.container}>
      <Container style = {styles.top}>
        <Button transparent style = {styles.backButton}>
          <Icon name = 'menu' style = {{color: '#fff'}}/>
        </Button>
        <Button transparent style = {styles.searchButton}>
          <Icon name = 'search'style = {{color: '#fff'}}/>
        </Button>
      </Container>
      <Container style = {styles.belowTop}>
          <Text style = {styles.titleName}>
          Welcome Back, _____
        </Text>
      </Container>
      <Container style = {styles.topMiddle}>
        <Text style = {styles.titleMap}>
           Locations Near Me
        </Text>
      </Container>
      <Container style = {styles.middle}>        
        <Thumbnail source={{ uri: imageURL }} style = {styles.middleImage}/>
      </Container>
      <Container style = {styles.deliveries}>
        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#000'}}> 
          Delivery Schedule
        </Text>
        <Button style = {styles.buttons}>
          <Text style = {{fontSize: 10}}>
            View All
          </Text>
        </Button>
      </Container>
      <Container style = {styles.announcements}>
        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#000'}}> 
          Announcements
        </Text>
        <Button style = {styles.buttons}>
          <Text style = {{fontSize: 10}}>
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
    width: (Dimensions.get('screen').width/1.1),
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
    padding: (Dimensions.get('screen').width/17),
    width: (Dimensions.get('screen').width/4),
    height: (Dimensions.get('screen').height/20),
  },
});
