import {ActionKind} from '../context/auth/actions'
import {IAuthStore} from '../context/auth/context'

export interface IAuthInfra {
  register: (
    email: string,
    password: string,
    userData: {name: string; surname: string},
  ) => Promise<{id: string; userName: string}>
  login: (
    email: string,
    password: string,
  ) => Promise<{id: string; userName: string}>
}

export interface IAuthService {
  register: (
    email: string,
    password: string,
    userData: {name: string; surname: string},
  ) => void
  login: (email: string, password: string) => void
}

export default class AuthService implements IAuthService {
  constructor(private authInfra: IAuthInfra, private authStore: IAuthStore) {}

  register(
    email: string,
    password: string,
    userData: {name: string; surname: string},
  ) {
    this.authStore.dispatch({type: ActionKind.REQUEST_LOGIN})
    this.authInfra
      .register(email, password, userData)
      .then(({id, userName}) => {
        this.authStore.dispatch({
          type: ActionKind.LOGIN_SUCCESS,
          userId: id,
          userName,
        })
      })
      .catch(err => {
        console.error(err)
        this.authStore.dispatch({
          type: ActionKind.LOGIN_ERROR,
          error: err,
        })
      })
  }

  login(email: string, password: string) {
    this.authStore.dispatch({type: ActionKind.REQUEST_LOGIN})
    this.authInfra
      .login(email, password)
      .then(({id, userName}) => {
        this.authStore.dispatch({
          type: ActionKind.LOGIN_SUCCESS,
          userId: id,
          userName,
        })
      })
      .catch(err => {
        console.error(err)
        this.authStore.dispatch({
          type: ActionKind.LOGIN_ERROR,
          error: err,
        })
      })
  }
}
