
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './screens/Drawer'
import NativeBasePOC from './screens/NativeBasePOC'
import HomeScreen from './screens/HomeScreen'
import InventoryDetails from './screens/InventoryDetails'
import NotFoundScreen from './screens/NotFoundScreen';

export type DrawerParamList = {
  Home: undefined;
  Locations: undefined;
  Announcements: undefined;
  Deliveries: undefined;
  Details: undefined;
  NotFoundScreen: undefined;
  Testing: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  drawerIcon: {
    width: 10
  }
})


export default App;
