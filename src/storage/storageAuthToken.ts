import AsyncStorage from "@react-native-async-storage/async-storage"
import { AUTH_TOKEN_STORAGE } from "./storageConfig"

type TStorageAuthTokenProps = {
  token: string
  refresh_token: string
}

export const storageAuthTokenSave = async ({ refresh_token, token }: TStorageAuthTokenProps) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refresh_token }))
}

export const storageAuthTokenGet = async () => {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  const { refresh_token, token }: TStorageAuthTokenProps = response ? JSON.parse(response) : {}

  return { refresh_token, token }
}


export const storageAuthTokenRemove = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}