import axios from 'axios'

export const COUNTRY = `/api/v1/admins/query/countries`
export const PROVINCE = `/api/v1/admins/query/provinces`
export const CITY = `/api/v1/admins/query/cities`

export function countryList() {
  return axios.get(COUNTRY)
}

export function provinceList(country_id: string, params: any = {}, cancelToken?: any) {
  return axios.get(`${PROVINCE}?country_id=${country_id}`, {params, cancelToken})
}

export function cityList(province_id?: string, params: any = {}, cancelToken?: any) {
  return axios.get(`${CITY}?province_id=${province_id}`, {params, cancelToken})
}

export function cityListAll(cancelToken?: any) {
  return axios.get(`${CITY}/all`, {cancelToken})
}
