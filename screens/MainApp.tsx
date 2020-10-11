import React from 'react'
import Constants from 'expo-constants'
import { StyleSheet } from 'react-native'
import { Container, Icon } from 'native-base'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawerContent from './Drawer'
import HomeScreen from './HomeScreen'
import LocationList from './LocationList'
import InventoryMain, { PantryItem } from './InventoryMain'
import InventoryDetails from './InventoryDetails'
import InventorySearch from './InventorySearch'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'

import { TLSParamList } from '../App'

//USE THIS TO SPECIFY A LOCATION TO GET THE API FROM
//VALUES: 'github', 'localhost', 'production'
//GITHUB from Klemis Kitchen App's GitHub
//LOCALHOST fetches Klemis-Kitchen-API Docker Container you are running
//NOTE: you will need to disable CORS for this one to work
//PRODUCTION is not implemented yet
export const APIFETCHLOCATION = 'localhost'

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

export type Location = {
  locationName: string,
  locationID: string
}

//WHEN YOU'RE ADDING STUFF HERE DON'T ADD IT AS UNDEFINED !!!!!!
export type InventoryStackParamList = {
  LocationList: undefined
  InventoryMain: Location
  InventoryDetails: {
    location: Location,
    item: PantryItem
  }
  InventorySearch: Location
}

const Stack = createStackNavigator<InventoryStackParamList>()

function InventorySystem() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName='LocationList'>
      <Stack.Screen name='LocationList' component={LocationList} />
      <Stack.Screen name='InventoryMain' component={InventoryMain} />
      <Stack.Screen name='InventoryDetails' component={InventoryDetails} />
      <Stack.Screen name='InventorySearch' component={InventorySearch} />
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
          component={HomeScreen}
          options={{ drawerLabel: 'Announcements', drawerIcon: (props) => <Icon name='notifications' style={styles.drawerIcon} /> }}
        />
        <Drawer.Screen
          name='Deliveries'
          component={HomeScreen}
          options={{ drawerLabel: 'Deliveries', drawerIcon: (props) => <Icon name='cube' style={styles.drawerIcon} /> }}
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
    color: 'black'
  }
})
