import {Mutex} from 'async-mutex'
import axios, {AxiosStatic} from 'axios'
import AuthRedux from 'src/app/modules/auth/redux/AuthRedux'

const mutex = new Mutex()
const plainAxios = axios.create()

export default function setupAxios(localAxios: AxiosStatic, store: any) {
  localAxios.defaults.baseURL = process.env.REACT_APP_API_URL
  plainAxios.defaults.baseURL = process.env.REACT_APP_API_URL

  const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCIsImtpZCI6ImhMWFl0a2tIQUs4Zkdmdks1bnpiRVRGRE13VUxSVlhSa2RQN3diOUJGVkE2U2h5NWI3dEZtRlo1VUpDNHFKV2gifQ.eyJwcm9maWxlIjp7ImlkIjo4NzkzMywidXNlcm5hbWUiOiJ1c2VyXzg1MTU2MTYyNjYyIiwiZnVsbG5hbWUiOiJ1c2VyXzg1MTU2MTYyNjYyIiwiZW1haWwiOiJ1c2VyXzg1MTU2MTYyNjYyIiwicGhvbmVOdW1iZXIiOiI4NTE1NjE2MjY2MiIsImdlbmRlciI6IlByaWEiLCJkYXRlT2ZCaXJ0aCI6LTEyNjQzMjQ2MDgsInVwZGF0ZWRhdGUiOjAsInByb2ZpbGVQaWN0dXJlIjoiIiwic3RhdHVzIjoiIn0sInJvbGVzIjpbMSwxXSwianRpIjoiRkl0Q205eXJ2NFdTS05aeDRSMWlVIiwic3ViIjoidXNlcl84NTE1NjE2MjY2MiIsImlhdCI6MTY4NzkzOTEyNSwiZXhwIjoxNjkwNTY3MTI1LCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIHN2Yy11c2VyOmFwaTpyZWFkIHN2Yy11c2VyOmFwaTphZGQgc3ZjLXVzZXI6YXBpOnVwZGF0ZSBzdmMtdXNlcjphcGk6cmVtb3ZlIiwiY2xpZW50X2lkIjoidXNlci13ZWJhcHAiLCJpc3MiOiJodHRwczovL3Nzby1kLmVkb3QuaWQiLCJhdWQiOiJodHRwczovL2FjY291bnQtZC5lZG90LmlkIn0.1RsVATSkW6Nz1VrG2FItejPLGUrxf8UwW5xM-H8qrSSveXWoVCXRMC7LtyzIa7vVRdJjlCKBL_GSzZHgIYOhTHCh4C7-_HNbe8l4Kezo_cFxls3jJ9P7xAlu7Y8J5pjJGk-nLaOUtDhOkZcahmjZx6Z7VHiE24Wr9rx_qlwKPRf9jC2lVQsv7wy4pVdJ0Vwsp65FM4qiP_jgDvi1Hkj3pBKetxP97fRoUhI5_R4MMEt_Wt8flJe0QPiHIIUdvsaozlOZG8gstL3QI2yZVqYgRIDPwnqnW9cIOP9RV3NfTS-ZqaXDVs-rQnRPcItEZuKrbrqOQom2SUzjm548LpRNuA"

  localAxios.interceptors.request.use(
    (config: any) => {
      // const {
      //   auth: {accessToken},
      // } = store.getState()

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
