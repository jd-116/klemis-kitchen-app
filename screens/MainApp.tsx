import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants'
import { Container, Icon } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

import {
  DrawerParamList,
  InventoryStackParamList,
  MapStackParamList,
} from '../types'
import Announcements from './Announcements'
import CustomDrawerContent from './Drawer'
import HomeScreen from './HomeScreen'
import InventoryDetails from './InventoryDetails'
import InventoryMain from './InventoryMain'
import InventorySearch from './InventorySearch'
import LocationList from './LocationList'

const Drawer = createDrawerNavigator<DrawerParamList>()

const Stack = createStackNavigator<InventoryStackParamList>()

const MapStack = createStackNavigator<MapStackParamList>()

function InventorySystem() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='LocationList'
    >
      <Stack.Screen name='LocationList' component={LocationList} />
      <Stack.Screen name='InventoryMain' component={InventoryMain} />
      <Stack.Screen name='InventoryDetails' component={InventoryDetails} />
      <Stack.Screen name='InventorySearch' component={InventorySearch} />
    </Stack.Navigator>
  )
}

function MapToInventory() {
  return (
    <MapStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Home'
    >
      <MapStack.Screen name='Home' component={HomeScreen} />
      <MapStack.Screen name='InventoryMain' component={InventoryMain} />
      <Stack.Screen name='InventoryDetails' component={InventoryDetails} />
      <Stack.Screen name='InventorySearch' component={InventorySearch} />
    </MapStack.Navigator>
  )
}

export default function MainApp(): React.ReactElement {
  return (
    <Container>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName='Home'
      >
        <Drawer.Screen
          name='Home'
          component={MapToInventory}
          options={{
            drawerLabel: 'Home',
            drawerIcon: () => <Icon name='home' style={styles.drawerIcon} />,
          }}
        />
        <Drawer.Screen
          name='Locations'
          component={InventorySystem}
          options={{
            drawerLabel: 'Locations',
            drawerIcon: () => <Icon name='map' style={styles.drawerIcon} />,
          }}
        />
        <Drawer.Screen
          name='Announcements'
          component={Announcements}
          options={{
            drawerLabel: 'Announcements',
            drawerIcon: () => (
              <Icon name='notifications' style={styles.drawerIcon} />
            ),
          }}
        />
      </Drawer.Navigator>
    </Container>
  )
}

const styles = StyleSheet.create({
  drawerIcon: {
    color: 'black',
  },
})
