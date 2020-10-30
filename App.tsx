import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppLoading } from 'expo'
import * as AuthSession from 'expo-auth-session'
import * as Font from 'expo-font'
import React, { useState } from 'react'

import InitialScreen from './screens/InitialScreen'
import MainApp from './screens/MainApp'
import { TLSParamList } from './types'

const TopLevelStack = createStackNavigator<TLSParamList>()

function App(): React.ReactElement {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const [userInfo, setUserInfo] = useState()

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

  const handleGTLogin = async () => {
    const redirectURL = AuthSession.getRedirectUrl()
    const results = await AuthSession.startAsync({
      authUrl: '',
    })
    if (results.type === 'success') {
      setLoggedIn(true)
      setLoginFailed(false)
      setUserInfo(results.params.whatever)
    } else {
      setLoggedIn(false)
      setLoginFailed(true)
    }
  }

  return (
    <NavigationContainer>
      <TopLevelStack.Navigator screenOptions={{ headerShown: false }}>
        {loggedIn ? (
          <TopLevelStack.Screen name='Login' component={InitialScreen} />
        ) : loginFailed ? (
          <TopLevelStack.Screen name='ActualApp' component={MainApp} />
        ) : (
          <TopLevelStack.Screen name='ActualApp' component={MainApp} />
        )}
      </TopLevelStack.Navigator>
    </NavigationContainer>
  )
}

export default App
