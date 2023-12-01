export type Message = {
  value: string
  property: string
  constraint: Constraint[]
}

export type BaseResponse<T> = {
  status?: boolean
  message?: Message[]
  data?: T
  error?: string
}

export type Constraint = {
  code?: string
  message?: string
}

export type Pagination<T> = {
  total_item: number
  limit: number
  current_page: number
  last_page: number
  items: Array<T>
}
export type BaseResponse2<T> = {
  status?: boolean
  message?: Message[]
  data?: T
  error?: string
}
export type Pagination2<T> = {
  total: number
  limit: number
  current_page: number
  last_page: number
  items: Array<T>
}
export type BaseResponseNoPagination<T> = {
  status?: boolean
  message?: Message[]
  data?: Array<T>
  error?: string
}
