import { IUserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext } from "react";

export type TAuthContextDataProps = {
  user: IUserDTO
}

export const AuthContext = createContext<TAuthContextDataProps>({} as TAuthContextDataProps)

interface IAuthContextProvider {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  return (
    <AuthContext.Provider value={{
      user: {
        avatar: "",
        email: "",
        id: "",
        name: ""
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}