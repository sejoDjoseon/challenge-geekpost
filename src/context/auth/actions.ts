export enum ActionKind {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_ERROR,
}

export interface RequestLoginAction {
  type: ActionKind.REQUEST_LOGIN
}

export interface LoginSuccessAction {
  type: ActionKind.LOGIN_SUCCESS
  userId: string
  userName: string
}

export interface LogoutAction {
  type: ActionKind.LOGOUT
}

export interface LoginErrorAction {
  type: ActionKind.LOGIN_ERROR
  error: string
}

export type Action =
  | RequestLoginAction
  | LoginSuccessAction
  | LogoutAction
  | LoginErrorAction
