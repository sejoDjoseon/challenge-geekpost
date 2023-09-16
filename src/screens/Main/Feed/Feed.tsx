import {useIsFocused, useNavigation} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {FlatList, Image, StyleSheet, View} from 'react-native'
import {CreatePostProps} from '..'
import {useMainContext} from '../../../context/main/context'
import GPHeader from '../../../components/GPHeader/GPHeader'

import {GEEKPOST} from '../../../assets'
import GPAccountIconButton from '../../../components/GPAccountIconButton/GPAccountIconButton'
import GPAddPostIconButton from '../../../components/GPAddPostIconButton/GPAddPostIconButton'
import {FeedPost} from '../../../models/feedPost'
import GPPostCard from '../../../components/GPPostCard/GPPostCard'

export default () => {
  const navigation = useNavigation<CreatePostProps['navigation']>()
  const {feedService} = useMainContext()
  const [feed, setFeed] = useState<FeedPost[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const isFocused = useIsFocused()

  useEffect(() => {
    isFocused && getFeed()
  }, [isFocused])

  const getFeed = () => {
    setRefreshing(true)
    feedService.getFeed().then(feedRes => {
      setFeed(feedRes)
      setRefreshing(false)
    })
  }

  const getMoreFeed = () => {
    setRefreshing(true)
    feedService.getMoreFeed().then(moreFeed => {
      setFeed([...feed, ...moreFeed])
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
      <FlatList
        data={feed}
        renderItem={item => <GPPostCard feedPost={item.item} />}
        keyExtractor={item => item.id}
        onEndReached={() => getMoreFeed()}
        onEndReachedThreshold={0}
        refreshing={refreshing}
      />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
})
