import clsx from 'clsx'
import React from 'react'

interface InputCheckBoxProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  labelClass?: string
  isSolid?: boolean
}

const InputCheckBox = ({isSolid = true, ...props}: InputCheckBoxProps) => {
  return (
    <label className={clsx('form-check form-check-custom', isSolid ? 'form-check-solid' : '')}>
      <input
        className={clsx('form-check-input', !isSolid && props.checked ? 'bg-success border-0' : '')}
        type='checkbox'
        {...props}
      />
      <span className={clsx('form-check-label', props.labelClass)}>{props.label}</span>
    </label>
  )
}

export default InputCheckBox
