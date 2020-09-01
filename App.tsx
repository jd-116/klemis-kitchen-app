
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './screens/Drawer'
import NativeBasePOC from './screens/NativeBasePOC'
import TabTwoScreen from './screens/TabTwoScreen'


const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props}/>} 
        initialRouteName='Home'
      >
        <Drawer.Screen 
          name='Home' 
          component={NativeBasePOC}
          options={{drawerLabel: 'Testing'}} 
        />
        <Drawer.Screen
          name='Another screen'
          component={TabTwoScreen}
          options={{drawerLabel: 'Another screen'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
