import AsyncStorage from '@react-native-async-storage/async-storage'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as AuthSession from 'expo-auth-session'
import { Button, Icon, Thumbnail, Container, Text } from 'native-base'
import React, { useContext } from 'react'
import { StyleSheet, Dimensions, Linking, Alert, Platform } from 'react-native'

import { TokenContext } from '../App'
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
  route,
}: Props): React.ReactElement {
  const starServicesURL = 'https://studentlife.gatech.edu/content/star-services'

  const [respond, setRespond] = React.useState<Response>()

  const [loaded, setLoaded] = React.useState<string | null>()

  const [token, setToken] = useContext(TokenContext)

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
      setToken(respond.token)
      navigation.navigate('ActualApp')
    }
  }, [respond])

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {}
  }

  function getData() {
    try {
      AsyncStorage.getItem('token').then((storageToken) =>
        loginBranch(storageToken)
      )
    } catch (e) {
      setLoaded(null)
    }
  }

  function setNavigate(token: string) {
    setToken(token)
    navigation.navigate('ActualApp')
  }

  function loginBranch(load: any) {
    if (load) {
      const sessionRequest = new Request(authorizationSession, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${load}`,
        },
      })
      fetch(sessionRequest)
        .then((response) => response.json())
        .then((json) => setNavigate(load))

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
          onPress={() => AsyncStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJucGF0ZWw0MzQiLCJnaXZlbl9uYW1lIjoiTmVpbCIsImZhbWlseV9uYW1lIjoiUGF0ZWwiLCJpYXQiOiIyMDIwLTExLTIwVDE1OjQ3OjQ3LjEzMjc4Mjk5OVoiLCJrbGVtaXM6ZXhhIjpudWxsLCJrbGVtaXM6cGVybSI6eyJhZG1pbl9hY2Nlc3MiOnRydWV9fQ.T9tQ-sFVnbcpZ5da30uuIFACM2xEAq5Un36HHRhXKL8')
            .then(() => {
              setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJucGF0ZWw0MzQiLCJnaXZlbl9uYW1lIjoiTmVpbCIsImZhbWlseV9uYW1lIjoiUGF0ZWwiLCJpYXQiOiIyMDIwLTExLTIwVDE1OjQ3OjQ3LjEzMjc4Mjk5OVoiLCJrbGVtaXM6ZXhhIjpudWxsLCJrbGVtaXM6cGVybSI6eyJhZG1pbl9hY2Nlc3MiOnRydWV9fQ.T9tQ-sFVnbcpZ5da30uuIFACM2xEAq5Un36HHRhXKL8')
              navigation.navigate('ActualApp')})}
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
