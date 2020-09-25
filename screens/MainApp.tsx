import React from 'react'
import Constants from 'expo-constants'
import { StyleSheet } from 'react-native'
import { Container, Icon } from 'native-base'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawerContent from './Drawer'
import NativeBasePOC from './NativeBasePOC'
import HomeScreen from './HomeScreen'
import LocationList from './LocationList'
import InventoryMain from './InventoryMain'
import InventoryDetails from './InventoryDetails'
import NotFoundScreen from './NotFoundScreen'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'

import { TLSParamList } from '../App'
import InventoryDetailsScreen from './InventoryDetails'

type NativeBasePOCProps = {
  navigation: StackNavigationProp<TLSParamList, 'Login'>
};

type Props = {
  navigation: TLSParamList
}

export type DrawerParamList = {
  Home: undefined
  Locations: undefined
  Announcements: undefined
  Deliveries: undefined
  NotFoundScreen: undefined
  Testing: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()

export type StackParamList = {
  Locations: undefined
  InvenMain: { nameLoc: 'Unknown' }
  Details: {nameItem: 'Unknown', numItem: undefined, pic: undefined, nameLoc: 'Unknown'}
}

const Stack = createStackNavigator<StackParamList>()

function InventorySystem() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName='Locations'>
      <Stack.Screen name='Locations' component={LocationList} />
      <Stack.Screen name='InvenMain' component={InventoryMain} />
      <Stack.Screen name='Details' component={InventoryDetails} />
    </Stack.Navigator>
  )
}

export default function MainApp({ navigation }: Props) {
  return (
    <Container style={styles.rootContainer}>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        initialRouteName='Home'
      >
        <Drawer.Screen
          name='Home'
          component={HomeScreen}
          options={{ drawerLabel: 'Home', drawerIcon: (props) => <Icon name='home' style={styles.drawerIcon} /> }}
        />
        <Drawer.Screen
          name='Locations'
          component={InventorySystem}
          options={{ drawerLabel: 'Locations', drawerIcon: (props) => <Icon name='map' style={styles.drawerIcon} /> }}
        />
        <Drawer.Screen
          name='Announcements'
          component={NotFoundScreen}
          options={{ drawerLabel: 'Announcements', drawerIcon: (props) => <Icon name='notifications' style={styles.drawerIcon} /> }}
        />
        <Drawer.Screen
          name='Deliveries'
          component={NotFoundScreen}
          options={{ drawerLabel: 'Deliveries', drawerIcon: (props) => <Icon name='cube' style={styles.drawerIcon} /> }}
        />
        <Drawer.Screen
          name='Testing'
          component={NativeBasePOC}
          options={{ drawerLabel: 'Testing', drawerIcon: (props) => <Icon name='construct' style={{ color: 'red', width: 10 }} /> }}
        />
      </Drawer.Navigator>
    </Container>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: Constants.statusBarHeight
  },
  drawerIcon: {
    width: 10
  }
})