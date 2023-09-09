import React from 'react'
import {AppRegistry} from 'react-native'
import App from './src/App'
import {Theme} from './src/theme/appTheme'
import {name as appName} from './app.json'
import {PaperProvider} from 'react-native-paper'

export default function Main() {
  return (
    <PaperProvider theme={Theme}>
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main)
