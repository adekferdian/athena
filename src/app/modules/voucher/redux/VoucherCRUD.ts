import axios from 'axios'
import { BaseResponseNoPagination} from 'src/app/models/api.types'
import {Voucher} from '../models/Voucher'

let config = {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCIsImtpZCI6ImhMWFl0a2tIQUs4Zkdmdks1bnpiRVRGRE13VUxSVlhSa2RQN3diOUJGVkE2U2h5NWI3dEZtRlo1VUpDNHFKV2gifQ.eyJwcm9maWxlIjp7ImlkIjo4NzkzMywidXNlcm5hbWUiOiJ1c2VyXzg1MTU2MTYyNjYyIiwiZnVsbG5hbWUiOiJ1c2VyXzg1MTU2MTYyNjYyIiwiZW1haWwiOiJ1c2VyXzg1MTU2MTYyNjYyIiwicGhvbmVOdW1iZXIiOiI4NTE1NjE2MjY2MiIsImdlbmRlciI6IlByaWEiLCJkYXRlT2ZCaXJ0aCI6LTEyNjQzMjQ2MDgsInVwZGF0ZWRhdGUiOjAsInByb2ZpbGVQaWN0dXJlIjoiIiwic3RhdHVzIjoiIn0sInJvbGVzIjpbMSwxXSwianRpIjoiRkl0Q205eXJ2NFdTS05aeDRSMWlVIiwic3ViIjoidXNlcl84NTE1NjE2MjY2MiIsImlhdCI6MTY4NzkzOTEyNSwiZXhwIjoxNjkwNTY3MTI1LCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIHN2Yy11c2VyOmFwaTpyZWFkIHN2Yy11c2VyOmFwaTphZGQgc3ZjLXVzZXI6YXBpOnVwZGF0ZSBzdmMtdXNlcjphcGk6cmVtb3ZlIiwiY2xpZW50X2lkIjoidXNlci13ZWJhcHAiLCJpc3MiOiJodHRwczovL3Nzby1kLmVkb3QuaWQiLCJhdWQiOiJodHRwczovL2FjY291bnQtZC5lZG90LmlkIn0.1RsVATSkW6Nz1VrG2FItejPLGUrxf8UwW5xM-H8qrSSveXWoVCXRMC7LtyzIa7vVRdJjlCKBL_GSzZHgIYOhTHCh4C7-_HNbe8l4Kezo_cFxls3jJ9P7xAlu7Y8J5pjJGk-nLaOUtDhOkZcahmjZx6Z7VHiE24Wr9rx_qlwKPRf9jC2lVQsv7wy4pVdJ0Vwsp65FM4qiP_jgDvi1Hkj3pBKetxP97fRoUhI5_R4MMEt_Wt8flJe0QPiHIIUdvsaozlOZG8gstL3QI2yZVqYgRIDPwnqnW9cIOP9RV3NfTS-ZqaXDVs-rQnRPcItEZuKrbrqOQom2SUzjm548LpRNuA'
  }
}

export const url = `campaign`

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

export function deleteVoucher(id: string) {
  // return axios.delete(url + `/${id}`)
}

export function getVoucherDetail(id: string) {
  // return axios.get<BaseResponse<Voucher>>(url + `/${id}`)
}

export function getVoucherList({
  search,
  statuses,
}: // role_id,
// cancelToken,
VoucherListParam) {
  // return Array<Voucher>
  return axios.get<BaseResponseNoPagination<Voucher>>(url, config)
}
