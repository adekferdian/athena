import {MasterRules} from './../models/MasterRules'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `rules`

type MasterRulesListParam = {
  search?: string
  limit?: number
  offset?: number
}
export function createMasterRules(rule_name: string, description: string, status: string) {
  return axios.post(url, {rule_name, description, status})
}

export function updateMasterRules(rule_id: number, rule_name:string, description: string, status: string) {
  return axios.put(url + `/${rule_id}`, {rule_name, description, status})
}

export function deleteMasterRules(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getMasterRulesDetail(id: string) {
  return axios.get<BaseResponse<MasterRules>>(url + `/get/${id}`)
}

export function getMasterRulesList({search, limit, offset}: MasterRulesListParam) {
  return axios.get<BaseResponseNoPagination<MasterRules>>(url, {
    params: {
      limit,
      search,
      offset
    },

  })
}
