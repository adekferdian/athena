export interface Campaign {
  business_unit: object
  campaign_id: number
  campaign_name: string
  image: object
  status: string
  transaction_type: object
  valid_end: string
  valid_start: string
  voucher: Array<Voucher>
  voucher_quota: number
  voucher_quota_user: number
  voucher_type: string
  voucher_used: string
}

interface Voucher {
  campaign_id: number
  status: string
  voucher_code: string
  voucher_id: number
}

export interface UpdateGender {
  id: string
  description: string
  status: number
  logo: string
}

export enum GenderStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
