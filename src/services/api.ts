import { storageAuthTokenGet } from '@storage/storageAuthToken'
import { AppError } from '@utils/AppError'
import axios, { AxiosError, AxiosInstance } from 'axios'

type TSignOut = () => void

type TPromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

interface IApiInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: TSignOut) => () => void
}

const api = axios.create({
  baseURL: "http://192.168.15.5:3333"
}) as IApiInstanceProps

let failedQueue: Array<TPromiseType> = []
let isRefreshing = false

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === "token.expired" || requestError.response.data?.message === "token.invalid") {
        const { refresh_token } = await storageAuthTokenGet()

        if (!refresh_token) {
          signOut()
          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.config

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess: (token: string) => {
                originalRequestConfig.headers = { "Authorization": `Bearer ${token}` }
                resolve(api(originalRequestConfig))
              },
              onFailure: (error) => {
                reject(error)
              }
            })
          })
        }

        isRefreshing = true
      }

      signOut()
    }





    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    }
    return Promise.reject(requestError)
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}



export { api }