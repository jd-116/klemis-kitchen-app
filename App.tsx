
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NativeBasePOC from './screens/NativeBasePOC'
import HomeScreen from './screens/HomeScreen'

export type DrawerParamList = {
  Home: undefined;
  HomeScreen: undefined;
  Locations: undefined;
  Deliveries: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName='Home'>
        <Drawer.Screen 
        name="Home" 
        component={NativeBasePOC}
        options={{drawerLabel: 'Testing'}} 
      />
      <Drawer.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{drawerLabel: 'HomeScreen'}} 
      />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
