import React from 'react'
import {Pressable} from 'react-native'
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg'
import {useAppTheme} from '../../theme/appTheme'
import {PressableIconProps} from '../../utils/props'

export default (props: PressableIconProps) => {
  const theme = useAppTheme()
  const {svgProps, ...pressableProps} = props
  return (
    <Pressable {...pressableProps}>
      <Svg width={29} height={29} viewBox="0 0 29 29" fill="none" {...svgProps}>
        <G clipPath="url(#clip0_1014_7438)">
          <Path
            d="M21.232 1.997H7.768a5.771 5.771 0 00-5.771 5.77v13.465a5.771 5.771 0 005.77 5.77h13.465a5.771 5.771 0 005.77-5.77V7.768a5.77 5.77 0 00-5.77-5.771z"
            fill={'#D7E0FF'}
          />
          <Path
            d="M14.5 8.729v11.54M8.729 14.5h11.54M21.232 1.997H7.768a5.771 5.771 0 00-5.771 5.77v13.465a5.771 5.771 0 005.77 5.77h13.465a5.771 5.771 0 005.77-5.77V7.768a5.77 5.77 0 00-5.77-5.771z"
            stroke={theme.colors.primary}
            strokeWidth={2.07143}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_1014_7438">
            <Path fill="#fff" d="M0 0H29V29H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </Pressable>
  )
}
