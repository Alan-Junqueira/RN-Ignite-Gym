import { IUserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext, useState } from "react";

export type TAuthContextDataProps = {
  user: IUserDTO
  signIn: (email: string, password: string) => void
}

export const AuthContext = createContext<TAuthContextDataProps>({} as TAuthContextDataProps)

interface IAuthContextProvider {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState({
    avatar: "",
    email: "",
    id: "",
    name: ""
  });

  const signIn = (email: string, password: string) => {
    setUser({
      email,
      avatar: '',
      id: '',
      name: ''
    })
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}