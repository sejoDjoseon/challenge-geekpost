import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {useAuthContext} from '../../../context/auth/context'
import {Button, HelperText, Text, TextInput} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import {RegisterProps} from '..'
import GPFormContainer from '../../../components/GPFormContainer/GPFormContainer'
import {validateEmail} from '../../../utils/validators'
import GPSafeArea from '../../../components/GPSafeArea/GPSafeArea'
import GPHorizontalContainer from '../../../components/GPHorizontalContainer/GPHorizontalContainer'

export default () => {
  const {service: authService, state: authState} = useAuthContext()
  const navigation = useNavigation<RegisterProps['navigation']>()

  const [form, setForm] = useState({email: '', password: ''})
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
        <GPHorizontalContainer>
          <View style={styles.titleContainer}>
            <Text variant="headlineLarge">Login</Text>
          </View>

          <View style={styles.emailInputContainer}>
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

          <View style={styles.mainButtonContainer}>
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

          <View style={styles.alterButtonContainer}>
            <Button onPress={() => navigation.navigate('Register')}>
              Aun no tienes una cuenta? Crear cuenta
            </Button>
          </View>
        </GPHorizontalContainer>
      </GPFormContainer>
    </GPSafeArea>
  )
}

const styles = StyleSheet.create({
  titleContainer: {alignItems: 'center', paddingTop: 60},
  emailInputContainer: {paddingTop: 20, paddingBottom: 20},
  mainButtonContainer: {paddingVertical: 20},
  alterButtonContainer: {paddingVertical: 20},
})
