import React from 'react'
import {FeedPost} from '../../models/feedPost'
import {Image, View} from 'react-native'
import {Text} from 'react-native-paper'

interface GPPostCardProps {
  feedPost: FeedPost
}

export default ({feedPost}: GPPostCardProps) => {
  return (
    <>
      <Text style={{margin: 20, marginBottom: 10}} variant="titleMedium">
        {feedPost.userName}
      </Text>
      <Image
        source={{uri: feedPost.imgUrl}}
        style={{width: '100%', height: 300, resizeMode: 'cover'}}></Image>
      <Text style={{margin: 20, marginTop: 10}} variant="bodyMedium">
        {feedPost.description}
      </Text>
    </>
  )
}
