// import axios from 'axios'
// import {BaseResponse} from 'src/app/models/api.types'
import {Voucher} from '../models/Voucher'

export const url = `/api/v1/gender`

type GenderListParam = {
  search?: string
  statuses?: string[]
  // role_id?: string
  // cancelToken?: any
}
export function createGender(description: string, status: number) {
  // return axios.post(url, {description: description, status: status})
}

export function updateGender(id: string, description: string, status: number) {
  // return axios.put(url + `/${id}`, {description: description, status: status})
}

export function deleteGender(id: string) {
  // return axios.delete(url + `/${id}`)
}

export function getGenderDetail(id: string) {
  // return axios.get<BaseResponse<Voucher>>(url + `/${id}`)
}

export function getGenderList({
  search,
  statuses,
}: // role_id,
// cancelToken,
GenderListParam) {
  return Array<Voucher>
  // return axios.get<BaseResponseNoPagination<Gender>>(url, {
  //   params: {
  //     search,
  //     // role_id,
  //     statuses,
  //   },
  //   // cancelToken,
  // })
}
