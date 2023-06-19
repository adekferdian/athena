import React, {HTMLProps} from 'react'
import InputRadio from './InputRadio'

interface RadioButtonCardProps extends HTMLProps<HTMLInputElement> {
  label?: string
  description?: string
  checked?: boolean
  onClick?: () => void
}

const RadioButtonCard = (props: RadioButtonCardProps) => {
  return (
    <div
      className="d-flex form-card py-4 ps-5 cursor-pointer w-100"
      onClick={props?.onClick}
    >
      <div className="w-100">
        <p className="mb-2"><b>{props?.label}</b></p>
        <p className="text-gray-600 m-0 pe-4">
          {props?.description}
        </p>
      </div>
      <InputRadio
        checked={props?.checked}
      />
    </div>
  )
}

export default RadioButtonCard
