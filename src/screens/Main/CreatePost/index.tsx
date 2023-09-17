import React from 'react'
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import TakePhoto from './TakePhoto/TakePhoto'
import WriteDescription from './WriteDescription/WriteDescription'
import {CreatePostContextProvider} from '../../../context/createPost/context'
import {useTheme} from 'react-native-paper'

export type CreatePostParamList = {
  TakePhoto: undefined
  WriteDescription: undefined
}

export type WriteDescriptionProps = NativeStackScreenProps<
  CreatePostParamList,
  'WriteDescription'
>

const CreatePostStack = createNativeStackNavigator<CreatePostParamList>()

export default () => {
  const {colors} = useTheme()
  return (
    <CreatePostContextProvider>
      <CreatePostStack.Navigator screenOptions={{headerShown: false}}>
        <CreatePostStack.Screen
          name="TakePhoto"
          component={TakePhoto}
          options={{navigationBarColor: 'black'}}
        />
        <CreatePostStack.Screen
          name="WriteDescription"
          component={WriteDescription}
          options={{navigationBarColor: colors.background}}
        />
      </CreatePostStack.Navigator>
    </CreatePostContextProvider>
  )
}
