import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native'
import {adaptNavigationTheme} from 'react-native-paper'
import {MD3LightTheme} from 'react-native-paper'

const {LightTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
})

export const Theme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
}

export type AppTheme = typeof Theme
