import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants'
import { Container, Icon } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

import { DrawerParamList, InventoryStackParamList } from '../types'
import CustomDrawerContent from './Drawer'
import HomeScreen from './HomeScreen'
import InventoryDetails from './InventoryDetails'
import InventoryMain from './InventoryMain'
import InventorySearch from './InventorySearch'
import LocationList from './LocationList'

const Drawer = createDrawerNavigator<DrawerParamList>()

const Stack = createStackNavigator<InventoryStackParamList>()

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

export default function MainApp(): React.ReactElement {
  return (
    <Container style={styles.rootContainer}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName='Home'
      >
        <Drawer.Screen
          name='Home'
          component={HomeScreen}
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
          component={HomeScreen}
          options={{
            drawerLabel: 'Announcements',
            drawerIcon: () => (
              <Icon name='notifications' style={styles.drawerIcon} />
            ),
          }}
        />
        <Drawer.Screen
          name='Deliveries'
          component={HomeScreen}
          options={{
            drawerLabel: 'Deliveries',
            drawerIcon: () => <Icon name='cube' style={styles.drawerIcon} />,
          }}
        />
      </Drawer.Navigator>
    </Container>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: Constants.statusBarHeight,
  },
  drawerIcon: {
    color: 'black',
  },
})
