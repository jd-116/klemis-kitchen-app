import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Container, Thumbnail, Text } from 'native-base'
import { Linking, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
): React.ReactElement {
  const githubURL = 'https://github.com/jd-116'
  return (
    <Container>
      <Thumbnail
        large
        square
        source={require('../assets/images/klemis_logo.png')}
        style={{
          marginTop: 50,
          marginLeft: 20,
          marginBottom: 10,
        }}
      />
      <Text style={{ fontSize: 30, marginLeft: 20, marginBottom: 5 }}>
        Klemis Kitchen
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 20,
          marginBottom: 10,
          color: 'gray',
        }}
      >
        Part of Georgia Tech STAR Services
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(githubURL)
        }}
        style={{ alignItems: 'center' }}
      >
        <Text style={{ textAlign: 'center', paddingLeft: 10, paddingRight: 10 }}>
          Made with ❤️ by Joseph, Bhanu, Eric, Marc, and Neil
        </Text>
        <Thumbnail
          small
          source={require('../assets/images/GitHub-Mark-120px-plus.png')}
          style={{
            marginTop: 7,
            marginBottom: 10
          }}
        />
      </TouchableOpacity>
    </Container>
  )
}
