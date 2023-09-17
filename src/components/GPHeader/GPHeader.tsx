import React, {PropsWithChildren} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export default ({children}: PropsWithChildren) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <>{children}</>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F0F0F4',
    borderBottomWidth: 1,
    zIndex: 90,
  },
})
