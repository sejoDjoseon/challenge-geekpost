import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native'
import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'
import {WriteDescriptionProps} from '..'
import {launchImageLibrary} from 'react-native-image-picker'
import {useRef} from 'react'
import GPWithCameraPermission, {
  useCameraPermissionContext,
} from '../../../../components/GPWithCameraPermission/GPWithCameraPermission'
import {Camera} from 'react-native-vision-camera'
import {useIsForeground} from '../../../../hooks/useIsForeground'
import GPSafeArea from '../../../../components/GPSafeArea/GPSafeArea'
import GPFormContainer from '../../../../components/GPFormContainer/GPFormContainer'

const TakePhoteScreen = () => {
  const navigation = useNavigation<WriteDescriptionProps['navigation']>()
  const {hasCameraPermission, devices} = useCameraPermissionContext()
  const isAppForeground = useIsForeground()
  const isFocused = useIsFocused()

  const camera = useRef<Camera>(null)

  console.log('lala', hasCameraPermission, devices)

  const openLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      image => {
        console.log(image)
      },
    )
  }

  return (
    <View style={{flex: 1}}>
      {hasCameraPermission && devices.back ? (
        <>
          <Camera
            ref={camera}
            device={devices.back}
            isActive={isAppForeground && isFocused}
            style={{flex: 1}}></Camera>
        </>
      ) : (
        <GPFormContainer>
          <>
            <Text>
              Escoge una foto de tu libreria para crear tu publicacion
            </Text>
            <Button
              mode="contained"
              onPress={() => {
                openLibrary()
              }}>
              Open Library
            </Button>
          </>
        </GPFormContainer>
      )}
    </View>
  )
}

export default ({navigation}: {navigation: NavigationProp<any, any>}) => (
  <GPWithCameraPermission navigation={navigation}>
    <TakePhoteScreen></TakePhoteScreen>
  </GPWithCameraPermission>
)

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
})
