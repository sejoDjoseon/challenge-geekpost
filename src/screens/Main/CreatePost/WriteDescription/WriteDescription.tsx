import {useNavigation} from '@react-navigation/native'
import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-paper'
import {FeedProps} from '../..'

export default () => {
  const navigation = useNavigation<FeedProps['navigation']>()
  return (
    <View>
      <Text style={styles.title}>Publish</Text>
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
