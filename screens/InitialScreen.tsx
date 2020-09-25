
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Icon, Thumbnail, Container, Text } from "native-base";

import { StackNavigationProp } from '@react-navigation/stack';
import { TLSParamList } from '../App'

type NativeBasePOCProps = {
  navigation: StackNavigationProp<TLSParamList, 'Login'>;
};

type Props = {
  navigation: TLSParamList
}

export default function InitialScreen({ navigation }: Props) {
  return (
    <Container style={styles.MainContainer}>
      <Thumbnail
        square
        source={{ uri: 'https://avatars3.githubusercontent.com/u/69819001?s=200&v=4' }}
        style={styles.Logo}
      />
      <Text style={styles.OrgName}>Klemis Kitchen</Text>
      <Button bordered iconLeft style={styles.MoreInfoButton}>
        <Icon name='information-circle' style={{ color: 'white' }} />
        <Text style={{ color: 'white' }}>
          More Information
        </Text>
      </Button>
      <Container style={{ width: 150, backgroundColor: '83bda8' }}>
        <Button
          rounded
          block
          style={styles.LoginButton}
          onPress={() => navigation.navigate('ActualApp')}>
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
    marginTop: (Dimensions.get('screen').height) * .15,
    marginLeft: (Dimensions.get('screen').width) * .1,
    height: (Dimensions.get('screen').width) * .25,
    width: (Dimensions.get('screen').width) * .25,
    resizeMode: 'contain',
  },
  OrgName: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 45,
    color: 'white',
    marginLeft: (Dimensions.get('screen').width) * .1,
  },
  MoreInfoButton: {
    marginTop: 0,
    marginLeft: (Dimensions.get('screen').width) * .1,
    borderColor: 'white'
  },
  LoginButton: {
    marginTop: (Dimensions.get('screen').height) * .1,
    marginLeft: (Dimensions.get('screen').width) * .1,
    backgroundColor: '#a7dac6',
  },
  LoginButtonText: {
    color: '#4f4f4f',
  }
})
