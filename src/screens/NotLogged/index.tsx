import React from 'react'
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import Login from './Login/Login'
import Register from './Register/Register'

export type NotLoggedStackParamList = {
  Login: undefined
  Register: undefined
}

export type LoginProps = NativeStackScreenProps<
  NotLoggedStackParamList,
  'Login'
>
export type RegisterProps = NativeStackScreenProps<
  NotLoggedStackParamList,
  'Register'
>

const NotLoggedStack = createNativeStackNavigator<NotLoggedStackParamList>()

export default () => (
  <NotLoggedStack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <NotLoggedStack.Screen name="Login" component={Login} />
    <NotLoggedStack.Screen name="Register" component={Register} />
  </NotLoggedStack.Navigator>
)
