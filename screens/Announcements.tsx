import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import {
  Container,
  Text,
  Button,
  Icon,
  Content,
  Left,
  Right,
  Header,
  ListItem,
} from 'native-base'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native'

import { APIFETCHLOCATION } from '../constants'
import { Announcement, DrawerParamList } from '../types'

type AnnouncementsRouteProp = RouteProp<DrawerParamList, 'Announcements'>

type AnnouncementsNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'Announcements'
>

type Props = {
  route: AnnouncementsRouteProp
  navigation: AnnouncementsNavigationProp
}

type APIAnnouncement = {
  title: string
  id: string
  body: string
  timestamp: string
}

export const getItems = (
  apiEndpointURL: string,
  setAnnouncementList: (value: React.SetStateAction<Announcement[]>) => void,
  setLoading: (value: React.SetStateAction<boolean>) => void
): void => {
  fetch(apiEndpointURL)
    .then((response) => response.json())
    .then((json) =>
      setAnnouncementList(() => {
        const temp: Announcement[] = []
        json.announcements.forEach((ann: APIAnnouncement) => {
          const date = new Date(ann.timestamp)
          temp.push({
            title: ann.title,
            id: ann.id,
            body: ann.body,
            timestamp: `${date.getMonth() + 1}/${date.getDate()}/${
              date.getFullYear() % 100
            }`,
          })
        })
        return temp
      })
    )
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
}

export default function Announcements({
  navigation,
}: Props): React.ReactElement {
  const [isLoading, setLoading] = useState(true)
  const [AnnouncementList, setAnnouncementList] = useState<Announcement[]>([])

  const apiEndpointURL = `${APIFETCHLOCATION}/announcements`

  const renderItem: ListRenderItem<Announcement> = ({ item }) => {
    return (
      <ListItem>
        <Left style={{ flexDirection: 'column' }}>
          <Text
            style={{
              marginLeft: 10,
              fontWeight: 'bold',
              justifyContent: 'flex-start',
            }}
          >
            {item.title}
          </Text>
          <Text style={{ marginLeft: 10, justifyContent: 'flex-start' }}>
            {item.body}
          </Text>
        </Left>
        <Right>
          <Text style={{ marginRight: 10 }}>{item.timestamp}</Text>
        </Right>
      </ListItem>
    )
  }

  useEffect(() => {
    getItems(apiEndpointURL, setAnnouncementList, setLoading)
  }, [])

  return (
    <Container style={{ flex: 1 }}>
      <Header style={styles.header}>
        <Left style={{ flexDirection: 'row' }}>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name='menu' style={{ color: 'black' }} />
          </Button>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' style={{ color: 'black' }} />
          </Button>
        </Left>
      </Header>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        Announcements
      </Text>
      <Container
        style={{ backgroundColor: 'rgb(236, 232, 232)', maxHeight: 4 }}
      />
      <Content>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={AnnouncementList}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'rgb(235, 164, 52)',
    width: Dimensions.get('screen').width / 2.5,
    height: Dimensions.get('screen').height / 20,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginLeft: 20,
    marginTop: 10,
  },
  search: {
    width: Dimensions.get('screen').width / 2,
  },
  itemDetailImage: {
    resizeMode: 'contain',
  },
})
