import {BusinessUnit} from '../models/BusinessUnit'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `business-unit`

type BusinessUnitListParam = {
  search?: string
  limit?: number
  offset?: number
}
export function createBusinessUnit(bu_name: string, api_url: string, environtment: string, description: string, status: string) {
  return axios.post(url, {bu_name, api_url, description, environtment, status})
}

export function updateBusinessUnit(bu_id: number, bu_name:string, api_url: string, environtment: string, description: string, status: string) {
  return axios.put(url + `/${bu_id}`, {bu_name, api_url, description, environtment, status})
}

export function deleteBusinessUnit(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getBusinessUnitDetail(id: string) {
  return axios.get<BaseResponse<BusinessUnit>>(url + `/get/${id}`)
}

export function getBusinessUnitList({search, limit, offset}: BusinessUnitListParam) {
  return axios.get<BaseResponseNoPagination<BusinessUnit>>(url, {
    params: {
      limit,
      search,
      offset
    },

  })
}
