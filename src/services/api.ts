import { AppError } from '@utils/AppError'
import axios, { AxiosInstance } from 'axios'

type TSignOut = () => void

interface IApiInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: TSignOut) => () => void
}

const api = axios.create({
  baseURL: "http://192.168.15.5:3333"
}) as IApiInstanceProps

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    }
    return Promise.reject(error)
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}



export { api }