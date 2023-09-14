import {useNavigation} from '@react-navigation/native'
import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-paper'
import {WriteDescriptionProps} from '..'

export default () => {
  const navigation = useNavigation<WriteDescriptionProps['navigation']>()

  return (
    <View>
      <Text style={styles.title}>TakePhoto</Text>
      <Button
        onPress={() => {
          navigation.navigate('WriteDescription')
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
