import clsx from 'clsx'
import React, {ChangeEvent, useCallback, useEffect} from 'react'
import {addThousandSeparator, isNumeric, trimNonNumeric} from '../utils/input-utils'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  containerClass?: string
  prefixClass?: string
  onChangeValue: (value: string, first?: boolean) => void
  value: string
}

const InputMoney: React.FC<Props> = ({
  containerClass,
  prefixClass,
  value,
  className,
  onChangeValue,
  onChange,
  ...props
}) => {
  const setValue = useCallback(
    (trimmed: string, first?: boolean) => {
      if (onChangeValue) onChangeValue(trimmed, first)
    },
    [onChangeValue]
  )

  const onChangeWrapper = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(trimNonNumeric(e.currentTarget.value))
    },
    [setValue]
  )

  useEffect(() => {
    if (!isNumeric(value)) setValue(trimNonNumeric(value), true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="d-flex flex-column">
      <label className='form-label fs-7'>{props.label}</label>
      <div className={clsx('position-relative d-flex align-items-center w-100', containerClass)}>
        <div
          className={clsx(
            prefixClass,
            'position-absolute pe-none fs-5 prefix-input',
            props.disabled ? 'text-gray-500' : 'text-gray-700',
          )}
        >
          Rp
        </div>
        <input
          value={addThousandSeparator(value)}
          className={className}
          style={{paddingLeft: '45px'}}
          {...props}
          onChange={onChangeWrapper}
        />
      </div>
    </div>
  )
}

export default InputMoney
