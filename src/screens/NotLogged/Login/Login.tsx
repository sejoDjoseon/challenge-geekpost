import React, {useEffect, useState} from 'react'
import {Alert, StyleSheet, View} from 'react-native'
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

  useEffect(() => {
    authState.errorMessage && Alert.alert(t.loginError)
  }, [authState])

  return (
    <GPSafeArea>
      <GPFormContainer>
        <GPHorizontalContainer>
          <View style={styles.titleContainer}>
            <Text variant="headlineSmall">{t.title}</Text>
          </View>

          <View style={styles.emailInputContainer}>
            <View>
              <Text>{t.inputEmail}</Text>
              <TextInput
                mode="outlined"
                value={form.email}
                error={emailError}
                onChangeText={email => {
                  setForm({...form, email})
                }}
              />
              <HelperText type="error" visible={emailError}>
                {t.errorEmail}
              </HelperText>
            </View>

            <View>
              <Text>{t.inputPassword}</Text>
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
              {t.logIn}
            </Button>
          </View>

          <View style={styles.alterButtonContainer}>
            <Button onPress={() => navigation.navigate('Register')}>
              {t.register}
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

const t = {
  title: '¡Te echabamos de menos!',
  inputEmail: 'Email',
  errorEmail: 'El email no parece valido',
  inputPassword: 'Contrasena',
  errorPassword: 'La contrasena introducida no es valida',
  loginError: 'Error al iniciar sesión',
  logIn: 'Iniciar sesión',
  register: '¿Todavía no tienes una cuenta? Crear cuenta',
}
