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
  // const [avatar, setAvatar] = useState(
  //   'https://media.discordapp.net/attachments/664605666815639552/751559829809791056/buzz.png'
  // )
  // const [name, setName] = useState('George Burdell')
  // const [gtid, setGTID] = useState('903XXXXXX')

  const avatar =
    'https://media.discordapp.net/attachments/664605666815639552/751559829809791056/buzz.png'
  const name = 'George Burdell'
  const gtid = '903XXXXXX'

  return (
    <Container>
      <Thumbnail
        large
        source={{ uri: avatar }}
        style={{
          marginTop: 50,
          marginLeft: 20,
          marginBottom: 10,
        }}
      />
      <Text style={{ fontSize: 30, marginLeft: 20, marginBottom: 5 }}>
        {name}
      </Text>
      <Text style={{ fontSize: 15, marginLeft: 20, color: 'gray' }}>
        {gtid}
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </Container>
  )
}
