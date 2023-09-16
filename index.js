import React from 'react'
import {AppRegistry} from 'react-native'
import App from './src/App'
import {Theme} from './src/theme/appTheme'
import {name as appName} from './app.json'
import {PaperProvider} from 'react-native-paper'
import messaging from '@react-native-firebase/messaging'

export default function Main() {
  return (
    <PaperProvider theme={Theme}>
      <App />
    </PaperProvider>
  )
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage)
})

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null
  }

  return <Main />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
