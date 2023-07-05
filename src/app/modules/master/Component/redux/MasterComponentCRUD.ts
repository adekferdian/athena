import {MasterComponent} from '../models/Component'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `master-component`

type MasterComponentListParam = {
  search?: string
  limit?: number
  offset?: number
}
export function createMasterComponent(  component_name: string,
  description: string,
  meta_data: string,
  status: string) {
  return axios.post(url, {component_name, description,meta_data, status})
}

export function updateMasterComponent(
  component_id: number,
  component_name: string,
  description: string,
  meta_data: string,
  status: string) {
  return axios.put(url + `/${component_id}`, {component_name, description,meta_data, status})
}

export function deleteMasterComponent(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getMasterComponentDetail(id: string) {
  return axios.get<BaseResponse<MasterComponent>>(url + `/get/${id}`)
}

export function getMasterComponentList({search, limit, offset}: MasterComponentListParam) {
  return axios.get<BaseResponseNoPagination<MasterComponent>>(url, {
    params: {
      limit,
      search,
      offset
    },

  })
}
