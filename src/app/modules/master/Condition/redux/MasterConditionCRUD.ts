import {MasterCondition} from '../models/Condition'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `condition`

type MasterConditionListParam = {
  search?: string
  limit?: number
  offset?: number
}
export function createMasterCondition(condition_type_id: number, condition: string, value: string, status: string) {
  return axios.post(url, {condition_type_id, condition, value, status})
}

export function updateMasterCondition(condition_id: number, condition_type_id: number, condition: string, value: string, status: string) {
  return axios.put(url + `/${condition_id}`, {condition_type_id, condition, value, status})
}

export function deleteMasterCondition(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getMasterConditionDetail(id: string) {
  return axios.get<BaseResponse<MasterCondition>>(url + `/get/${id}`)
}

export function getMasterConditionList({search, limit, offset}: MasterConditionListParam) {
  return axios.get<BaseResponseNoPagination<MasterCondition>>(url, {
    params: {
      limit,
      search,
      offset
    },
  })
}
