import {UserModel} from './UserModel'

export interface AuthModel {
  accessToken: string
  refreshToken?: string
  user?: UserModel
}
