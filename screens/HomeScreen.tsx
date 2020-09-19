import React, { useState } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { Text, View } from '../components/Themed';
import MapView from 'react-native-maps'
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../App';

import {  Button, Icon, Body, Title, Thumbnail } from "native-base";
import HomeScreenMap from '../platform-specific-components/HomeScreenMap'

 type HomeScreenParamProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'HomeScreen'>
};

type Props = {
  navigation: DrawerParamList
}

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style = {styles.container}>
      <View style = {styles.top}>
        <View style = {styles.backButton}>
          <Button transparent>
            <Icon name = 'menu' style = {{color: '#fff'}}/>
          </Button>
        </View>
        <View style = {styles.searchButton}>
          <Button transparent>
            <Icon name = 'search'style = {{color: '#fff'}}/>
          </Button>
        </View>
      </View>
      <View style = {styles.belowTop}>
          <Text style = {styles.titleName}>
          Welcome Back, _____
        </Text>
      </View>
      <View style = {styles.topMiddle}>
        <Text style = {styles.titleMap}>
           Locations Near Me
        </Text>
      </View>
      <View style = {styles.middle}>
      <HomeScreenMap />
      </View>
      <View style = {styles.deliveries}>
        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#000'}}> 
          Delivery Schedule
        </Text>
        <Button style = {styles.buttons}>
          <Text>
            View All
          </Text>
        </Button>
      </View>
      <View style = {styles.announcements}>
        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#000'}}> 
          Announcements
        </Text>
        <Button style = {styles.buttons}>
          <Text>
            View All
          </Text>
        </Button>
      </View>
    </View>
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
    flex: .10,
    backgroundColor: '#83ba83',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  belowTop: {
    flex: .07,
    backgroundColor: '#83ba83',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  titleName: {
    flexGrow: 1,
    fontSize: 18,
    borderLeftWidth: 15,
    width: Dimensions.get('screen').width
  },
  titleMap: {
    flexGrow: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    borderLeftWidth: 15,
    borderTopWidth: 25,
    width: Dimensions.get('screen').width
  },
  backButton: {
    flexGrow: 1,
    backgroundColor: '#83ba83',
  },
  searchButton: {
    flexGrow: 1,
    backgroundColor: '#83ba83',
    flexDirection: 'row-reverse',
  },
  middle: {
    flex: .35,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  topMiddle: {
    flex: .1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'flex-end',
    width: Dimensions.get('screen').width
  },
  MapView: {
    width: (Dimensions.get('screen').width - 30),
    height: (Dimensions.get('screen').height/3.5),
    marginVertical: 10,
    marginHorizontal: 15
  },
  announcements: {
    flex: .2,
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
    flex: .2,
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width,
    borderRightWidth: 15,
    borderRightColor: '#fff',
    borderLeftWidth: 15,
    borderLeftColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: 'rgb(235, 164, 52)',
    padding: 15,
  },
});
