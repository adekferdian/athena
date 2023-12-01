import clsx from 'clsx'
import React, {ChangeEvent, useCallback, useEffect} from 'react'
import {addPhonePrefix, needAddPrefix, trimPhoneBasic} from '../utils/input-utils'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  containerClass?: string
  onChangeValue: (value: string) => void
  value: string
}

const InputPhone: React.FC<Props> = ({
  containerClass,
  value,
  className,
  onChangeValue,
  onChange,
  ...props
}) => {
  const setValue = useCallback(
    (trimmed: string) => {
      if (onChangeValue) onChangeValue(trimmed)
    },
    [onChangeValue]
  )

  const onChangeWrapper = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(addPhonePrefix(e.currentTarget.value))
    },
    [setValue]
  )

  useEffect(() => {
    if (needAddPrefix(value)) setValue(addPhonePrefix(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={clsx('position-relative d-flex align-items-center w-100', containerClass)}>
      <div
        className={clsx(
          'position-absolute ms-4 pe-none fs-5',
          props.disabled ? 'text-gray-500' : 'text-gray-700'
        )}
        style={{fontWeight: 500}}
      >
        +62
      </div>
      <input
        value={trimPhoneBasic(value)}
        className={clsx('ps-14', className)}
        {...props}
        onChange={onChangeWrapper}
        autoComplete='off'
      />
    </div>
  )
}

export default InputPhone
