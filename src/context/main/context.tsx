import React, {ReactNode, createContext, useContext, useRef} from 'react'

import {FeedService} from '../../services/FeedService'
import PublicationsInfra from '../../infra/firebase/publications'

export interface IMainContext {
  feedService: FeedService
}

const MainContext = createContext<IMainContext>({} as IMainContext)

export function MainContextProvider({children}: {children: ReactNode}) {
  const _feedService = useRef<FeedService>(
    new FeedService(new PublicationsInfra()),
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
