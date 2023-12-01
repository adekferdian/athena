import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {put, takeLatest} from 'redux-saga/effects'
import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'
import {getProfile} from './AuthCRUD'

namespace AuthRedux {
  const STORAGE_KEY = process.env.REACT_APP_STORAGE_KEY || 'ebiz-auth'

  export interface ActionWithPayload<T> extends Action {
    payload?: T
  }

  export const actionTypes = {
    Login: '[Login] Action',
    Logout: '[Logout] Action',
    Register: '[Register] Action',
    UserRequested: '[Request User] Action',
    UserLoaded: '[Load User] Auth API',
    RefreshToken: '[Refresh Token] Action',
    SetUser: '[Set User] Action',
    UpdateUser: '[Update User] Action',
    FetchingUser: '[Fetching User] Action',
  }

  const initialAuthState: IAuthState = {
    fetchingUser: undefined,
    user: undefined,
    accessToken: undefined,
    permissions: undefined,
    refreshToken: undefined,
    message: undefined,
  }

  export interface IAuthState {
    fetchingUser?: FetchingUserState
    user?: UserModel
    accessToken?: string
    refreshToken?: string
    permissions?: Record<string, string[]>
    message?: string
  }

  export type FetchingUserState = 'failed' | 'success' | 'loading'

  const extractPermissions = (user?: UserModel) => {
    const permissions: Record<string, string[]> = {}
    user?.role?.module_permissions?.forEach((perm: any) => {
      perm?.modules?.forEach((mod: any) => {
        permissions[mod.code] = [...(permissions[mod.code] ?? []), ...mod.active_permissions]
      })
    })
    Object.keys(permissions).forEach((record) => {
      permissions[record] = permissions[record].filter((v, i, self) => self.indexOf(v) === i)
    })
    return permissions
  }

  export const reducer = persistReducer(
    {storage, key: STORAGE_KEY, whitelist: ['accessToken', 'refreshToken', 'user', 'permissions']},
    (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState> = {type: ''}) => {
      switch (action.type) {
        case actionTypes.Login: {
          const accessToken = action.payload?.accessToken
          const refreshToken = action.payload?.refreshToken
          const user = action.payload?.user
          const permissions = extractPermissions(user)
          return {accessToken, refreshToken, user, permissions}
        }

        case actionTypes.Register: {
          const accessToken = action.payload?.accessToken
          const refreshToken = action.payload?.refreshToken
          return {accessToken, refreshToken, user: undefined}
        }

        case actionTypes.Logout: {
          const message = action.payload?.message || undefined
          return {...initialAuthState, message}
        }

        case actionTypes.UserRequested: {
          return {...state, user: undefined}
        }

        case actionTypes.RefreshToken: {
          if (!state.refreshToken) return state
          return {
            ...state,
            accessToken: action.payload?.accessToken ?? state.accessToken,
            refreshToken: action.payload?.refreshToken ?? state.refreshToken,
          }
        }

        case actionTypes.UserLoaded:
        case actionTypes.SetUser: {
          const user = action.payload?.user
          const permissions = extractPermissions(user)
          return {...state, user, permissions, fetchingUser: 'success' as FetchingUserState}
        }

        case actionTypes.UpdateUser: {
          const user = action.payload?.user
          return {
            ...state,
            user: {
              id: user?.id ?? state.user?.id,
              name: user?.name ?? state.user?.name,
              email: user?.email ?? state.user?.email,
              phone: user?.phone ?? state.user?.phone,
              password: user?.password ?? state.user?.password,
              group_id: user?.group_id ?? state.user?.group_id,
              merchant_id: user?.merchant_id ?? state.user?.merchant_id,
              store_id: user?.store_id ?? state.user?.store_id,
              created_at: user?.created_at ?? state.user?.created_at,
              updated_at: user?.updated_at ?? state.user?.updated_at,
              deleted_at: user?.deleted_at ?? state.user?.deleted_at,
              token_reset_password: user?.token_reset_password ?? state.user?.token_reset_password,
              group: user?.group ?? state.user?.group,
              merchant: user?.merchant ?? state.user?.merchant,
              store: user?.store ?? state.user?.store,
              nip: user?.nip ?? state.user?.nip,
              role: user?.role ?? state.user?.role,
              email_verified_at: user?.email_verified_at ?? state.user?.email_verified_at,
            } as UserModel,
            fetchingUser: 'success' as FetchingUserState,
          }
        }

        case actionTypes.FetchingUser: {
          const fetchingUser = action.payload?.fetchingUser
          return {...state, fetchingUser}
        }

        default:
          return state
      }
    }
  )

  export const actions = {
    login: (accessToken: string, refreshToken: string) => ({
      type: actionTypes.Login,
      payload: {accessToken, refreshToken},
    }),
    register: (accessToken: string, refreshToken: string) => ({
      type: actionTypes.Register,
      payload: {accessToken, refreshToken},
    }),
    logout: (message?: string) => ({type: actionTypes.Logout, payload: {message}}),
    requestUser: () => ({
      type: actionTypes.UserRequested,
    }),
    fulfillToken: ({accessToken, refreshToken}: AuthModel) => ({
      type: actionTypes.RefreshToken,
      payload: {accessToken, refreshToken},
    }),
    fulfillUser: (user: UserModel) => ({type: actionTypes.UserLoaded, payload: {user}}),
    setUser: (user: UserModel) => ({type: actionTypes.SetUser, payload: {user}}),
    updateUser: (user: UserModel) => ({type: actionTypes.UpdateUser, payload: {user}}),
    setFetchingUser: (fetchingUser: 'failed' | 'success' | 'loading') => ({
      type: actionTypes.FetchingUser,
      payload: {fetchingUser},
    }),
  }

  export function* saga() {
    yield takeLatest(actionTypes.Login, function* loginSaga(_action: any) {
      yield put(actions.requestUser())
    })

    yield takeLatest(actionTypes.Logout, function* loginSaga() {
      yield localStorage.clear()
    })

    yield takeLatest(actionTypes.Register, function* registerSaga() {
      // yield put(actions.requestUser())
    })

    yield takeLatest(actionTypes.UserRequested, function* userRequested(_action: any) {
      try {
        yield put(actions.setFetchingUser('loading'))
        const {
          data: {data: user},
        } = yield getProfile()

        yield put(actions.fulfillUser(user))
      } catch {
        yield put(actions.setFetchingUser('failed'))
      }
    })
  }
}

export default AuthRedux
