import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useAuthContext} from '../../../context/auth/context'
import {Button} from 'react-native-paper'
import {ActionKind} from '../../../context/auth/actions'

export default () => {
  const {dispatch} = useAuthContext()
  return (
    <View>
      <Text style={styles.title}>Login</Text>
      <Button
        onPress={() =>
          dispatch({
            type: ActionKind.LOGIN_SUCCESS,
            userName: 'lala',
            token: 'lalaToken',
          })
        }>
        Log in
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
})
