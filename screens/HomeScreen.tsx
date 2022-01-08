import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  Container,
  Text,
  Button,
  Icon,
  Content,
  Left,
  Right,
  ListItem,
} from 'native-base'
import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Dimensions,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native'

import { TokenContext, LogoutContext, FirstNameContext } from '../App'
import { APIFETCHLOCATION } from '../constants'
import HomeScreenMap from '../platform-specific-components/HomeScreenMap'
import { DrawerParamList, MapStackParamList, Announcement } from '../types'

type HomeScreenRouteProp = RouteProp<DrawerParamList, 'Home'>

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList, 'Home'>,
  DrawerNavigationProp<DrawerParamList>
>

type Props = {
  route: HomeScreenRouteProp
  navigation: HomeScreenNavigationProp
}

type APIAnnouncement = {
  title: string
  id: string
  body: string
  timestamp: string
}

export const getItems = (
  apiEndpointURL: string,
  token: string | null,
  setAnnouncementList: (value: React.SetStateAction<Announcement[]>) => void,
  setLoading: (value: React.SetStateAction<boolean>) => void
): void => {
  fetch(apiEndpointURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${JSON.parse(JSON.stringify(token))}`,
    },
  })
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

export default function HomeScreen({
  navigation,
  route,
}: Props): React.ReactElement {
  const [isLoading, setLoading] = useState(true)
  const [AnnouncementList, setAnnouncementList] = useState<Announcement[]>([])

  const apiEndpointURL = `${APIFETCHLOCATION}/announcements`
  const [token, setToken] = useContext(TokenContext)
  const [firstName, setFirstName] = useContext(FirstNameContext)
  const [logout, setLogout] = useContext(FirstNameContext)

  const renderItem: ListRenderItem<Announcement> = ({ item }) => {
    return (
      <ListItem>
        <Left style={{ flexDirection: 'column' }}>
          <Text
            style={{
              marginLeft: 10,
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              fontSize: Dimensions.get('screen').width / 30,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              alignSelf: 'flex-start',
              fontSize: Dimensions.get('screen').width / 33,
            }}
          >
            {item.body}
          </Text>
        </Left>
        <Right>
          <Text
            style={{
              marginRight: 10,
              fontSize: Dimensions.get('screen').width / 33,
            }}
          >
            {item.timestamp}
          </Text>
        </Right>
      </ListItem>
    )
  }

  useEffect(() => {
    getItems(apiEndpointURL, token, setAnnouncementList, setLoading)
  }, [])

  const slicedAnnouncementList = AnnouncementList.slice(
    AnnouncementList.length - 4,
    AnnouncementList.length - 1
  )

  function AppLogout() {
    setLogout('true')
  }

  return (
    <TouchableOpacity style={styles.container}>
      <Container style={styles.top}>
        <Button
          transparent
          style={styles.backButton}
          onPress={() => navigation.openDrawer()}
        >
          <Icon name='menu' style={{ color: '#fff' }} />
        </Button>
        <Button
          transparent
          style={styles.backButton}
          onPress={() => AppLogout()}
        >
          <Icon name='log-out' style={{ color: '#fff' }} />
        </Button>
      </Container>
      <Container style={styles.belowTop}>
        <Text style={styles.titleName}>Welcome Back!</Text>
      </Container>

      <Container style={styles.topMiddle}>
        <Text style={styles.titleMap}>
          {Platform.OS === 'ios' ? 'Locations Near Me' : '   Locations Near Me'}
        </Text>
      </Container>
      <TouchableOpacity style={styles.middle} onPress={() => navigation.navigate('Locations')}>
        <HomeScreenMap navigation={navigation} token={token}/>
      </TouchableOpacity>
      <Container>
        <Container style={styles.announcements}>
          <Text
            style={{
              fontSize: Dimensions.get('screen').width / 20,
              fontWeight: 'bold',
              color: '#000',
            }}
          >
            Announcements
          </Text>
          <Button
            warning
            style={styles.buttons}
            onPress={() => navigation.navigate('Announcements')}
          >
            <Text style={{ fontSize: Dimensions.get('screen').width / 33 }}>
              View All
            </Text>
          </Button>
        </Container>
        <Container style={{ marginTop: 5 }}>
          <Content>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={slicedAnnouncementList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            )}
          </Content>
        </Container>
      </Container>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83ba83',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  top: {
    flex: 0.2,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 10,
    backgroundColor: '#83ba83',
    borderTopWidth: 10,
    borderTopColor: '#83ba83',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  belowTop: {
    flex: 0.2,
    backgroundColor: '#83ba83',
  },
  titleName: {
    color: 'white',
    fontSize: 18,
    marginLeft: 15,
    width: Dimensions.get('screen').width,
  },
  titleMap: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    borderLeftWidth: 15,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    width: Dimensions.get('screen').width,
  },
  backButton: {
    backgroundColor: '#83ba83',
  },
  searchButton: {
    backgroundColor: '#83ba83',
    flexDirection: 'row-reverse',
  },
  middle: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2,
    backgroundColor: '#fff',
  },
  middleImage: {
    width: Dimensions.get('screen').width / 1.1,
    height: Dimensions.get('screen').height / 2.5,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    resizeMode: 'contain',
    marginLeft: 20,
  },
  topMiddle: {
    flex: 0.24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'flex-end',
    width: Dimensions.get('screen').width,
  },
  announcements: {
    flex: 0.2,
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width,
    borderRightWidth: 25,
    borderRightColor: '#fff',
    borderLeftWidth: 25,
    marginTop: 10,
    borderLeftColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: 'rgb(235, 164, 52)',
    width: Dimensions.get('screen').width / 4.4,
    height: Dimensions.get('screen').height / 20,
  },
})
