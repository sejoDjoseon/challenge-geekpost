import React from 'react'
import {Pressable} from 'react-native'
import Svg, {Path} from 'react-native-svg'
import {useAppTheme} from '../../theme/appTheme'
import {PressableIconProps} from '../../utils/props'

export default (props: PressableIconProps) => {
  const theme = useAppTheme()
  const {svgProps, ...pressableProps} = props
  return (
    <Pressable {...pressableProps}>
      <Svg width={29} height={29} viewBox="0 0 29 29" fill="none" {...svgProps}>
        <Path
          d="M14.5 16.425a4.809 4.809 0 10-.001-9.618 4.809 4.809 0 000 9.618zM22.715 23.926a12.456 12.456 0 01-8.216 3.078 12.456 12.456 0 01-8.215-3.078 9.612 9.612 0 018.215-4.617 9.603 9.603 0 018.216 4.617z"
          fill="#fff"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.284 23.925a9.612 9.612 0 018.215-4.617 9.602 9.602 0 018.216 4.617 12.503 12.503 0 10-16.431 0zm8.215-7.5a4.809 4.809 0 100-9.618 4.809 4.809 0 000 9.618z"
          fill={theme.colors.primary}
        />
        <Path
          d="M14.5 16.425a4.809 4.809 0 10-.001-9.618 4.809 4.809 0 000 9.618zM6.286 23.924a9.618 9.618 0 0116.426 0"
          stroke="#4147D5"
          strokeWidth={2.07143}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.5 27.003a12.502 12.502 0 10.322-25.001 12.502 12.502 0 00-.323 25.002z"
          stroke="#4147D5"
          strokeWidth={2.07143}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  )
}
