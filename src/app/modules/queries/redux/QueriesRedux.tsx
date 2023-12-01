import {Action} from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

namespace QueriesRedux {
  const STORAGE_KEY = 'zeus-queries'

  export interface ActionWithPayload<T> extends Action {
    payload?: T
  }

  export const actionTypes = {
    GetCountryList: '[Get Country List] Action',
    GetProvinceList: '[Get Province List] Action',
    GetCityList: '[Get City List] Action',
    IsLoading: '[IsLoading] Action',
  }

  const initialQueriesState: IQueriesState = {
    countries: undefined,
    provinces: undefined,
    cities: undefined,
    isLoading: undefined,
    message: undefined,
  }

  export interface IQueriesState {
    countries?: any
    provinces?: any
    cities?: any
    isLoading?: boolean
    message?: string
  }

  export const reducer = persistReducer(
    {
      storage,
      key: STORAGE_KEY,
      whitelist: ['countries', 'provinces', 'cities', 'isLoading', 'message'],
    },
    (state: IQueriesState = initialQueriesState, action: ActionWithPayload<IQueriesState>) => {
      const countries = action.payload?.countries
      const provinces = action.payload?.provinces
      const cities = action.payload?.cities
      const message = action.payload?.message
      const isLoading = action.payload?.isLoading

      switch (action.type) {
        case actionTypes.GetCountryList:
          return {...state, countries, message}
        case actionTypes.GetProvinceList:
          return {...state, provinces, message}
        case actionTypes.GetCityList:
          return {...state, cities, message}
        case actionTypes.IsLoading:
          return {...state, isLoading}
        default:
          return state
      }
    }
  )

  export const actions = {
    getCountryList: (countries: any, message: string) => ({
      type: actionTypes.GetCountryList,
      payload: {countries, message},
    }),
    getProvinceList: (provinces: any, message: string) => ({
      type: actionTypes.GetProvinceList,
      payload: {provinces, message},
    }),
    getCityList: (cities: any, message: string) => ({
      type: actionTypes.GetCityList,
      payload: {cities, message},
    }),
    setIsLoading: (isLoading: boolean) => ({
      type: actionTypes.IsLoading,
      payload: {isLoading},
    }),
  }
}

export default QueriesRedux
