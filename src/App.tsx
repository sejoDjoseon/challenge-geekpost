import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './screens/Login/Login'
import Register from './screens/Register/Register'
import {Theme} from './theme/appTheme'

const Stack = createNativeStackNavigator()

export default () => (
  <NavigationContainer theme={Theme}>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Resgister" component={Register} />
    </Stack.Navigator>
  </NavigationContainer>
)
