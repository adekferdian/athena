import {Limit} from '../models/Limit'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `master-limit`

type LimitListParam = {
  search?: string
  limit?: number
  offset?: number
}
export function createLimit(limit_name: string, limit_description: string, limit_rules: string, limit_type: string, status: string) {
  return axios.post(url, {limit_name, limit_description, limit_type, limit_rules, status})
}

export function updateLimit(limit_id: number, limit_name:string, limit_description: string, limit_rules: string, limit_type: string, status: string) {
  return axios.put(url + `/${limit_id}`, {limit_name, limit_description, limit_type, limit_rules, status})
}

export function deleteLimit(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getLimitDetail(id: string) {
  return axios.get<BaseResponse<Limit>>(url + `/get/${id}`)
}

export function getLimitList({search, limit, offset}: LimitListParam) {
  return axios.get<BaseResponseNoPagination<Limit>>(url, {
    params: {
      limit,
      search,
      offset
    },

  })
}
