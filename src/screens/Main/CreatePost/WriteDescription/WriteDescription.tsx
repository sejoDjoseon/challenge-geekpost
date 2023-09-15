import {useNavigation} from '@react-navigation/native'
import * as React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-paper'
import {FeedProps} from '../..'
import {useCreatePostContext} from '../../../../context/createPost/context'

export default () => {
  const navigation = useNavigation<FeedProps['navigation']>()
  const {imagePath} = useCreatePostContext()
  console.log(imagePath)

  return (
    <View>
      <Text style={styles.title}>Publish</Text>
      <Image
        source={{uri: imagePath}}
        style={{height: 300, width: 'auto', resizeMode: 'center'}}
      />
      <Button
        onPress={() => {
          navigation.navigate('Feed')
        }}>
        Next
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
})
