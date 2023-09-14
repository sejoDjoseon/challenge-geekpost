import {IFeedInfra} from '../../services/FeedService'
import {FeedPost} from '../../models/feedPost'
import firestore from '@react-native-firebase/firestore'

export default class PublicationsInfra implements IFeedInfra {
  #publicationsCol = firestore().collection('publications')

  getFeed = () => {
    return new Promise<FeedPost[]>((resolve, reject) => {
      this.#publicationsCol
        // .limit(5)
        .get()
        .then(docData => {
          const result = docData.docs.map(val => {
            const data = val.data()
            console.log(data['user'])
            return {
              id: val.id,
              userName: 'lala',
              imgUrl: data.img_url,
              description: data.description,
              date: new Date(),
            }
          })
          resolve(result)
        })
        .catch(err => reject(err))
    })
  }

  createPublication = (
    imgUrl: string,
    description: string,
    userName: string,
  ) => {
    return new Promise<void>((resolve, reject) => {
      this.#publicationsCol
        .add({
          create_date: new Date(),
          img_url: imgUrl,
          description,
          user_name: userName,
        })
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
