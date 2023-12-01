import clsx from 'clsx'
import React, {FC} from 'react'

interface Props {
  label?: string
  value?: string | number | undefined
  placeholder?: string
  type?: string
  disabled?: boolean
  containerStyle?: string
  inputStyle?: string
  name?: string
  autoComplete?: string
  error?: string
  onChange?: (v: any) => void
}

const CustomInput: FC<Props> = ({containerStyle, error, ...props}) => {
  return (
    <div className={`mb-5 ${containerStyle}`}>
      <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>{props.label}</label>
      <input
        className={clsx(
          'form-control form-control-lg',
          props.disabled ? 'text-gray-500' : 'form-control-solid text-gray-800',
          props.inputStyle
        )}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        {...props}
      />
      {error && (
        <div className='fv-plugins-message-container text-danger'>
          <span role='alert'>{error}</span>
        </div>
      )}
    </div>
  )
}

CustomInput.defaultProps = {
  type: 'text',
  disabled: false,
}

export default CustomInput
