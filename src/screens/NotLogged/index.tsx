import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './Login/Login'
import Register from './Register/Register'

const NotLoggedStack = createNativeStackNavigator()

export default () => (
  <NotLoggedStack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <NotLoggedStack.Screen name="Login" component={Login} />
    <NotLoggedStack.Screen name="Resgister" component={Register} />
  </NotLoggedStack.Navigator>
)
