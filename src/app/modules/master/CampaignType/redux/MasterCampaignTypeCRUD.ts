import {MasterCampaignType} from '../models/CampaignType'
import axios from 'axios'
import {BaseResponse, BaseResponseNoPagination} from 'src/app/models/api.types'

export const url = `campaign-type`

type MasterCampaignTypeListParam = {
  search?: string
  limit?: number
  offset?: number
}
export function createMasterCampaignType(campaigntype: string, status: string) {
  return axios.post(url, {campaigntype, status})
}

export function updateMasterCampaignType(campaigntype_id: number, campaigntype:string, status: string) {
  return axios.put(url + `/${campaigntype_id}`, {campaigntype, status})
}

export function deleteMasterCampaignType(id: string) {
  return axios.delete(url + `/${id}`)
}

export function getMasterCampaignTypeDetail(id: string) {
  return axios.get<BaseResponse<MasterCampaignType>>(url + `/get/${id}`)
}

export function getMasterCampaignTypeList({search, limit, offset}: MasterCampaignTypeListParam) {
  return axios.get<BaseResponseNoPagination<MasterCampaignType>>(url, {
    params: {
      limit,
      search,
      offset
    },
  })
}
