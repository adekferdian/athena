import clsx from 'clsx'
import React, {ChangeEvent, useCallback, useEffect} from 'react'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  containerClass?: string
  onChangeValue: (value: string, first?: boolean) => void
  value: string
  isInvalid?: boolean
}

const InputPercentage: React.FC<Props> = ({
  containerClass,
  value,
  className,
  onChangeValue,
  onChange,
  isInvalid,
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
      setValue(e.currentTarget.value.replace(/[^0-9]/g, ''))
    },
    [setValue]
  )

  useEffect(() => {
    if (isNaN(Number(value))) setValue('', true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="d-flex flex-column">
      <label className='form-label fs-7'>{props.label}</label>
      <div className={clsx('position-relative d-flex align-items-center w-100', containerClass)}>
        <div
          className={clsx(
            'position-absolute pe-none fs-5',
            props.disabled ? 'text-gray-500' : 'text-gray-700',
            isInvalid ? 'me-11' : 'me-4'
          )}
          style={{fontWeight: 500, right: 0}}
        >
          %
        </div>
        <input
          value={value}
          className={clsx(className, {
            'is-invalid': isInvalid,
          })}
          style={{paddingRight: isInvalid ? 50 : 35}}
          {...props}
          onChange={onChangeWrapper}
        />
      </div>
    </div>
  )
}

export default InputPercentage
