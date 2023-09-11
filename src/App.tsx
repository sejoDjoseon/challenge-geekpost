import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Theme} from './theme/appTheme'
import NotLogged from './screens/NotLogged'
import {AuthContextProvider, useAuthContext} from './context/auth/context'
import Main from './screens/Main'

const Stack = createNativeStackNavigator()

function AppWithContext() {
  const {state} = useAuthContext()
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!state.userId ? (
          <Stack.Screen name="NotLogged" component={NotLogged} />
        ) : (
          <Stack.Screen name="Main" component={Main} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => (
  <AuthContextProvider>
    <AppWithContext />
  </AuthContextProvider>
)
