import axios from 'axios'
import {BaseResponse2, Pagination2} from 'src/app/models/api.types'
import {Language} from '../models/Language'

export const url = `/api/v1/language`

type LanguageListParam = {
  page: number
  limit: number
  search?: string
  statuses?: string[]
  // role_id?: string
  // cancelToken?: any
}
export function createLanguage(id: string, description: string, status: number, logo: string) {
  return axios.post(url + `/${id}`, {description: description, status: status, logo: logo})
}
export function updateLanguage(id: string, description: string, status: number, logo: string) {
  return axios.put(url + `/${id}`, {description: description, status: status, logo: logo})
}

export function deleteLanguage(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getLanguageDetail(id: string) {
  return axios.get<BaseResponse2<Language>>(url + `/${id}`)
}

export function getLanguageList({
  page,
  limit,
  search,
  statuses,
}: // role_id,
// cancelToken,
LanguageListParam) {
  return axios.get<BaseResponse2<Pagination2<Language>>>(url, {
    params: {
      page,
      limit,
      search,
      // role_id,
      statuses,
    },
    // cancelToken,
  })
}
