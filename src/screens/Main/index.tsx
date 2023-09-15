import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import Feed from './Feed/Feed'
import CreatePost from './CreatePost'
import {MainContextProvider} from '../../context/main/context'

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

export default () => (
  <MainContextProvider>
    <MainStack.Navigator>
      <MainStack.Screen name="Feed" component={Feed} />
      <MainStack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{presentation: 'modal'}}
      />
    </MainStack.Navigator>
  </MainContextProvider>
)
