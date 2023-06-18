import React, {HTMLProps} from 'react'

interface InputTextProps extends HTMLProps<HTMLInputElement> {
  label: string
  wrapperClass?: string
  showCharacterCount?: boolean
  maxLength?: number
  value?: string
}

const InputText = (props: InputTextProps) => {
  return (
    <div>
      <label className='form-label fs-7'>{props.label}</label>
      <input className='form-control' value={props.value} {...props} />
      {props?.showCharacterCount && (
        <p className='text-end mb-0 mt-2 text-gray-600 fs-7'>
          {props?.value?.length}/{props?.maxLength || 0} Characters
        </p>
      )}
    </div>
  )
}

export default InputText
