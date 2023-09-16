import {useCallback} from 'react'
import {Platform, PermissionsAndroid} from 'react-native'
import messaging from '@react-native-firebase/messaging'

export const useAndroidNotificationsPermission = () => {
  const chekNotificationsPermission = useCallback(async () => {
    try {
      const permissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
      return permissionStatus === 'granted'
    } catch (error) {
      console.error('Android: chek Notifications Permission error', error)
      return null
    }
  }, [])

  return chekNotificationsPermission
}

export const useIosNotificationsPermission = () => {
  const chekNotificationsPermission = useCallback(async () => {
    try {
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      return enabled
    } catch (error) {
      console.error('IOS: chek Notifications Permission error', error)
      return null
    }
  }, [])

  return chekNotificationsPermission
}

export const useNotificationsPermission = Platform.select({
  android: useAndroidNotificationsPermission,
  ios: useIosNotificationsPermission,
  default: useAndroidNotificationsPermission,
})
