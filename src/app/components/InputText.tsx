import React, {HTMLProps} from 'react'

interface InputTextProps extends HTMLProps<HTMLInputElement> {
  label: string
  wrapperClass?: string
}

const InputText = (props: InputTextProps) => {
  return (
    <div>
      <label className='form-label'>{props.label}</label>
      <input className='form-control form-control-solid' {...props} />
    </div>
  )
}

export default InputText
