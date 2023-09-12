import React, {PropsWithChildren, useState} from 'react'
import GPSafeArea from '../GPSafeArea/GPSafeArea'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Dimensions, Keyboard, TouchableWithoutFeedback} from 'react-native'

const {height} = Dimensions.get('window')

export default ({children}: PropsWithChildren) => {
  const [scrollEnabled, setScrollEnabled] = useState(false)

  const onContentSizeChange = (
    _contentWidth: number,
    contentHeight: number,
  ) => {
    setScrollEnabled(contentHeight > height)
  }

  return (
    <GPSafeArea>
      <KeyboardAwareScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {children}
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </GPSafeArea>
  )
}
