import AsyncStorage from '@react-native-async-storage/async-storage'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as AuthSession from 'expo-auth-session'
import { Button, Icon, Thumbnail, Container, Text } from 'native-base'
import React from 'react'
import { StyleSheet, Dimensions, Linking, Alert, Platform } from 'react-native'

import { APIFETCHLOCATION } from '../constants'
import { TLSParamList } from '../types'

type InitialScreenRouteProp = RouteProp<TLSParamList, 'Login'>

type InitialScreenNavigationProp = StackNavigationProp<TLSParamList, 'Login'>

type Props = {
  route: InitialScreenRouteProp
  navigation: InitialScreenNavigationProp
}

const authorizationSession = `${APIFETCHLOCATION}/auth/session`

const discovery = {
  authorizationEndpoint: `${APIFETCHLOCATION}/auth/login`,
  tokenEndpoint: `${APIFETCHLOCATION}/auth/token_exchange`,
}

type Response = {
  permissions: {
    admin_access: boolean
  }
  session: {
    expires_after: number | null
    first_name: string
    issued_at: string
    last_name: string
    username: string
  }
  token: string
}

const useProxy = Platform.select({ web: false, default: true })

export default function InitialScreen({
  navigation,
  route
}: Props): React.ReactElement {
  const starServicesURL = 'https://studentlife.gatech.edu/content/star-services'

  const [respond, setRespond] = React.useState<Response>()

  const [loaded, setLoaded] = React.useState<string | null>()

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      responseType: AuthSession.ResponseType.Token,
      clientId: 'trollin',
      scopes: [],
      // For usage in managed apps using the proxy
      redirectUri: AuthSession.makeRedirectUri(),
    },
    discovery
  )

  React.useEffect(() => {
    if (result) {
      if (result.errorCode) {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        )
        return
      }
      if (result.type === 'error' && result.url) {
        const { code } = result.params
        AsyncStorage.setItem('code', code)
        const tokenEndpoint = `${APIFETCHLOCATION}/auth/token-exchange`
        const request = new Request(tokenEndpoint, {
          method: 'POST',
          body: `${code}`,
        })
        fetch(tokenEndpoint, { method: 'POST', body: `${code}` })
          .then((response) => response.json())
          .then((json) => setRespond(json))

          .catch((error) => console.error(error))
      }
    }
  }, [result])

  React.useEffect(() => {
    if (respond?.token) {
      storeData(respond.token)
      navigation.navigate('ActualApp', { token: respond.token })
    }
  }, [respond])

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {}
  }

  function getData() {
    try {
      AsyncStorage.getItem('token').then((token) => 
      loginBranch(token)
    )} catch (e) {
      console.log('?')
      setLoaded(null)
    }
  }

  function loginBranch(load: any) {
    if (load) {
      const sessionRequest = new Request(authorizationSession, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(JSON.stringify(load))}`,
        },
      })
      console.log(load)
      fetch(sessionRequest)
        .then((response) => response.json())
        .then((json) => navigation.navigate('ActualApp', { token: load }))

        .catch((error) => promptAsync({ useProxy }))
    } else {
      promptAsync({ useProxy })
    }
  }

  return (
    <Container style={styles.MainContainer}>
      <Thumbnail
        square
        source={require('../assets/images/klemis_logo.png')}
        style={styles.Logo}
      />
      <Text style={styles.OrgName}>Klemis Kitchen</Text>
      <Button
        bordered
        iconLeft
        style={styles.MoreInfoButton}
        onPress={() => {
          Linking.openURL(starServicesURL)
        }}
      >
        <Icon name='information-circle' style={{ color: 'white' }} />
        <Text style={{ color: 'white' }}>More Information</Text>
      </Button>
      <Container style={{ width: 150, backgroundColor: '83bda8' }}>
        <Button
          rounded
          block
          style={styles.LoginButton}
          onPress={() => getData()}
        >
          <Text style={styles.LoginButtonText}>Login</Text>
        </Button>
      </Container>
    </Container>
  )
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#83bda8',
  },
  Logo: {
    marginTop: Dimensions.get('screen').height * 0.15,
    marginLeft: Dimensions.get('screen').width * 0.1,
    height: Dimensions.get('screen').width * 0.25,
    width: Dimensions.get('screen').width * 0.25,
    resizeMode: 'contain',
  },
  OrgName: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 45,
    color: 'white',
    marginLeft: Dimensions.get('screen').width * 0.1,
  },
  MoreInfoButton: {
    marginTop: 0,
    marginLeft: Dimensions.get('screen').width * 0.1,
    borderColor: 'white',
  },
  LoginButton: {
    marginTop: Dimensions.get('screen').height * 0.1,
    marginLeft: Dimensions.get('screen').width * 0.1,
    backgroundColor: '#a7dac6',
  },
  LoginButtonText: {
    color: '#4f4f4f',
  },
})
