import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Container, Thumbnail, Text } from 'native-base'
import React from 'react'

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
): React.ReactElement {
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
    </Container>
  )
}
