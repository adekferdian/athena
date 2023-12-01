import {Mutex} from 'async-mutex'
import axios, {AxiosStatic} from 'axios'
import AuthRedux from 'src/app/modules/auth/redux/AuthRedux'

const mutex = new Mutex()
const plainAxios = axios.create()

export default function setupAxios(localAxios: AxiosStatic, store: any) {
  localAxios.defaults.baseURL = process.env.REACT_APP_API_URL
  plainAxios.defaults.baseURL = process.env.REACT_APP_API_URL

  localAxios.interceptors.request.use(
    (config: any) => {
      const {
        auth: {accessToken},
      } = store.getState()

      if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (err: any) => {
      Promise.reject(err)
    }
  )
  localAxios.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const {
        auth: {refreshToken},
      } = store.getState()
      const {dispatch} = store

      const {status} = error.response ?? {}

      if (status === 401 && refreshToken != null) {
        return mutex.runExclusive(async () => {
          const refresh = await _refreshToken(refreshToken)

          if (refresh) {
            error.config.headers.Authorization = `Bearer ${store.getState().auth.accessToken}`
            try {
              return await plainAxios.request(error.config)
            } catch (err: any) {
              if (err.response?.status === 401) dispatch(AuthRedux.actions.logout())
              throw err
            }
          }
          dispatch(AuthRedux.actions.logout())
          throw error
        })
      }
      throw error
    }
  )
  const _refreshToken = async (refreshToken: any) => {
    const {dispatch} = store
    try {
      const result = await plainAxios.post(`/api/v1/admins/refresh-token`, null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      if (result.data)
        dispatch(
          AuthRedux.actions.fulfillToken({
            accessToken: result.data.data.token,
            refreshToken: refreshToken,
          })
        )
      return result.data
    } catch (error: any) {
      if (error.response.data?.message[0]?.constraint[0]?.code === 'REFRESH_TOKEN_UNAUTHORIZED') {
        dispatch(AuthRedux.actions.logout('User telah login di tempat lain'))
      } else {
        dispatch(AuthRedux.actions.logout())
      }
      throw error
    }
  }
}
