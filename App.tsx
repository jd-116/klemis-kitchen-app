import React, { useState } from 'react'
import { AppLoading } from 'expo'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import InitialScreen from './screens/InitialScreen'
import MainApp from './screens/MainApp'
import { createStackNavigator } from '@react-navigation/stack'

export type TLSParamList = {
  Login: undefined;
  ActualApp: undefined; //TODO: Add in user token
}

const TopLevelStack = createStackNavigator<TLSParamList>()

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  async function loadFontAsync() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  if (!fontsLoaded) {
    return (
      <AppLoading 
        startAsync={loadFontAsync}
        onFinish={() => setFontsLoaded(true)}
        onError={console.log}
        autoHideSplash={true}
      />
    )
  }

  return (
    <NavigationContainer>
      <TopLevelStack.Navigator screenOptions={{ headerShown: false }} >
        <TopLevelStack.Screen
          name='Login'
          component={InitialScreen}
        />
        <TopLevelStack.Screen
          name='ActualApp'
          component={MainApp}
        />
      </TopLevelStack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  drawerIcon: {
    width: 10
  }
})


export default App;
