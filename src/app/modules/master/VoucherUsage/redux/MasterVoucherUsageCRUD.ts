import {MasterVoucherUsage} from '../models/VoucherUsage'
import axios from 'axios'
import {BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `master/`

type VoucherUsageListParam = {
  search?: string
}

export function getVoucherUsageHowTo({search}: VoucherUsageListParam) {
  return axios.get<BaseResponseNoPagination<MasterVoucherUsage>>(url + 'how-to-use', {
    params: {
      search,
    },
  })
}
export function getVoucherUsageType({search}: VoucherUsageListParam) {
  return axios.get<BaseResponseNoPagination<MasterVoucherUsage>>(url + 'voucher-type', {
    params: {
      search,
    },
  })
}
export function getVoucherUsageTransaction({search}: VoucherUsageListParam) {
  return axios.get<BaseResponseNoPagination<MasterVoucherUsage>>(url + 'transaction-type', {
    params: {
      search,
    },
  })
}
