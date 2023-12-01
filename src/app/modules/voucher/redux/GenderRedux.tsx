import {Action} from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

namespace GenderRedux {
//   const STORAGE_KEY = 'hermes-admin'

  export interface ActionWithPayload<T> extends Action {
    payload?: T
  }

  export const actionTypes = {
    GetListGender: '[Get List Gender] Action',
    GetDetailGender: '[Get Detail Gender] Action',
    IsLoading: '[IsLoading] Action',
    SetSuccess: '[SetSuccess] Action',
  }

  const initialBrandState: IAdminState = {
    data: undefined,
    isLoading: undefined,
    message: undefined,
    success: undefined,
  }

  export interface IAdminState {
    data?: any
    isLoading?: boolean
    message?: string
    success?: string
  }

  export const reducer = persistReducer(
    {
      storage,
      key:'' 
    //   STORAGE_KEY
      ,
      whitelist: ['data', 'isLoading', 'message', 'success'],
    },
    (state: IAdminState = initialBrandState, action: ActionWithPayload<IAdminState>) => {
      const data = action.payload?.data
      const message = action.payload?.message
      const isLoading = action.payload?.isLoading
      const success = action.payload?.success

      switch (action.type) {
        case actionTypes.GetListGender:
          return {...state, data, message, isLoading: false}
        case actionTypes.GetDetailGender:
          return {...state, data, message, isLoading: false}
        case actionTypes.IsLoading:
          return {...state, isLoading}
        case actionTypes.SetSuccess:
          return {...state, success}
        default:
          return state
      }
    }
  )

  export const actions = {
    getListGender: (data: any, message: string) => ({
      type: actionTypes.GetListGender,
      payload: {data, message},
    }),
    getDetailGender: (data: any, message: string) => ({
      type: actionTypes.GetDetailGender,
      payload: {data, message},
    }),
    setIsLoading: (isLoading: boolean) => ({
      type: actionTypes.IsLoading,
      payload: {isLoading},
    }),
    setSuccess: (success: string) => ({
      type: actionTypes.SetSuccess,
      payload: {success},
    }),
  }
}

export default GenderRedux
