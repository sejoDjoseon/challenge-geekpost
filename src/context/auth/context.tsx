import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useRef,
} from 'react'
import {AuthState, authReducer, initialState} from './reducer'
import {Action} from './actions'
import AuthService, {IAuthService} from '../../services/AuthService'
import AuthFirebase from '../../infra/firebase/auth'

export interface IAuthStore {
  state: AuthState
  dispatch: React.Dispatch<Action>
}

export interface IAuthContext extends IAuthStore {
  service: IAuthService
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export function AuthContextProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const _authService = useRef<IAuthService>(
    new AuthService(new AuthFirebase(), {state, dispatch}),
  )

  return (
    <AuthContext.Provider
      value={{state, dispatch, service: _authService.current}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
