import React, {ReactNode, createContext, useContext, useReducer} from 'react'
import {AuthState, authReducer, initialState} from './reducer'
import {Action} from './actions'

interface IAuthContext {
  state: AuthState
  dispatch: React.Dispatch<Action>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export function AuthContextProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
