import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Theme} from './theme/appTheme'
import NotLogged from './screens/NotLogged'
import {AuthContextProvider, useAuthContext} from './context/auth/context'
import Main from './screens/Main'
import {StatusBar} from 'react-native'

const Stack = createNativeStackNavigator()

function AppWithContext() {
  const {state} = useAuthContext()
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Theme.colors.background}
      />
      <NavigationContainer theme={Theme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!state.userId ? (
            <Stack.Screen name="NotLogged" component={NotLogged} />
          ) : (
            <Stack.Screen name="Main" component={Main} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default () => (
  <AuthContextProvider>
    <AppWithContext />
  </AuthContextProvider>
)
