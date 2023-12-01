import axios from 'axios'
import {UserModel} from '../models/UserModel'

export const GET_USER_BY_ACCESSTOKEN_URL = `/auth/get-user`
export const LOGIN_BY_EMAIL = `api/v1/admin/auth/login`
export const REQUEST_PASSWORD_URL = `api/v1/admins/reset-password/phone`
export const SET_PASSWORD_URL = `api/v1/admins/reset-password/password?token=`
export const SET_PASSWORD_VERIFICATION = `/api/v1/admins/verifications/phone`
export const SET_EMAIL_VERIFICATION = `/api/v1/admins/verifications/email`
export const RESEND_EMAIL_VERIFICATION = `/api/v1/admins/profile/verify-email/resend`
export const SET_CUSTOMER_EMAIL_VERIFICATION = `/api/v1/customers/verifications/email`
export const PROFILE = `/api/v1/admins/profile`
export const UPDATE_PASSWORD_URL = `/api/v1/admins/profile/password`
export const UPDATE_EMAIL_URL = `api/v1/admins/profile/verify-email`
export const UPDATE_EMAIL_OTP_URL = `api/v1/admins/profile/verify-email-validation`

export type UpdateProfileProps = {
  name?: string
  nip?: string
}

// Server should return AuthModel
export function loginByEmail(email: string, password: string) {
  console.log('EMAIL', email)
  console.log('PASS', password)
  const a = axios.post(LOGIN_BY_EMAIL, {email, password})
  console.log("CEKING",a)
  return a
}

export function requestPassword(phone: string) {
  return axios.post(REQUEST_PASSWORD_URL, {phone})
}

export function setPassword(token: string, password: string) {
  return axios.post(`${SET_PASSWORD_URL}${encodeURI(token)}`, {password})
}

export function getProfile() {
  return axios.get(PROFILE)
}

export function updateProfile(props: UpdateProfileProps) {
  return axios.put(PROFILE, props)
}

export function updatePassword(old_password: string, new_password: string) {
  return axios.put(UPDATE_PASSWORD_URL, {old_password, new_password})
}

export function updateEmail(email: string) {
  return axios.post(UPDATE_EMAIL_URL, {email})
}
export function resendEmailVerification(email: string) {
  return axios.post(RESEND_EMAIL_VERIFICATION, {email})
}

export function updateEmailOtp(email: string, otp_code: string) {
  return axios.post(UPDATE_EMAIL_OTP_URL, {email, otp_code})
}

export function setPasswordVerification(token: string | null, password: string) {
  return axios.post(SET_PASSWORD_VERIFICATION, {token, password})
}
export function setEmailVerification(token: string | null) {
  return axios.post(SET_EMAIL_VERIFICATION, {token})
}
export function setEmailCustomerVerification(token: string | null) {
  return axios.put(SET_CUSTOMER_EMAIL_VERIFICATION, {token})
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}
