import {useNavigation} from '@react-navigation/native'
import * as React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-paper'
import {CreatePostProps} from '..'
import {useMainContext} from '../../../context/main/context'
import GPHeader from '../../../components/GPHeader/GPHeader'

import {GEEKPOST} from '../../../assets'
import GPAccountIconButton from '../../../components/GPAccountIconButton/GPAccountIconButton'
import GPAddPostIconButton from '../../../components/GPAddPostIconButton/GPAddPostIconButton'

export default () => {
  const navigation = useNavigation<CreatePostProps['navigation']>()
  const {feedService} = useMainContext()

  const getFeed = () => {
    feedService.getFeed().then(feed => {
      console.log(feed)
    })
  }

  return (
    <>
      <GPHeader>
        <View style={{flex: 3}}>
          <Image source={GEEKPOST}></Image>
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <GPAddPostIconButton
            style={{marginRight: 10}}
            onPress={() =>
              navigation.navigate('CreatePost')
            }></GPAddPostIconButton>
          <GPAccountIconButton></GPAccountIconButton>
        </View>
      </GPHeader>
      <View style={{flex: 1}}>
        <Text style={styles.title}>Feed</Text>
        <Button
          mode="contained"
          onPress={() => {
            getFeed()
          }}>
          Get Post
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
})
