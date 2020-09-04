
import * as React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './screens/Drawer'
import NativeBasePOC from './screens/NativeBasePOC'
import TabTwoScreen from './screens/TabTwoScreen'
import InventoryDetails from './screens/InventoryDetails'
import NotFoundScreen from './screens/NotFoundScreen';

export type DrawerParamList = {
  Testing: undefined;
  Locations: undefined;
  Deliveries: undefined;
  Details: undefined;
  NotFoundScreen: undefined;
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
          name='Testing'
          component={NativeBasePOC}
          options={{ drawerLabel: 'Testing', drawerIcon: (props) => <Icon style={{ color: 'red' }} name='construct' /> }}
        />
        <Drawer.Screen
          name='Locations'
          component={NotFoundScreen}
          options={{ drawerLabel: 'Locations', drawerIcon: (props) => <Icon name='map' /> }}
        />
        <Drawer.Screen
          name='Deliveries'
          component={NotFoundScreen}
          options={{ drawerLabel: 'Deliveries', drawerIcon: (props) => <Icon name='notifications' /> }}
        />
        <Drawer.Screen
          name='Details'
          component={InventoryDetails}
          options={{ drawerLabel: 'details', drawerIcon: (props) => <Icon name='qr-scanner' /> }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
