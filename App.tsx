import * as AuthSession from 'expo-auth-session'
import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import {
  AsyncStorage,
  Alert,
  Button,
  Platform,
  StyleSheet,
  View,
} from 'react-native'

import { APIFETCHLOCATION } from './constants'

const auth0ClientId = 'trolling'
const authorizationEndpoint = `${APIFETCHLOCATION}/auth/login`

const discovery = {
  authorizationEndpoint: `${APIFETCHLOCATION}/auth/login`,
  tokenEndpoint: `${APIFETCHLOCATION}/auth/token_exchange`,
}

const useProxy = Platform.select({ web: false, default: true })
const redirectUri = AuthSession.makeRedirectUri({ useProxy })

export default function App() {
  const [code, setCode] = React.useState(null)

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      responseType: AuthSession.ResponseType.Token,
      clientId: 'trollin',
      scopes: [],
      // For usage in managed apps using the proxy
      redirectUri: AuthSession.makeRedirectUri(),
    },
    discovery
  )

  let timeout = null

  React.useEffect(() => {
    console.log(authorizationEndpoint)
    getCodeFromStorage()
    console.log('get code ', code)
    try {
      SplashScreen.preventAutoHideAsync()
    } catch (e) {
      console.log(e)
    }
    timeout = setTimeout(hideSplashScreen, 1000)

    return function cleanup() {
      clearTimeout(timeout)
    }
  })

  const getCodeFromStorage = async () => {
    const code = await AsyncStorage.getItem('code')
    if (code) setCode(code)
  }

  React.useEffect(() => {
    console.log(response)
    if (response) {
      if (response.error) {
        Alert.alert(
          'Authentication error',
          response.params.error_description || 'something went wrong'
        )
        return
      }
      if (response.type === 'success') {
        const { code } = response.params
        AsyncStorage.setItem('code', code)
        setCode(code)
      }
    }
  }, [response])

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync()
  }

  if (code) {
    <View>
      <Button
        disabled={!request}
        title='lololol'
        onPress={() => promptAsync({ useProxy })}
      />
    </View>
  } else {
    return (
      <View style={styles.container}>
        <Button
          disabled={!request}
          title='Log in with Auth0'
          onPress={() => promptAsync({ useProxy })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
})
