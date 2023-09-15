import React from 'react'
import {Pressable, PressableProps} from 'react-native'

import Svg, {Circle, SvgProps} from 'react-native-svg'
import {useAppTheme} from '../../theme/appTheme'

interface IGPCameraButton extends PressableProps {
  svgProps?: SvgProps
}

export default (props: IGPCameraButton) => {
  const theme = useAppTheme()
  const {svgProps, ...pressableProps} = props
  return (
    <Pressable {...pressableProps}>
      <Svg width={72} height={72} fill="none" {...svgProps}>
        <Circle cx={36} cy={36} r={36} fill={theme.colors.primary} />
        <Circle cx={36} cy={36} r={29} stroke="#fff" strokeWidth={2} />
      </Svg>
    </Pressable>
  )
}
