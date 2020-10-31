import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppLoading } from 'expo'
import * as AuthSession from 'expo-auth-session'
import * as Font from 'expo-font'
import * as WebBrowser from 'expo-web-browser'
import { Button, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

import { APIFETCHLOCATION } from './constants'
import InitialScreen from './screens/InitialScreen'
import MainApp from './screens/MainApp'
import { TLSParamList } from './types'

const TopLevelStack = createStackNavigator<TLSParamList>()

WebBrowser.maybeCompleteAuthSession()

function App(): React.ReactElement {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  /*
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
*/
  const useProxy = Platform.select({ web: false, default: true })
  const discovery = {
    authorizationEndpoint: `${APIFETCHLOCATION}/auth/login`,
    tokenEndpoint: `${APIFETCHLOCATION}/auth/token-exchange`,
  }

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '',
      redirectUri: AuthSession.makeRedirectUri(),
      scopes: [],
    },
    discovery
  )

  useEffect(() => {
    console.log(response)
  }, [response])

  return (<>
    <Button />
    <Button />
    <Button rounded block onPress={() => promptAsync({ useProxy })}>
      <Text>{JSON.stringify(response)}</Text>
    </Button>
    </>
  )
}

export default App
