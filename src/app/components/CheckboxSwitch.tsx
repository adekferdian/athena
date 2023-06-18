import clsx from 'clsx'
import React from 'react'

interface CheckboxSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelClass?: string
  wrapperClass?: string
}

const CheckboxSwitch = (props: CheckboxSwitchProps) => {
  return (
    <div className={`form-check form-switch form-check-custom form-check-solid ${props?.wrapperClass}`}>
      <input className='form-check-input' type='checkbox' {...props} />
      {props.label && (
        <label className={clsx('form-check-label', props.labelClass)}>{props.label}</label>
      )}
    </div>
  )
}

export default CheckboxSwitch
