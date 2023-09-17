import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {
  Button,
  HelperText,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper'
import {LoginProps} from '..'
import {useNavigation} from '@react-navigation/native'
import {useEffect, useState} from 'react'
import {useAuthContext} from '../../../context/auth/context'
import {validateEmail, validatePassword} from '../../../utils/validators'
import GPFormContainer from '../../../components/GPFormContainer/GPFormContainer'
import GPSafeArea from '../../../components/GPSafeArea/GPSafeArea'
import GPHorizontalContainer from '../../../components/GPHorizontalContainer/GPHorizontalContainer'

export default () => {
  const navigation = useNavigation<LoginProps['navigation']>()
  const {service: authService, state: authState} = useAuthContext()

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    acceptTermsConditions: false,
  })
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    const {name, surname, email, password, acceptTermsConditions} = form

    setValid(
      !!name && !!surname && !!email && !!password && acceptTermsConditions,
    )
  }, [form])

  const checkAndCreateAccount = () => {
    const validEmail = validateEmail(form.email)
    const validPassword = validatePassword(form.password)

    setEmailError(!validEmail)
    setPasswordError(!validPassword)

    if (!validEmail || !validPassword) {
      return
    }

    if (authState.loading) {
      return
    }

    const {name, surname, email, password} = form
    authService.register(email, password, {name, surname})
  }

  return (
    <GPSafeArea>
      <GPFormContainer>
        <GPHorizontalContainer>
          <View style={styles.titleContainer}>
            <Text variant="headlineSmall">{t.title}</Text>
          </View>

          <View style={styles.inputsGroup}>
            <View style={styles.inputNoHelperContainer}>
              <Text>{t.inputName}</Text>
              <TextInput
                mode="outlined"
                value={form.name}
                onChangeText={name => {
                  setForm({...form, name})
                }}
              />
            </View>
            <View style={styles.inputNoHelperContainer}>
              <Text>{t.inputSurnmane}</Text>
              <TextInput
                mode="outlined"
                value={form.surname}
                onChangeText={surname => {
                  setForm({...form, surname})
                }}
              />
            </View>
            <View>
              <Text>{t.inputEmail}</Text>
              <TextInput
                mode="outlined"
                keyboardType="email-address"
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
                error={passwordError}
                onChangeText={password => {
                  setForm({...form, password})
                }}
              />
              <HelperText type="error" visible={passwordError}>
                {t.errorPassword}
              </HelperText>
            </View>
          </View>

          <View style={styles.termsAndConditionsContainer}>
            <RadioButton.Android
              value=""
              status={form.acceptTermsConditions ? 'checked' : 'unchecked'}
              onPress={() => {
                setForm({
                  ...form,
                  acceptTermsConditions: !form.acceptTermsConditions,
                })
              }}
            />
            <View style={styles.termsAndConditionsDescription}>
              <Text>{t.tAndC}</Text>
            </View>
          </View>

          <View style={styles.mainButtonContainer}>
            <Button
              mode="contained"
              disabled={!valid}
              loading={authState.loading}
              onPress={() => {
                checkAndCreateAccount()
              }}>
              {t.createAccount}
            </Button>
          </View>

          <View style={styles.altButtonContainer}>
            <Button onPress={() => navigation.navigate('Login')}>
              {t.logIn}
            </Button>
          </View>
        </GPHorizontalContainer>
      </GPFormContainer>
    </GPSafeArea>
  )
}

const styles = StyleSheet.create({
  titleContainer: {alignItems: 'center', paddingTop: 20},
  inputsGroup: {paddingTop: 10},
  inputNoHelperContainer: {paddingBottom: 30},
  termsAndConditionsContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsAndConditionsDescription: {
    marginHorizontal: 10,
    flexShrink: 1,
  },
  mainButtonContainer: {paddingVertical: 10},
  altButtonContainer: {paddingTop: 10, paddingBottom: 30},
})

const t = {
  title: '¡Bienvenido! 👋',
  inputName: 'Nombre',
  inputSurnmane: 'Apellidos',
  inputEmail: 'Email',
  errorEmail: 'El email introducido no es valido',
  inputPassword: 'Contrasena',
  errorPassword: 'La contrasena introducida no es valida',
  tAndC: 'Acepto los Términos y condiciones y la Política de privacidad',
  createAccount: 'Crear cuenta',
  logIn: 'Ya tienes una cuenta? Iniciar sesion',
}
