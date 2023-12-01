import {FileRejection} from 'react-dropzone'
import {PageToasts} from '../components/ToastComponent'

export const isNumeric = (text: string) => Boolean(text.match(/^[0-9]+$/))
export const trimNonNumeric = (text: string) => text.replace(/[^0-9]/g, '')
export const trimPhoneNumber = (text: string, prefix: string) => {
  let result = text
  if (text.startsWith('+') && text.length >= prefix.length) result = text.slice(prefix.length + 1)
  if (result.startsWith('62')) {
    result = result.slice(2)
  }
  if (result[0] === '0') {
    result = result.slice(1)
  }
  return trimNonNumeric(result)
}

export const needAddPrefix = (text: string) => !text.startsWith('62') || text.startsWith('0')
export const addPhonePrefix = (text: string) => {
  let result = text
  if (result[0] === '0') {
    result = result.slice(1)
  }
  return `62${trimNonNumeric(result)}`
}

export const trimPhoneBasic = (text: string) => {
  let result = text
  if (result.startsWith('62')) {
    result = result.slice(2)
  }
  return trimNonNumeric(result)
}

export const addThousandSeparator = (text: string) => text.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const formatMoney = (number?: number, currency = '') =>
  `${number && number < 0 ? '-' : ''}${currency}${Math.abs(number ?? 0).toLocaleString('id-ID')}`

export const formatRupiah = (number?: number, invalid?: boolean, currency = 'Rp') => {
  if (invalid) return `${currency}-`
  return formatMoney(number, currency)
}

export const formatRupiahSpaced = (number?: number, invalid?: boolean, currency = 'Rp ') =>
  formatRupiah(number, invalid, currency)

//maxSize: in MB, dimension: in pixel
export const validateImage = ({
  image,
  rejects,
  field,
  preview_field,
  setFieldTouched,
  setFieldError,
  setFieldValue,
  maxSize,
  dimension,
}: {
  image?: File
  rejects?: FileRejection[]
  field: string
  preview_field?: string
  setFieldTouched?: Function
  setFieldError: Function
  setFieldValue: Function
  maxSize?: number
  dimension?: {
    width: number
    height: number
  }
}) => {
  if (!image) {
    if (rejects && rejects.length > 0) setFieldError(field, `File type not supported`)
    return
  }
  if (maxSize && image.size / 1024 / 1024 > maxSize) {
    setFieldError(field, `Max upload size is ${maxSize}MB`)
    return
  }
  const _URL = window.URL || window.webkitURL
  const img = new Image()
  var objectUrl = _URL.createObjectURL(image)
  img.onload = async function () {
    if (
      dimension &&
      (Number((this as HTMLObjectElement).width) !== dimension.width ||
        Number((this as HTMLObjectElement).height) !== dimension.height)
    ) {
      setFieldError(field, `Image size not ${dimension.width}x${dimension.height}`)
    } else {
      setFieldError(field, undefined)
      if (setFieldTouched) setFieldTouched(field, true)
      await setFieldValue(preview_field, objectUrl)
      await setFieldValue(field, image, true)
    }
    img.remove()
  }
  img.src = objectUrl
}

export const validateFile = ({
  file,
  rejects,
  field,
  preview_field,
  setFieldError,
  setFieldValue,
  maxSize,
}: {
  file?: File
  rejects?: FileRejection[]
  field: string
  preview_field?: string
  setFieldError: Function
  setFieldValue: Function
  maxSize?: number
}) => {
  if (!file) {
    if (rejects && rejects.length > 0) setFieldError(field, `File type not supported`)
    return
  }
  if (maxSize && file.size / 1024 / 1024 > maxSize) {
    setFieldError(field, `Max upload size is ${maxSize}MB`)
    return
  }
  const _URL = window.URL || window.webkitURL
  var objectUrl = _URL.createObjectURL(file)
  setFieldValue(field, file)
  setFieldValue(preview_field, objectUrl)
  return objectUrl
}

export const appendFormArray = (
  formData: FormData,
  name: string,
  props: (string | undefined)[]
) => {
  props.forEach((value) => {
    if (value) formData.append(`${name}[]`, value)
  })
}

export const appendAllFormData = (
  formData: FormData,
  names: {key: string; name: string}[],
  inputs: Record<any, any>
) => {
  names.forEach((name) => {
    const data = inputs[name.key]
    if (data || typeof data === 'boolean') {
      if (Array.isArray(data)) appendFormArray(formData, name.name, data)
      else formData.append(name.name, data)
    }
  })
}

export const deleteFilesFormData = (
  formData: FormData,
  names: {key?: string; name: string}[],
  inputs: Record<any, any>,
  delete_field: string = 'delete_files'
) => {
  names.forEach((name) => {
    if (!inputs[name.name] && (!name.key || !!inputs[name.key])) {
      formData.append(`${delete_field}[]`, name.name)
    }
  })
}

export const appendAllRecordData = (
  formData: Record<string, string>,
  names: {key: string; name: string}[],
  inputs: Record<any, any>
) => {
  names.forEach((name) => {
    const data = inputs[name.key]
    if (data || typeof data === 'boolean') {
      formData[name.name] = data
    }
  })
}

export const copyText = (text: string, listener: (toast: PageToasts) => void) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      listener({scheme: 'info', text: 'Text copied.', fixed: true})
    })
    .catch(() => {
      listener({scheme: 'danger', text: 'Failed to copy text.', fixed: true})
    })
}

export const openWhatsapp = (phone: string) => {
  window.open(
    `https://api.whatsapp.com/send?phone=62${encodeURI(trimPhoneNumber(phone, '62'))}`,
    '_blank'
  )
}

export const createBase64 = (file: File | Blob) => {
  const _URL = window.URL || window.webkitURL
  return _URL.createObjectURL(file)
}

export const validateBlob = async ({
  result,
  error,
  field,
  preview_field,
  setFieldTouched,
  setFieldError,
  setFieldValue,
  png = true,
}: {
  result?: Blob | null
  error?: any
  field: string
  preview_field?: string
  setFieldTouched?: Function
  setFieldError: Function
  setFieldValue: Function
  png?: boolean
}) => {
  if (error || !result) {
    setFieldError(field, error)
    if (setFieldTouched) setFieldTouched(field, true)
    return
  }
  await setFieldValue(field, new File([result], png ? 'image.png' : 'image.jpg'))
  await setFieldValue(preview_field, createBase64(result), true)
}
