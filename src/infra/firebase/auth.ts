import {IAuthInfra} from '../../services/AuthService'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default class AuthFirebase implements IAuthInfra {
  #userCol = firestore().collection('users')

  register = (
    email: string,
    password: string,
    {name, surname}: {name: string; surname: string},
  ) => {
    return new Promise<{id: string; userName: string}>((resolve, reject) =>
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => this.addUserColletion(res.user.uid, name, surname))
        .then(id => resolve({id, userName: name}))
        .catch(err => reject(err)),
    )
  }

  login = (email: string, password: string) => {
    return new Promise<{id: string; userName: string}>((resolve, reject) =>
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res =>
          this.#userCol
            .where('user_id', '==', res.user.uid)
            .get({source: 'server'}),
        )
        .then(docData => {
          const data = docData.docs[0].data()
          resolve({userName: data.name, id: data.user_id})
        })
        .catch(err => reject(err)),
    )
  }

  private addUserColletion(
    id: string,
    name: string,
    surname: string,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      firestore()
        .collection('users')
        .add({
          user_id: id,
          name,
          surname,
        })
        .then(() => {
          resolve(id)
        })
        .catch(error => reject(error))
    })
  }
}
