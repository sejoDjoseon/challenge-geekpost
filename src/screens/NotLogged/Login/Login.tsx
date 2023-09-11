import * as React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {useAuthContext} from '../../../context/auth/context'
import {Button, TextInput} from 'react-native-paper'
import GPSafeArea from '../../../components/GPSafeArea/GPSafeArea'
import {useNavigation} from '@react-navigation/native'
import {RegisterProps} from '..'

export default () => {
  const {service} = useAuthContext()
  const navigation = useNavigation<RegisterProps['navigation']>()
  return (
    <GPSafeArea>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{paddingHorizontal: 20}}>
          <View style={{alignItems: 'center', paddingTop: 60}}>
            <Text style={styles.title}>Login</Text>
          </View>

          <View style={{paddingTop: 20, paddingBottom: 20}}>
            <View style={{paddingVertical: 10}}>
              <Text>Email</Text>
              <TextInput mode="outlined" />
            </View>

            <View style={{paddingVertical: 10}}>
              <Text>Contrasena</Text>
              <TextInput mode="outlined" secureTextEntry={true} />
            </View>
          </View>

          <View style={{paddingVertical: 10}}>
            <Button mode="contained">Iniciar sesion</Button>
          </View>

          <View style={{paddingVertical: 10}}>
            <Button onPress={() => navigation.navigate('Register')}>
              Aun no tienes una cuenta? Crear cuenta
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* <Button
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
      </Button> */}
    </GPSafeArea>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
})
