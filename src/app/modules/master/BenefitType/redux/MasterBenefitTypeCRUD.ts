import {MasterBenefitType} from '../models/BenefitType'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `benefit-type`

type MasterBenefitTypeListParam = {
  search?: string
  limit?: number
  offset?: number
}
export function createMasterBenefitType(benefittype: string, status: string) {
  return axios.post(url, {benefittype, status})
}

export function updateMasterBenefitType(benefittype_id: number, benefittype:string, status: string) {
  return axios.put(url + `/${benefittype_id}`, {benefittype, status})
}

export function deleteMasterBenefitType(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getMasterBenefitTypeDetail(id: string) {
  return axios.get<BaseResponse<MasterBenefitType>>(url + `/get/${id}`)
}

export function getMasterBenefitTypeList({search, limit, offset}: MasterBenefitTypeListParam) {
  return axios.get<BaseResponseNoPagination<MasterBenefitType>>(url, {
    params: {
      limit,
      search,
      offset
    },

  })
}
