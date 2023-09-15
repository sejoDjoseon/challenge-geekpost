import React, {PropsWithChildren, useState} from 'react'
import GPSafeArea from '../GPSafeArea/GPSafeArea'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {
  Dimensions,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'

const {height} = Dimensions.get('window')

export interface GPFormContainerProps {
  style?: ViewStyle
}

export default ({children, style}: PropsWithChildren<GPFormContainerProps>) => {
  const [scrollEnabled, setScrollEnabled] = useState(false)

  const onContentSizeChange = (
    _contentWidth: number,
    contentHeight: number,
  ) => {
    setScrollEnabled(contentHeight > height)
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      scrollEnabled={scrollEnabled}
      extraScrollHeight={Platform.OS === 'android' ? 200 : 0}
      onContentSizeChange={onContentSizeChange}
      style={style}>
      <TouchableWithoutFeedback
        style={{paddingBottom: scrollEnabled ? 500 : 0}}
        onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}
