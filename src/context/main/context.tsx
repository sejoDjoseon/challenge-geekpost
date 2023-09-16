import React, {ReactNode, createContext, useContext, useRef} from 'react'

import {FeedService} from '../../services/FeedService'
import PublicationsInfra from '../../infra/firebase/publications'
import {useAuthContext} from '../auth/context'
import FilesStorage from '../../infra/firebase/storage'

export interface IMainContext {
  feedService: FeedService
}

const MainContext = createContext<IMainContext>({} as IMainContext)

export function MainContextProvider({children}: {children: ReactNode}) {
  const {state: authState} = useAuthContext()
  const _feedService = useRef<FeedService>(
    new FeedService(
      new PublicationsInfra(),
      {userName: authState.userName ?? ''},
      new FilesStorage(),
    ),
  )

  return (
    <MainContext.Provider value={{feedService: _feedService.current}}>
      {children}
    </MainContext.Provider>
  )
}

export function useMainContext() {
  return useContext(MainContext)
}
