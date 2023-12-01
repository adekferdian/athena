import axios, {AxiosError} from 'axios'
import {BaseResponse, Message} from 'src/app/models/api.types'

export function getErrorProps(
  props: string[],
  error?: AxiosError<BaseResponse<any>> | unknown
): Record<string, Message> {
  const result: Record<string, Message> = {}
  if (axios.isAxiosError(error))
    (error?.response?.data as BaseResponse<any>)?.message?.forEach((element) => {
      if (props.includes(element.property)) result[element.property] = element
    })
  return result
}

export function getErrorProp(
  prop: string,
  error?: AxiosError<BaseResponse<any>> | unknown
): Message | undefined {
  let result: Message | undefined
  if (axios.isAxiosError(error))
    (error?.response?.data as BaseResponse<any>)?.message?.every((element) => {
      if (element.property === prop) {
        result = element
        return false
      }
      return true
    })
  return result
}

export function hasErrorProp(prop: string, error?: AxiosError<BaseResponse<any>>): boolean {
  let result = false
  error?.response?.data?.message?.every((element) => {
    if (element.property === prop) {
      result = true
      return false
    }
    return true
  })
  return result
}

export function getErrorMessage(
  error: AxiosError<BaseResponse<any>> | unknown,
  withProps: boolean = false,
  defaultValue: string | undefined = undefined
): string {
  let propsError: string | undefined
  try {
    if (withProps) {
      propsError = axios.isAxiosError(error)
        ? (error?.response?.data?.message?.find(() => true)?.constraint?.find(() => true)
            ?.message ||
            error?.response?.data?.message?.find(() => true)?.constraint?.find(() => true)) ??
          defaultValue ??
          error?.response?.data?.error
        : undefined
    } else {
      propsError = axios.isAxiosError(error) ? error?.response?.data?.error : undefined
    }
  } catch (e) {}
  return propsError ?? String(error)
}

export function getFirstError(
  error: AxiosError<BaseResponse<any>> | unknown,
  defaultValue: string | undefined = undefined
): [string, string] {
  let codeError = ''
  let propsError: string | undefined
  try {
    const err = axios.isAxiosError(error) ? error : undefined
    const obj = err?.response?.data?.message?.find(() => true)?.constraint?.find(() => true)
    propsError = obj?.message ?? obj ?? defaultValue ?? err?.response?.data?.error
    codeError = obj?.code ?? ''
  } catch (e) {}
  return [codeError, propsError ?? defaultValue ?? String(error)]
}

export interface ApiErrors {
  generic: string
  detailed: Record<string, string>
}

export function getErrors(error: AxiosError<BaseResponse<any>> | unknown): ApiErrors {
  const detailed: Record<string, string> = {}
  try {
    if (axios.isAxiosError(error))
      error?.response?.data?.message?.forEach((it: any) => {
        const message = it.constraint?.find(() => true)?.message
        if (message) detailed[it.property] = message
      })
  } catch (e) {}
  return {
    generic: axios.isAxiosError(error)
      ? error?.response?.data?.error ?? String(error)
      : String(error),
    detailed,
  }
}

//SHOULD NOT USE THIS EXCEPT YOU KNOW WHY, PREFER ASK BACKEND TO CHANGE THE FORMAT RATHER THAN USING THIS
export function getErrorsDeprecated(error: AxiosError<BaseResponse<any>> | unknown): ApiErrors {
  const detailed: Record<string, string> = {}
  try {
    if (axios.isAxiosError(error))
      error?.response?.data?.message?.forEach((it: any) => {
        const message = it.constraint?.find(() => true)
        if (message) detailed[it.property] = message
      })
  } catch (e) {}
  return {
    generic: axios.isAxiosError(error)
      ? error?.response?.data?.error ?? String(error)
      : String(error),
    detailed,
  }
}

export function getErrorsRaw(error: AxiosError<BaseResponse<any>> | unknown) {
  let detailed: Message[] | undefined
  try {
    if (axios.isAxiosError(error)) detailed = error?.response?.data?.message
  } catch (e) {
    console.log(e)
  }
  return {
    generic: axios.isAxiosError(error)
      ? error?.response?.data?.error ?? String(error)
      : String(error),
    detailed,
  }
}
