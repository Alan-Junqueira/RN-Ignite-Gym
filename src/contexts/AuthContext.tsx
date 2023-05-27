import { IUserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { ReactNode, createContext, useState } from "react";

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

  console.log(user)


  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      throw error
    }

  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}