
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NativeBasePOC from './screens/NativeBasePOC'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ NativeBasePOC } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
