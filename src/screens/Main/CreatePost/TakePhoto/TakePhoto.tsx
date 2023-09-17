import React from 'react'
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native'
import {Alert, Platform, StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'
import {WriteDescriptionProps} from '..'
import {launchImageLibrary} from 'react-native-image-picker'
import {useRef} from 'react'
import GPWithCameraPermission, {
  useCameraPermissionContext,
} from '../../../../components/GPWithCameraPermission/GPWithCameraPermission'
import {Camera, useCameraDevices} from 'react-native-vision-camera'
import {useIsForeground} from '../../../../hooks/useIsForeground'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import GPCameraButton from '../../../../components/GPCameraButton/GPCameraButton'
import GPImagesLibraryIconButton from '../../../../components/GPImagesLibraryIconButton/GPImagesLibraryIconButton'
import {useCreatePostContext} from '../../../../context/createPost/context'
import Header from '../../../../components/GPHeader/GPHeader'
import GPHeaderBackButton from '../../../../components/GPHeaderBackButton/GPHeaderBackButton'
import GPHorizontalContainer from '../../../../components/GPHorizontalContainer/GPHorizontalContainer'

const TakePhoteScreen = () => {
  const navigation = useNavigation<WriteDescriptionProps['navigation']>()
  const {hasCameraPermission} = useCameraPermissionContext()
  const isAppForeground = useIsForeground()
  const isFocused = useIsFocused()
  const devices = useCameraDevices()
  const createPostCtx = useCreatePostContext()

  const insets = useSafeAreaInsets()

  const camera = useRef<Camera>(null)

  const openLibrary = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    })
      .then(res => {
        if (res.didCancel) return
        const assets = res.assets
        if (!assets) {
          console.warn('fail geting asset')
          return
        }
        const uri = assets[0].uri
        if (!uri) {
          console.warn('fail obtaineing uri from asset')
          return
        }
        createPostCtx.setImagePath(uri)
        navigation.navigate('WriteDescription')
      })
      .catch(err => {
        console.warn(err)
        Alert.alert(t.error)
      })
  }

  const takePhoto = () => {
    camera.current
      ?.takePhoto({
        enableAutoStabilization: true,
        qualityPrioritization: 'speed',
      })
      .then(picture => {
        createPostCtx.setImagePath(`file://${picture.path}`)
        navigation.navigate('WriteDescription')
      })
      .catch(err => {
        console.warn(err)
        Alert.alert(t.error)
      })
  }

  if (hasCameraPermission && !devices.back && Platform.OS !== 'ios')
    return <></>

  return (
    <>
      <Header>
        <View style={styles.headerCrossButton}>
          <GPHeaderBackButton
            mode="cross"
            onPress={() => {
              navigation.goBack()
            }}
          />
        </View>
        <View style={styles.headerTitle}>
          <Text>{t.title}</Text>
        </View>
        <View style={styles.headerRight} />
      </Header>
      <View style={styles.flex1}>
        {hasCameraPermission && devices.back ? (
          <View style={[styles.flex1, styles.cameraContainer]}>
            <Camera
              ref={camera}
              device={devices.back}
              photo={true}
              isActive={isAppForeground && isFocused}
              style={styles.flex1}
              orientation={'portrait'}
            />
            <View
              style={[
                styles.cameraButtonsContainer,
                {paddingBottom: insets.bottom + 20},
              ]}>
              <View style={styles.cameraButtonSideContainer} />
              <GPCameraButton
                onPress={() => {
                  takePhoto()
                }}
              />
              <View style={styles.cameraButtonSideContainer}>
                <GPImagesLibraryIconButton
                  onPress={() => {
                    openLibrary()
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <GPHorizontalContainer style={styles.noCameraContainer}>
            <>
              <Text variant="bodyMedium">{t.descriptionNoCamera}</Text>
              <Button
                mode="contained"
                onPress={() => {
                  openLibrary()
                }}>
                {t.openLibrary}
              </Button>
            </>
          </GPHorizontalContainer>
        )}
      </View>
    </>
  )
}

export default ({navigation}: {navigation: NavigationProp<any, any>}) => (
  <GPWithCameraPermission navigation={navigation}>
    <TakePhoteScreen />
  </GPWithCameraPermission>
)

const styles = StyleSheet.create({
  headerCrossButton: {flex: 4, alignItems: 'flex-start'},
  headerTitle: {flex: 7, alignItems: 'center'},
  headerRight: {flex: 4, alignItems: 'flex-end'},
  flex1: {flex: 1},
  cameraContainer: {
    justifyContent: 'space-between',
  },
  cameraButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  cameraButtonSideContainer: {width: 40},
  noCameraContainer: {
    flex: 1,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
})

const t = {
  title: 'Crear publicación',
  descriptionNoCamera:
    'Escoge una foto de tu librería para crear tu publicación',
  openLibrary: 'Escoger foto',
  error: 'Algo salió mal',
}
