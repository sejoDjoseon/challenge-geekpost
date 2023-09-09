import * as React from 'react'
import {StyleSheet, Text} from 'react-native'

export default () => {
  return <Text style={styles.title}>Login</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
})
