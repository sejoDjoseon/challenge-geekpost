import * as React from 'react'
import {NavigationProp} from '@react-navigation/core'
import {ReactNode, createContext, useContext, useEffect, useState} from 'react'
import {
  Camera,
  CameraDevices,
  useCameraDevices,
} from 'react-native-vision-camera'
import {Alert, AlertButton, Linking, Platform} from 'react-native'

export interface ICameraDevicesContext {
  hasCameraPermission: boolean
  checked: boolean
}

const CameraPermissionContext = createContext<ICameraDevicesContext>(
  {} as ICameraDevicesContext,
)

export function useCameraPermissionContext() {
  return useContext(CameraPermissionContext)
}

interface GPWithCameraPermissionProps {
  navigation: NavigationProp<any, any>
  children: ReactNode
}

export default ({navigation, children}: GPWithCameraPermissionProps) => {
  const [canRender, setCanRender] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    new Promise<void>((resolve, reject) => {
      Camera.getCameraPermissionStatus()
        .then(result => {
          if (
            result === 'not-determined' ||
            (result === 'denied' && Platform.OS === 'android')
          )
            return Camera.requestCameraPermission()
          if (result === 'denied' || result === 'restricted') reject(result)
          return 'granted'
        })
        .then(res => {
          if (res === 'granted') resolve()
          reject(res)
        })
    })
      .then(() => {
        setHasPermission(true)
        setCanRender(true)
      })
      .catch(err => {
        console.warn(err)
        const linkToSettings: AlertButton = {
          text: 'Settings',
          onPress: () =>
            Linking.openSettings().then(() => {
              navigation.goBack()
            }),
          isPreferred: true,
          style: 'default',
        }

        const cancel: AlertButton = {
          text: 'Cancel',
          onPress: () => {
            setHasPermission(false)
            setCanRender(true)
          },
          isPreferred: false,
          style: 'cancel',
        }
        Alert.alert(
          'Camera not available',
          'Try to grant permission in device settings, or cancel and continue with a picture from your library',
          [linkToSettings, cancel],
        )
      })
  }, [])
  return (
    <CameraPermissionContext.Provider
      value={{hasCameraPermission: hasPermission, checked: canRender}}>
      {canRender && children}
    </CameraPermissionContext.Provider>
  )
}
