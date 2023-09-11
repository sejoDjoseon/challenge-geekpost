import React from 'react'
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import TakePhoto from './TakePhoto/TakePhoto'
import WriteDescription from './WriteDescription/WriteDescription'

export type CreatePostParamList = {
  TakePhoto: undefined
  WriteDescription: undefined
}

export type WriteDescriptionProps = NativeStackScreenProps<
  CreatePostParamList,
  'WriteDescription'
>

const CreatePostStack = createNativeStackNavigator<CreatePostParamList>()

export default () => (
  <CreatePostStack.Navigator screenOptions={{headerShown: false}}>
    <CreatePostStack.Screen name="TakePhoto" component={TakePhoto} />
    <CreatePostStack.Screen
      name="WriteDescription"
      component={WriteDescription}
    />
  </CreatePostStack.Navigator>
)