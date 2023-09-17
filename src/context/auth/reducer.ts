import {Action, ActionKind} from './actions'

export interface AuthState {
  userId: string | null
  userName: string | null
  loading: boolean
  errorMessage: string | null
}

export const initialState: AuthState = {
  userId: null,
  loading: false,
  errorMessage: null,
  userName: null,
}

export const authReducer = (
  initState: AuthState,
  action: Action,
): AuthState => {
  switch (action.type) {
    case ActionKind.REQUEST_LOGIN:
      return {
        ...initState,
        loading: true,
        errorMessage: null,
      }
    case ActionKind.LOGIN_SUCCESS:
      return {
        ...initState,
        userId: action.userId,
        userName: action.userName,
        loading: false,
      }
    case ActionKind.LOGOUT:
      return {
        ...initState,
        userId: null,
      }
    case ActionKind.LOGIN_ERROR:
      return {
        ...initState,
        loading: false,
        errorMessage: action.error,
      }
  }
}
