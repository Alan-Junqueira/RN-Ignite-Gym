import { IUserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserGet, storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type TAuthContextDataProps = {
  user: IUserDTO
  signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<TAuthContextDataProps>({} as TAuthContextDataProps)

interface IAuthContextProvider {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);

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
    const userLogged = await storageUserGet()

    if (userLogged) {
      setUser(userLogged)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}