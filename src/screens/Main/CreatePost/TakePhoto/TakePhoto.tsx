import React from 'react'
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native'
import {StyleSheet, View} from 'react-native'
import {Button, IconButton, Text} from 'react-native-paper'
import {WriteDescriptionProps} from '..'
import {launchImageLibrary} from 'react-native-image-picker'
import {useRef} from 'react'
import GPWithCameraPermission, {
  useCameraPermissionContext,
} from '../../../../components/GPWithCameraPermission/GPWithCameraPermission'
import {Camera, useCameraDevices} from 'react-native-vision-camera'
import {useIsForeground} from '../../../../hooks/useIsForeground'
import GPFormContainer from '../../../../components/GPFormContainer/GPFormContainer'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import GPCameraButton from '../../../../components/GPCameraButton/GPCameraButton'
import {useAppTheme} from '../../../../theme/appTheme'
import GPImagesLibraryIconButton from '../../../../components/GPImagesLibraryIconButton/GPImagesLibraryIconButton'

const TakePhoteScreen = () => {
  const navigation = useNavigation<WriteDescriptionProps['navigation']>()
  const {hasCameraPermission, checked} = useCameraPermissionContext()
  const isAppForeground = useIsForeground()
  const isFocused = useIsFocused()
  const devices = useCameraDevices()

  const insets = useSafeAreaInsets()

  const camera = useRef<Camera>(null)

  const openLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      image => {
        console.log(image)
        if (image.didCancel) return
        navigation.navigate('WriteDescription')
      },
    )
  }

  const takePhoto = () => {
    camera.current
      ?.takePhoto({
        enableAutoStabilization: true,
        qualityPrioritization: 'balanced',
      })
      .then(picture => {
        console.log(picture)
        navigation.navigate('WriteDescription')
      })
      .catch(err => {
        console.warn(err)
      })
  }

  if (hasCameraPermission && !devices.back) return <></>

  return (
    <View style={{flex: 1}}>
      {hasCameraPermission && devices.back ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Camera
            ref={camera}
            device={devices.back}
            photo={true}
            isActive={isAppForeground && isFocused}
            style={{height: '100%'}}></Camera>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 20,
              paddingBottom: insets.bottom + 20,
              backgroundColor: 'black',
              paddingHorizontal: 20,
            }}>
            <View style={{width: 40}}></View>
            <GPCameraButton
              onPress={() => {
                takePhoto()
              }}
            />
            <View style={{width: 40}}>
              <GPImagesLibraryIconButton
                onPress={() => {
                  openLibrary()
                }}></GPImagesLibraryIconButton>
            </View>
          </View>
        </View>
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
