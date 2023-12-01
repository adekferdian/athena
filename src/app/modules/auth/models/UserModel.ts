// import {RoleCorporate} from '../../role-management/models/Role'

export interface UserModel {
  id: string
  name: string
  email: string
  phone: string
  password: string
  group_id: string
  merchant_id: string
  store_id: string
  created_at: string
  updated_at: string
  deleted_at: string
  token_reset_password: string
  group: Group
  merchant: Merchant
  store: Store
  nip: string
  role: Role
  email_verified_at: string
}

export interface Role {
  id: string
  name: string
  platform: string
  status: string
  module_permissions: []
  role: string
}

export interface Merchant {
  id: string
  group_id: string
  name: string
  lob_id: string
  status: string
  address: string
  owner_name: string
  owner_email: string
  owner_phone: string
  owner_password: string
  owner_nik: string
  owner_dob: string
  owner_dob_city: string
  owner_address: string
  owner_ktp: string
  owner_face_ktp: string
  bank_id: string
  bank_acc_name: string
  bank_acc_number: string
  tarif_pb1: string
  logo: string
  approved_at: string
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface Group {
  id: string
  name: string
  status: string
  owner_name: string
  owner_password: string
  owner_ktp: string
  email: string
  phone: string
  address: string
  approved_at: string
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface Store {
  id: string
  merchant_id: string
  name: string
  phone: string
  owner_phone: string
  owner_email: string
  owner_password: string
  address: string
  post_code: string
  guidance: string
  location_longitude: number
  location_latitude: number
  upload_photo: string
  upload_banner: string
  delivery_type: string
  status: string
  is_store_open: boolean
  is_open_24h: boolean
  created_at: string
  updated_at: string
  deleted_at: string
  average_price: number
  merchant?: Merchant
}
