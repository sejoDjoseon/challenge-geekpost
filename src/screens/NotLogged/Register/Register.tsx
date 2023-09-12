import * as React from 'react'
import {View} from 'react-native'
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
    <GPFormContainer>
      <View style={{paddingHorizontal: 20}}>
        <View style={{alignItems: 'center', paddingTop: 20}}>
          <Text variant="headlineLarge">Register</Text>
        </View>

        <View style={{paddingTop: 10}}>
          <View style={{paddingBottom: 30}}>
            <Text>Nombre</Text>
            <TextInput
              mode="outlined"
              value={form.name}
              onChangeText={name => {
                setForm({...form, name})
              }}
            />
          </View>
          <View style={{paddingBottom: 30}}>
            <Text>Apellidos</Text>
            <TextInput
              mode="outlined"
              value={form.surname}
              onChangeText={surname => {
                setForm({...form, surname})
              }}
            />
          </View>
          <View>
            <Text>Email</Text>
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
              El email introducido no es valido
            </HelperText>
          </View>

          <View>
            <Text>Contrasena</Text>
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
              La contrasena introducida no es valida
            </HelperText>
          </View>
        </View>

        <View
          style={{
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
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
          <View
            style={{
              marginHorizontal: 10,
              flexShrink: 1,
            }}>
            <Text>
              Acepto los Términos y condiciones y la Política de privacidad
            </Text>
          </View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Button
            mode="contained"
            disabled={!valid}
            loading={authState.loading}
            onPress={() => {
              checkAndCreateAccount()
            }}>
            Crear cuenta
          </Button>
        </View>

        <View style={{paddingTop: 10, paddingBottom: 30}}>
          <Button onPress={() => navigation.navigate('Login')}>
            Ya tienes una cuenta? Iniciar sesion
          </Button>
        </View>
      </View>
    </GPFormContainer>
  )
}
