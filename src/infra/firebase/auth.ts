import {IAuthInfra} from '../../services/AuthService'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default class AuthFirebase implements IAuthInfra {
  register = (
    email: string,
    password: string,
    {name, surname}: {name: string; surname: string},
  ) => {
    return new Promise<string>((resolve, reject) =>
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => this.addUserColletion(res.user.uid, name, surname))
        .then(id => resolve(id))
        .catch(err => reject(err)),
    )
  }

  login = (email: string, password: string) => {
    return new Promise<string>((resolve, reject) =>
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res.user.uid)
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
