import React, { useState } from 'react'
import { AppLoading } from 'expo'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import InitialScreen from './screens/InitialScreen'
import CustomDrawerContent from './screens/Drawer'
import NativeBasePOC from './screens/NativeBasePOC'
import HomeScreen from './screens/HomeScreen'
import InventoryDetails from './screens/InventoryDetails'
import NotFoundScreen from './screens/NotFoundScreen'
import { createStackNavigator } from '@react-navigation/stack'

export type TLSParamList = {
  Login: undefined;
  ActualApp: undefined; //TODO: Add in user token
}

export type DrawerParamList = {
  Home: undefined;
  Locations: undefined;
  Announcements: undefined;
  Deliveries: undefined;
  Details: undefined;
  NotFoundScreen: undefined;
  Testing: undefined;
};

const TopLevelStack = createStackNavigator<TLSParamList>()

const Drawer = createDrawerNavigator<DrawerParamList>();

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  async function loadFontAsync() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  if (!fontsLoaded) {
    return (
      <AppLoading 
        startAsync={loadFontAsync}
        onFinish={() => setFontsLoaded(true)}
        onError={console.log}
        autoHideSplash={true}
      />
    )
  }

  return (
    <NavigationContainer>
      <TopLevelStack.Navigator screenOptions={{ headerShown: false }} >
        <TopLevelStack.Screen
          name='Login'
          component={InitialScreen}
        />
        <TopLevelStack.Screen
          name='ActualApp'
          component={() => {
            return (
              <Drawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}
                initialRouteName='Home'
              >
                <Drawer.Screen
                  name='Home'
                  component={HomeScreen}
                  options={{ drawerLabel: 'Home', drawerIcon: (props) => <Icon name='home' style={styles.drawerIcon} /> }}
                />
                <Drawer.Screen
                  name='Locations'
                  component={NotFoundScreen}
                  options={{ drawerLabel: 'Locations', drawerIcon: (props) => <Icon name='map' style={styles.drawerIcon} /> }}
                />
                <Drawer.Screen
                  name='Announcements'
                  component={NotFoundScreen}
                  options={{ drawerLabel: 'Announcements', drawerIcon: (props) => <Icon name='notifications' style={styles.drawerIcon} /> }}
                />
                <Drawer.Screen
                  name='Deliveries'
                  component={NotFoundScreen}
                  options={{ drawerLabel: 'Deliveries', drawerIcon: (props) => <Icon name='cube' style={styles.drawerIcon} /> }}
                />
                <Drawer.Screen
                  name='Details'
                  component={InventoryDetails}
                  options={{ drawerLabel: 'Details', drawerIcon: (props) => <Icon name='qr-scanner' style={styles.drawerIcon} /> }}
                />
                <Drawer.Screen
                  name='Testing'
                  component={NativeBasePOC}
                  options={{ drawerLabel: 'Testing', drawerIcon: (props) => <Icon name='construct' style={{ color: 'red', width: 10 }} /> }}
                />
              </Drawer.Navigator>
            )
          }}
        />
      </TopLevelStack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  drawerIcon: {
    width: 10
  }
})


export default App;
