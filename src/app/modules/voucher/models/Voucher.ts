export interface Voucher {
  id: number,
  campaign_name: string,
  code: string,
  platform: string,
  periode: string,
  total_quota: number,
  quota_user: number,
  total_used: number,
  transaction_type: string,
  status: number,
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
