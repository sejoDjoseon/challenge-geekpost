import {useNavigation} from '@react-navigation/native'
import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-paper'
import {WriteDescriptionProps} from '..'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'

export default () => {
  const navigation = useNavigation<WriteDescriptionProps['navigation']>()
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      photo => {
        console.log(photo)
      },
    )
  }

  const openLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      image => {
        console.log(image)
      },
    )
  }

  return (
    <View>
      <Text style={styles.title}>TakePhoto</Text>
      <Button
        onPress={() => {
          openCamera()
        }}>
        Open Camera
      </Button>
      <Button
        onPress={() => {
          openLibrary()
        }}>
        Open Library
      </Button>

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
