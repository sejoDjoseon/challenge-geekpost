import * as React from 'react'
import Svg, {G, Circle, Path, Defs} from 'react-native-svg'
import {Pressable} from 'react-native'

import {PressableIconProps} from '../../utils/props'

interface HeaderBackButtonProps extends PressableIconProps {
  mode: 'cross' | 'arrow'
}

export default (props: HeaderBackButtonProps) => {
  const {mode, svgProps, ...pressableProps} = props
  return (
    <Pressable {...pressableProps}>
      {mode === 'cross' ? (
        <Svg
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
          {...svgProps}>
          <G filter="url(#filter0_b_1014_7574)">
            <Circle cx={14} cy={14} r={14} fill="#F9F9FC" />
          </G>
          <Path transform="translate(6 6)" fill="#F9F9FC" d="M0 0H16V16H0z" />
          <Path transform="translate(6 6)" fill="#F9F9FC" d="M0 0H16V16H0z" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.251 8.251a.857.857 0 011.212 0L14 12.788l4.537-4.537a.857.857 0 111.212 1.212L15.212 14l4.537 4.537a.857.857 0 11-1.212 1.212L14 15.212 9.463 19.75a.857.857 0 11-1.212-1.212L12.788 14 8.25 9.463a.857.857 0 010-1.212z"
            fill="#000"
          />
          <Defs />
        </Svg>
      ) : (
        <Svg
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
          {...svgProps}>
          <G filter="url(#filter0_b_1014_7725)">
            <Circle cx={14} cy={14} r={14} fill="#F9F9FC" />
          </G>
          <Path transform="translate(6 6)" fill="#F9F9FC" d="M0 0H16V16H0z" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.78 7.97a.75.75 0 00-1.06 0l-5.324 5.323a1 1 0 000 1.414l5.324 5.323a.75.75 0 001.06-1.06L11.81 14l4.97-4.97a.75.75 0 000-1.06z"
            fill="#000"
          />
          <Defs />
        </Svg>
      )}
    </Pressable>
  )
}
