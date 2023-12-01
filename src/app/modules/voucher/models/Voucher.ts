export interface Voucher {
  id: number,
  voucher_name: string,
  voucher_code: string,
  platform: string,
  periode: string,
  total_quota: number,
  quota_user: number,
  total_used: number,
  transaction_type: string,
  status: string,
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
