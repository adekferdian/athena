import {MasterBenefit} from '../models/BenefitType'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `benefit`

type MasterBenefitListParam = {
  search?: string
  limit?: number
  offset?: number
}

export function createMasterBenefit(
  benefit_type: number,
  benefit_name: string,
  benefit_description: string,
  meta_data: string,
  status: string
) {
  return axios.post(url, {benefit_type, benefit_name, benefit_description, meta_data, status})
}

export function updateMasterBenefit(
  benefit_id: number,
  benefit_type: number,
  benefit_name: string,
  benefit_description: string,
  meta_data: string,
  status: string
) {
  return axios.put(url + `/${benefit_id}`, {
    benefit_type,
    benefit_name,
    benefit_description,
    meta_data,
    status,
  })
}

export function deleteMasterBenefit(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getMasterBenefitDetail(id: string) {
  return axios.get<BaseResponse<MasterBenefit>>(url + `/get/${id}`)
}

export function getMasterBenefitList({search, limit, offset}: MasterBenefitListParam) {
  return axios.get<BaseResponseNoPagination<MasterBenefit>>(url, {
    params: {
      limit,
      search,
      offset,
    },
  })
}
