import React from 'react'
import Constants from 'expo-constants'
import { StyleSheet } from 'react-native'
import { Container, Icon } from 'native-base'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawerContent from './Drawer'
import NativeBasePOC from './NativeBasePOC'
import HomeScreen from './HomeScreen'
import InventoryDetails from './InventoryDetails'
import NotFoundScreen from './NotFoundScreen'
import { StackNavigationProp } from '@react-navigation/stack';



import { TLSParamList } from '../App'

type NativeBasePOCProps = {
  navigation: StackNavigationProp<TLSParamList, 'Login'>;
};

type Props = {
  navigation: TLSParamList
}

const Drawer = createDrawerNavigator<DrawerParamList>();

export type DrawerParamList = {
  Home: undefined;
  Locations: undefined;
  Announcements: undefined;
  Deliveries: undefined;
  Details: undefined;
  NotFoundScreen: undefined;
  Testing: undefined;
};

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
          component={NotFoundScreen}
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
          name='Details'
          component={InventoryDetails}
          options={{ drawerLabel: 'Details', drawerIcon: (props) => <Icon name='qr-scanner' style={styles.drawerIcon} /> }}
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
