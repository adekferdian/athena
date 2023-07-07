import {MasterConditionType} from '../models/ConditionType'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `condition-type`

type MasterConditionTypeListParam = {
  search?: string
  limit?: number
  offset?: number
}
export function createMasterConditionType(condition_type: string, description: string, status: string) {
  return axios.post(url, {condition_type, description, status})
}

export function updateMasterConditionType(condition_type_id: number, condition_type: string, description: string, status: string) {
  return axios.put(url + `/${condition_type_id}`, {condition_type, description, status})
}

export function deleteMasterConditionType(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getMasterConditionTypeDetail(id: string) {
  return axios.get<BaseResponse<MasterConditionType>>(url + `/get/${id}`)
}

export function getMasterConditionTypeList({search, limit, offset}: MasterConditionTypeListParam) {
  return axios.get<BaseResponseNoPagination<MasterConditionType>>(url, {
    params: {
      limit,
      search,
      offset
    },
  })
}
