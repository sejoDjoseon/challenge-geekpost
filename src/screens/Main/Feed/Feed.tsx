import {useIsFocused, useNavigation} from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from 'react'
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

  const getFeed = useCallback(() => {
    setRefreshing(true)
    feedService.getFeed().then(feedRes => {
      setFeed(feedRes)
      setRefreshing(false)
    })
  }, [feedService])

  const getMoreFeed = () => {
    setRefreshing(true)
    feedService.getMoreFeed().then(moreFeed => {
      setFeed([...feed, ...moreFeed])
    })
  }

  useEffect(() => {
    isFocused && getFeed()
  }, [getFeed, isFocused])

  return (
    <>
      <GPHeader>
        <View style={styles.headerIcon}>
          <Image source={GEEKPOST} />
        </View>
        <View style={styles.headerRightIcons}>
          <GPAddPostIconButton
            style={styles.headerPostIcon}
            onPress={() => navigation.navigate('CreatePost')}
          />
          <GPAccountIconButton />
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
  headerIcon: {flex: 3},
  headerRightIcons: {flex: 1, flexDirection: 'row', justifyContent: 'flex-end'},
  headerPostIcon: {marginRight: 10},
})
