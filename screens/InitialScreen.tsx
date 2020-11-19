import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button, Icon, Thumbnail, Container, Text } from 'native-base'
import React from 'react'
import { StyleSheet, Dimensions, Linking } from 'react-native'

import { TLSParamList } from '../types'

type InitialScreenRouteProp = RouteProp<TLSParamList, 'Login'>

type InitialScreenNavigationProp = StackNavigationProp<TLSParamList, 'Login'>

type Props = {
  route: InitialScreenRouteProp
  navigation: InitialScreenNavigationProp
}

export default function InitialScreen({
  navigation,
}: Props): React.ReactElement {
  const starServicesURL = 'https://studentlife.gatech.edu/content/star-services'

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
          onPress={() => navigation.navigate('ActualApp')}
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
