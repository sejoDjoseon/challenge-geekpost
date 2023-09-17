import React from 'react'
import {FeedPost} from '../../models/feedPost'
import {Image, StyleSheet} from 'react-native'
import {Text} from 'react-native-paper'

interface GPPostCardProps {
  feedPost: FeedPost
}

export default ({feedPost}: GPPostCardProps) => {
  return (
    <>
      <Text style={styles.title} variant="titleMedium">
        {feedPost.userName}
      </Text>
      <Image source={{uri: feedPost.imgUrl}} style={styles.image} />
      <Text style={styles.description} variant="bodyMedium">
        {feedPost.description}
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  title: {margin: 20, marginBottom: 10},
  image: {width: '100%', height: 300, resizeMode: 'cover'},
  description: {margin: 20, marginTop: 10},
})
