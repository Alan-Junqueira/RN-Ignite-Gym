import { IUserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserGet, storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type TAuthContextDataProps = {
  user: IUserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<TAuthContextDataProps>({} as TAuthContextDataProps)

interface IAuthContextProvider {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet()

      if (userLogged) {
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingUserStorageData }}>
      {children}
    </AuthContext.Provider>
  )
}