import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native'
import {adaptNavigationTheme, useTheme} from 'react-native-paper'
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

export const useAppTheme = () => useTheme<AppTheme>()

export type AppTheme = typeof Theme
