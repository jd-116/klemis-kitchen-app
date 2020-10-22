import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import React, { useState } from 'react'

import InitialScreen from './screens/InitialScreen'
import MainApp from './screens/MainApp'
import { TLSParamList } from './types'

const TopLevelStack = createStackNavigator<TLSParamList>()

function App(): React.ReactElement {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  async function loadFontAsync() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
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
      <TopLevelStack.Navigator screenOptions={{ headerShown: false }}>
        <TopLevelStack.Screen name='Login' component={InitialScreen} />
        <TopLevelStack.Screen name='ActualApp' component={MainApp} />
      </TopLevelStack.Navigator>
    </NavigationContainer>
  )
}

export default App
