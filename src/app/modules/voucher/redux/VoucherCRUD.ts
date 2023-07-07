import axios from 'axios'
import { BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'
import {Campaign} from '../models/Voucher'

const url = `campaign`
const urlVoucher = `voucher`

type VoucherListParam = {
  search?: string
  statuses?: string[]
  bu_id?: any
  // role_id?: string
  // cancelToken?: any
}
export function createCampaign(data: any) {
  // console.log(data);
  
  return axios.post(url, data)
}

export function updateVoucher(id: string, description: string, status: number) {
  // return axios.put(url + `/${id}`, {description: description, status: status})
}

export function deleteCampaign(id: string) {
  return axios.delete(url + `/del/${id}`)
}

export function getCampaignDetail(id: string) {
  return axios.get<BaseResponse<Campaign>>(url + `/get/${id}`)
}

export function updateRevision(id: string, status: string, note: string) {
  return axios.post(url + `/revision/${id}`, {status: status, note: note})
}

export function generateVoucher(prefix: string, amount: number) {
  return axios.post(urlVoucher + `/generate`, {prefix: prefix, amount: amount})
}

export function getVoucherList({
  search,
  //@ts-ignore
  status,
  bu_id
}: // role_id,
// cancelToken,
VoucherListParam) {
  // return Array<Voucher>
  return axios.get<BaseResponseNoPagination<Campaign>>(url, {
    params: {
      search,
      status,
      bu_id
      // role_id,
    },
    // cancelToken,
  })
}
