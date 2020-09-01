import * as React from 'react';
import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, CheckBox } from 'native-base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../App'

type NativeBasePOCProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Home'>;
};


type Props = {
  navigation: DrawerParamList
}


export default function NativeBasePOC({ navigation }: Props) {
  return (
    <Container>
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn.discordapp.com/emojis/746217684022067312.png?v=1' }} />
              <Body>
                <Text>majsoul</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image source={{ uri: 'https://media.discordapp.net/attachments/706282577409081464/749758840932663376/aiharamai-4.png' }} style={{ height: 200, width: 200, flex: 1 }} />
              <Text>
                tsumo please please
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: '#87838B' }}>
                <Icon name="trophy" />
                <Text>1,926 stars</Text>
              </Button>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <CheckBox checked={true} />
              <Text>I love Kaguyahime</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Button rounded onPress={() => navigation.openDrawer()}>
              <Text>Open Drawer</Text>
            </Button>
            <Button rounded onPress={() => navigation.navigate('Another screen')}>
              <Text>Go to other screen</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
