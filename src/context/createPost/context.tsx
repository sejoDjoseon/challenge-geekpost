import React, {
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react'

export interface ICreatePostContext {
  imagePath: string | undefined
  setImagePath: React.Dispatch<React.SetStateAction<string | undefined>>
  description: string | undefined
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>
}

const CreatePostContext = createContext<ICreatePostContext>(
  {} as ICreatePostContext,
)

export function CreatePostContextProvider({children}: {children: ReactNode}) {
  const [imagePath, setImagePath] = useState<string | undefined>()
  const [description, setDescription] = useState<string | undefined>()

  return (
    <CreatePostContext.Provider
      value={{imagePath, setImagePath, description, setDescription}}>
      {children}
    </CreatePostContext.Provider>
  )
}

export function useCreatePostContext() {
  return useContext(CreatePostContext)
}
