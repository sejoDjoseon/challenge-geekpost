import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useAuthContext} from '../../../context/auth/context'
import {Button} from 'react-native-paper'

export default () => {
  const {service} = useAuthContext()
  return (
    <View>
      <Text style={styles.title}>Login</Text>
      <Button
        onPress={() => {
          service.register('test@test.com', 'user1234', {
            name: 'lala',
            surname: 'lolo',
          })
        }}>
        Register
      </Button>
      <Button
        onPress={() => {
          service.login('test@test.com', 'user1234')
        }}>
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
