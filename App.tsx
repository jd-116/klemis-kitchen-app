import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import React, { useState } from 'react'

import InitialScreen from './screens/InitialScreen'
import MainApp from './screens/MainApp'
import { TLSParamList } from './types'

export const TokenContext = React.createContext<TokenContextType>([
  '',
  () => { },
])

export const FirstNameContext = React.createContext<FirstNameContextType>([
  '',
  () => { },
])

export const LogoutContext = React.createContext<LogoutContextType>([
  '',
  () => { },
])
export type TokenContextType = [string, (newToken: string) => void]
export type FirstNameContextType = [string, (newFirstName: string) => void]
export type LogoutContextType = [string, (logoutName: string) => void]

const TopLevelStack = createStackNavigator<TLSParamList>()

function App(): React.ReactElement {
  console.disableYellowBox = true
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [token, setToken] = useState('')
  const [firstName, setFirstName] = useState('')
  const [logout, setLogout] = useState('')
  async function loadFontAsync() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
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
    <LogoutContext.Provider value={[logout, setLogout]}>
      <FirstNameContext.Provider value={[firstName, setFirstName]}>
        <TokenContext.Provider value={[token, setToken]}>
          <NavigationContainer
            documentTitle={{
              formatter: (options, route) =>
                `Klemis Kitchen App`,
            }}
          >
            <TopLevelStack.Navigator screenOptions={{ headerShown: false }}>
              <TopLevelStack.Screen name='Login' component={InitialScreen} />
              <TopLevelStack.Screen name='ActualApp' component={MainApp} />
            </TopLevelStack.Navigator>
          </NavigationContainer>
        </TokenContext.Provider>
      </FirstNameContext.Provider>
    </LogoutContext.Provider>
  )
}

export default App
