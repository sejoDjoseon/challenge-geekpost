import {IFeedInfra} from '../../services/FeedService'
import {FeedPost} from '../../models/feedPost'
import firestore from '@react-native-firebase/firestore'

export default class PublicationsInfra implements IFeedInfra {
  #publicationsCol = firestore().collection('publications')

  getFeed = (cursor?: any) => {
    const query = cursor
      ? this.#publicationsCol
          .orderBy('create_date', 'desc')
          .startAfter(cursor)
          .limit(5)
          .get()
      : this.#publicationsCol.orderBy('create_date', 'desc').limit(5).get()
    return new Promise<{feed: FeedPost[]; cursor: any}>((resolve, reject) => {
      query
        .then(docData => {
          if (docData.docs.length === 0) resolve({feed: [], cursor: null})
          const result = docData.docs.map(val => {
            const data = val.data()
            return {
              id: val.id,
              userName: data.user_name,
              imgUrl: data.img_url,
              description: data.description,
              date: new Date(data.create_date.toDate()),
            }
          })
          resolve({
            feed: result,
            cursor: docData.docs[docData.docs.length - 1].data().create_date,
          })
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
