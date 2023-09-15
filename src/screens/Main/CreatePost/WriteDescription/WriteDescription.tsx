import {useNavigation} from '@react-navigation/native'
import * as React from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {FeedProps} from '../..'
import {useCreatePostContext} from '../../../../context/createPost/context'
import GPFormContainer from '../../../../components/GPFormContainer/GPFormContainer'
import {useRef} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import GPHeaderBackButton from '../../../../components/GPHeaderBackButton/GPHeaderBackButton'
import {Button, Text} from 'react-native-paper'
import Header from '../../../../components/GPHeader/GPHeader'

export default () => {
  const navigation = useNavigation<FeedProps['navigation']>()
  const {imagePath, description} = useCreatePostContext()
  const textInput = useRef<TextInput>(null)
  const {bottom: bottomInset} = useSafeAreaInsets()

  return (
    <>
      <Header>
        <View style={{flex: 4, alignItems: 'flex-start'}}>
          <GPHeaderBackButton
            mode="arrow"
            onPress={() => {
              navigation.goBack()
            }}></GPHeaderBackButton>
        </View>
        <View style={{flex: 7, alignItems: 'center'}}>
          <Text>Crear publicacion</Text>
        </View>
        <View style={{flex: 4, alignItems: 'flex-end'}}>
          <Button
            disabled={!description || description.length === 0}
            onPress={() => {
              navigation.navigate('Feed')
            }}>
            Publicar
          </Button>
        </View>
      </Header>
      <GPFormContainer style={{paddingBottom: bottomInset}}>
        <View
          style={{
            minHeight: 150,
            flexDirection: 'row',
            borderBottomColor: '#F0F0F4',
            borderBottomWidth: 1,
          }}>
          <Image
            source={{uri: imagePath}}
            style={{flex: 3, resizeMode: 'center', margin: 20}}
          />
          <TouchableWithoutFeedback onPress={() => textInput.current?.focus()}>
            <View
              style={{
                flex: 7,
                marginVertical: 15,
                marginRight: 20,
              }}>
              <TextInput
                ref={textInput}
                multiline={true}
                maxLength={1000}
                placeholder="Escribe aqui tu descripcion..."
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </GPFormContainer>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
})
