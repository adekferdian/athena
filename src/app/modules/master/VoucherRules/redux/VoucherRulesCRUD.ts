import {VoucherRules} from '../models/VoucherRules'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `voucher-rules`

type VoucherRulesListParam = {
  search?: string
  limit?: number
  offset?: number
}

export function createVoucherRules(
  bu_id: number,
  voucher_id: string,
  rules_id: string,
  component_id: string,
) {
  return axios.post(url, {bu_id, voucher_id, rules_id, component_id})
}

export function updateVoucherRules(
  id: number,
  bu_id: number,
  voucher_id: string,
  rules_id: string,
  component_id: string,
) {
  return axios.put(url + `/${id}`, {
    bu_id,
    voucher_id,
    rules_id,
    component_id,
  })
}

export function deleteVoucherRules(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getVoucherRulesDetail(id: string) {
  return axios.get<BaseResponse<VoucherRules>>(url + `/get/${id}`)
}

export function getVoucherRulesList({search, limit, offset}: VoucherRulesListParam) {
  return axios.get<BaseResponseNoPagination<VoucherRules>>(url, {
    params: {
      limit,
      search,
      offset,
    },
  })
}
export function getVoucherList({search, limit, offset}: VoucherRulesListParam) {
  return axios.get<BaseResponseNoPagination<VoucherRules>>('voucher', {
    params: {
      limit,
      search,
      offset,
    },
  })
}
