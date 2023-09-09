import {useNavigation} from '@react-navigation/native'
import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-paper'
import {CreatePostProps} from '..'

export default () => {
  const navigation = useNavigation<CreatePostProps['navigation']>()
  return (
    <View>
      <Text style={styles.title}>Feed</Text>
      <Button onPress={() => navigation.navigate('CreatePost')}>
        Create Post
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
