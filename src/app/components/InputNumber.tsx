import React, {HTMLProps} from 'react'

interface InputNumberProps extends HTMLProps<HTMLInputElement> {
  label: string
  wrapperClass?: string
}

const InputNumber = (props: InputNumberProps) => {
  return (
    <div>
      <label className='form-label fs-7'>{props.label}</label>
      <input
        type='number'
        className='form-control'
        onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
        {...props}
      />
    </div>
  )
}

export default InputNumber
