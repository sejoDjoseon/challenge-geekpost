import {Action, ActionKind} from './actions'

export interface AuthState {
  userName: string
  token: string | null
  loading: boolean
  errorMessage: string | null
}

export const initialState: AuthState = {
  userName: '',
  token: null,
  loading: false,
  errorMessage: null,
}

export const authReducer = (
  initialState: AuthState,
  action: Action,
): AuthState => {
  switch (action.type) {
    case ActionKind.REQUEST_LOGIN:
      return {
        ...initialState,
        loading: true,
      }
    case ActionKind.LOGIN_SUCCESS:
      return {
        ...initialState,
        userName: action.userName,
        token: action.token,
        loading: false,
      }
    case ActionKind.LOGOUT:
      return {
        ...initialState,
        userName: '',
        token: null,
      }

    case ActionKind.LOGIN_ERROR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }
  }
}
