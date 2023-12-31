import React, {useEffect} from 'react'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import Feed from './Feed/Feed'
import CreatePost from './CreatePost'
import {MainContextProvider} from '../../context/main/context'
import {useNotificationsPermission} from '../../hooks/useNotificationPermission'
import messaging from '@react-native-firebase/messaging'
import {useTheme} from 'react-native-paper'

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
  const {colors} = useTheme()
  const checkNotification = useNotificationsPermission()

  useEffect(() => {
    checkNotification().then(granted => {
      granted &&
        messaging()
          .subscribeToTopic('all')
          .then(() => console.info('Subscribed to topic!'))
    })
  }, [checkNotification])

  return (
    <MainContextProvider>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen
          name="Feed"
          component={Feed}
          options={{navigationBarColor: colors.background}}
        />
        <MainStack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{presentation: 'modal'}}
        />
      </MainStack.Navigator>
    </MainContextProvider>
  )
}
