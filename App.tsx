
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NativeBasePOC from './screens/NativeBasePOC'

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen 
        name="Home" 
        component={NativeBasePOC}
        options={{drawerLabel: 'Testing'}} 
      />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
