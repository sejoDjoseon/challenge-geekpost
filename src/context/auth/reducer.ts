import {Action, ActionKind} from './actions'

export interface AuthState {
  userId: string | null
  loading: boolean
  errorMessage: string | null
}

export const initialState: AuthState = {
  userId: null,
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
        userId: action.userId,
        loading: false,
      }
    case ActionKind.LOGOUT:
      return {
        ...initialState,
        userId: null,
      }
    case ActionKind.LOGIN_ERROR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }
  }
}
