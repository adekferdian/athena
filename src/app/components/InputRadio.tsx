import clsx from 'clsx'
import React from 'react'

interface InputRadioProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  labelClass?: string
  description?: string
  descriptionClass?: string
  wrapperClass?: string
  onClick?(): void
}

const InputRadio = (props: InputRadioProps) => {
  return (
    <div
      className={`form-check form-check-custom form-check-solid ${props?.wrapperClass}`}
      onClick={props?.onClick}
    >
      <input className='form-check-input' type='radio' {...props} />
      <div className='d-flex flex-column align-items-start ms-3'>
        {props?.label && (
          <label className={clsx('form-check-label ms-0', props.labelClass)}>{props?.label}</label>
        )}
        {props?.description && (
          <small className={clsx('text-gray-600', props.descriptionClass)}>
            {props.description}
          </small>
        )}
      </div>
    </div>
  )
}

export default InputRadio
