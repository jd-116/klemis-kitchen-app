
import * as React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './screens/Drawer'
import NativeBasePOC from './screens/NativeBasePOC'
import TabTwoScreen from './screens/TabTwoScreen'

export type DrawerParamList = {
  Home: undefined;
  Locations: undefined;
  Deliveries: undefined;
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
          component={NativeBasePOC}
          options={{ drawerLabel: 'Testing', drawerIcon: (props) => <Icon style={{ color: 'white' }} name='home' /> }}
        />
        <Drawer.Screen
          name='Locations'
          component={TabTwoScreen}
          options={{ drawerLabel: 'Locations', drawerIcon: (props) => <Icon name='location' /> }}
        />
        <Drawer.Screen
          name='Deliveries'
          component={TabTwoScreen}
          options={{ drawerLabel: 'Deliveries', drawerIcon: (props) => <Icon name='scan' /> }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
