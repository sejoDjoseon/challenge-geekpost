import React, {useRef, useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {FeedProps} from '../..'
import {useCreatePostContext} from '../../../../context/createPost/context'
import GPFormContainer from '../../../../components/GPFormContainer/GPFormContainer'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import GPHeaderBackButton from '../../../../components/GPHeaderBackButton/GPHeaderBackButton'
import {Button, Text} from 'react-native-paper'
import Header from '../../../../components/GPHeader/GPHeader'
import {useMainContext} from '../../../../context/main/context'

export default () => {
  const navigation = useNavigation<FeedProps['navigation']>()
  const {imagePath, description, setDescription} = useCreatePostContext()
  const textInput = useRef<TextInput>(null)
  const {bottom: bottomInset} = useSafeAreaInsets()
  const {feedService} = useMainContext()

  const [loading, setLoading] = useState(false)

  const publicar = () => {
    if (!(imagePath && description)) {
      return
    }

    setLoading(true)

    feedService
      .createFeed(imagePath, description)
      .then(() => {
        navigation.navigate('Feed')
      })
      .catch(err => {
        console.warn(err)
        Alert.alert(t.error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Header>
        <View style={styles.headerLeft}>
          <GPHeaderBackButton
            mode="arrow"
            onPress={() => {
              navigation.goBack()
            }}
          />
        </View>
        <View style={styles.headerTitle}>
          <Text>{t.title}</Text>
        </View>
        <View style={styles.headerRight}>
          <Button
            disabled={!description || description.length === 0}
            loading={loading}
            onPress={() => {
              publicar()
            }}>
            {t.publish}
          </Button>
        </View>
      </Header>
      <GPFormContainer style={{paddingBottom: bottomInset}}>
        <View style={styles.container}>
          <Image source={{uri: imagePath}} style={styles.image} />
          <TouchableWithoutFeedback onPress={() => textInput.current?.focus()}>
            <View style={styles.textAreaContainer}>
              <TextInput
                ref={textInput}
                multiline
                maxLength={1000}
                placeholder={t.descriptionPlaceholder}
                value={description}
                onChangeText={text => setDescription(text)}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </GPFormContainer>
    </>
  )
}

const styles = StyleSheet.create({
  headerLeft: {flex: 4, alignItems: 'flex-start'},
  headerTitle: {flex: 7, alignItems: 'center'},
  headerRight: {flex: 4, alignItems: 'flex-end'},
  container: {
    minHeight: 150,
    flexDirection: 'row',
    borderBottomColor: '#F0F0F4',
    borderBottomWidth: 1,
  },
  textAreaContainer: {
    flex: 7,
    marginVertical: 15,
    marginRight: 20,
  },
  image: {flex: 3, resizeMode: 'contain', margin: 20},
})

const t = {
  title: 'Crear publicación',
  publish: 'Publicar',
  openLibrary: 'Escoger foto',
  error: 'Algo salió mal',
  descriptionPlaceholder: 'Escribe aqui tu descripcion...',
}
