import React, {useEffect} from 'react'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import Feed from './Feed/Feed'
import CreatePost from './CreatePost'
import {MainContextProvider} from '../../context/main/context'
import {useNotificationsPermission} from '../../hooks/useNotificationPermission'

export type MainStackParamList = {
  Feed: undefined
  CreatePost: undefined
}

export type CreatePostProps = NativeStackScreenProps<
  MainStackParamList,
  'CreatePost'
>
export type FeedProps = NativeStackScreenProps<MainStackParamList, 'Feed'>

const MainStack = createNativeStackNavigator<MainStackParamList>()

export default () => {
  const checkNotification = useNotificationsPermission()

  useEffect(() => {
    checkNotification().then(granted => {
      console.log(granted)
    })
  }, [])

  return (
    <MainContextProvider>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Feed" component={Feed} />
        <MainStack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{presentation: 'modal'}}
        />
      </MainStack.Navigator>
    </MainContextProvider>
  )
}
