import { IUserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type TAuthContextDataProps = {
  user: IUserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (userUpdated: IUserDTO) => Promise<void>
}

export const AuthContext = createContext<TAuthContextDataProps>({} as TAuthContextDataProps)

interface IAuthContextProvider {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const userAndTokenUpdate = async ({ user: userData, token }: { user: IUserDTO, token: string }) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setUser(userData)
  }

  const storageUserAndTokenSave = async ({ user: userData, token, refresh_token }: { user: IUserDTO, token: string, refresh_token: string }) => {
    try {
      setIsLoadingUserStorageData(true)
      await Promise.all([storageAuthTokenSave({ token, refresh_token }), storageUserSave(userData)])
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }

  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave({ token: data.token, user: data.user, refresh_token: data.refresh_token })
        userAndTokenUpdate(data)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as IUserDTO)
      await Promise.all([storageUserRemove(), storageAuthTokenRemove()])
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true)
      const [userLogged, { token }] = await Promise.all([storageUserGet(), storageAuthTokenGet()])

      if (token && userLogged) {
        userAndTokenUpdate({ token, user: userLogged })
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const updateUserProfile = async (userUpdated: IUserDTO) => {
    try {
      setUser(userUpdated)
      await storageUserSave(userUpdated)
    } catch (error) {
      throw error
    }
  }



  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingUserStorageData, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}