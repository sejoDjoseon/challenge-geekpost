import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useAuthContext} from '../../../context/auth/context'
import {Button, HelperText, TextInput} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import {RegisterProps} from '..'
import GPFormContainer from '../../../components/GPFormContainer/GPFormContainer'
import {validateEmail} from '../../../utils/validators'
import GPSafeArea from '../../../components/GPSafeArea/GPSafeArea'

export default () => {
  const {service: authService, state: authState} = useAuthContext()
  const navigation = useNavigation<RegisterProps['navigation']>()

  const [form, setForm] = useState({email: 'tt@tt.tt', password: '12345678'})
  const [formValid, setFormValid] = useState(false)
  const [emailError, setEmailError] = useState(false)

  useEffect(() => {
    const {email, password} = form

    setFormValid(!!email && !!password)
  }, [form])

  const checkAndLogin = () => {
    const validEmail = validateEmail(form.email)
    setEmailError(!validEmail)

    if (!validEmail) {
      return
    }

    if (authState.loading) {
      return
    }

    const {email, password} = form
    authService.login(email, password)
  }

  return (
    <GPSafeArea>
      <GPFormContainer>
        <View style={{paddingHorizontal: 20}}>
          <View style={{alignItems: 'center', paddingTop: 60}}>
            <Text style={styles.title}>Login</Text>
          </View>

          <View style={{paddingTop: 20, paddingBottom: 20}}>
            <View>
              <Text>Email</Text>
              <TextInput
                mode="outlined"
                value={form.email}
                error={emailError}
                onChangeText={email => {
                  setForm({...form, email})
                }}
              />
              <HelperText type="error" visible={emailError}>
                El email no parece valido
              </HelperText>
            </View>

            <View>
              <Text>Contrasena</Text>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                value={form.password}
                onChangeText={password => {
                  setForm({...form, password})
                }}
              />
            </View>
          </View>

          <View style={{paddingVertical: 20}}>
            <Button
              mode="contained"
              disabled={!formValid}
              loading={authState.loading}
              onPress={() => {
                checkAndLogin()
              }}>
              Iniciar sesion
            </Button>
          </View>

          <View style={{paddingVertical: 10}}>
            <Button onPress={() => navigation.navigate('Register')}>
              Aun no tienes una cuenta? Crear cuenta
            </Button>
          </View>
        </View>
      </GPFormContainer>
    </GPSafeArea>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
})
