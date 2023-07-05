import axios from 'axios'
import { BaseResponseNoPagination} from 'src/app/models/api.types'
import {Campaign} from '../models/Voucher'

const url = `campaign`

type VoucherListParam = {
  search?: string
  statuses?: string[]
  // role_id?: string
  // cancelToken?: any
}
export function createVoucher(description: string, status: number) {
  // return axios.post(url, {description: description, status: status})
}

export function updateVoucher(id: string, description: string, status: number) {
  // return axios.put(url + `/${id}`, {description: description, status: status})
}

export function deleteCampaign(id: string) {
  return axios.delete(url + `/del/${id}`)
}

export function getVoucherDetail(id: string) {
  // return axios.get<BaseResponse<Voucher>>(url + `/${id}`)
}

export function updateRevision(id: string, status: string, note: string) {
  return axios.post(url + `/revision/${id}`, {status: status, note: note})
}

export function getVoucherList({
  search,
  //@ts-ignore
  status,
}: // role_id,
// cancelToken,
VoucherListParam) {
  // return Array<Voucher>
  return axios.get<BaseResponseNoPagination<Campaign>>(url, {
    params: {
      search,
      status,
      // role_id,
    },
    // cancelToken,
  })
}
