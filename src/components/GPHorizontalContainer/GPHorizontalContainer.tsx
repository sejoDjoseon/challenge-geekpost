import React, {PropsWithChildren} from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'

interface GPHorizontalContainerProps {
  style?: ViewStyle
}

export default ({
  style,
  children,
}: PropsWithChildren<GPHorizontalContainerProps>) => {
  return <View style={{...styles.container, ...style}}>{children}</View>
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
})
