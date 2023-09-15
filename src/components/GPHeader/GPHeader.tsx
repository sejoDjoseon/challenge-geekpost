import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import React, {PropsWithChildren} from 'react'
import {View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import GPHeaderBackButton from '../GPHeaderBackButton/GPHeaderBackButton'
import {Button, Text} from 'react-native-paper'

export default ({children}: PropsWithChildren) => {
  const insets = useSafeAreaInsets()
  console.log(insets)
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingHorizontal: 15,
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F0F0F4',
        borderBottomWidth: 1,
        zIndex: 90,
      }}>
      <>{children}</>
    </View>
  )
}
