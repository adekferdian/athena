import clsx from 'clsx'
import React, {ChangeEvent, useCallback, useEffect} from 'react'
import InlineSVG from 'react-inlinesvg/esm'

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  containerClass?: string
  onChangeValue: (value: number, first?: boolean) => void
  max?: number
  value?: number
  isInvalid?: boolean
}

const InputPlusMinus: React.FC<Props> = ({
  containerClass,
  value,
  className,
  onChangeValue,
  onChange,
  isInvalid,
  disabled,
  max = 2000000000,
  ...props
}) => {
  const setValue = useCallback(
    (data: number, first?: boolean) => {
      if (onChangeValue) onChangeValue(data, first)
    },
    [onChangeValue]
  )

  const onChangeWrapper = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.currentTarget.value.replace(/[^0-9.]/g, ''))
      if (isNaN(newValue) || newValue < 1) setValue(1)
      else if (newValue > max) setValue(max)
      else setValue(newValue)
    },
    [setValue]
  )

  const addQuantity = useCallback(
    (qty: number) => {
      if (isNaN(Number(value))) setValue(1)
      else setValue(Number(value) + qty)
    },
    [value, setValue]
  )

  useEffect(() => {
    if (isNaN(Number(value))) setValue(1, true)
  }, [])
  return (
    <div className={clsx('position-relative d-flex align-items-center w-100', containerClass)}>
      {value && value > 1 && (
        <InlineSVG
          src={'/media/icons/efood/IconMinus.svg'}
          className='user-select-none position-absolute'
          style={{cursor: 'pointer', left: 12}}
          onClick={disabled ? undefined : () => addQuantity(-1)}
        />
      )}
      <input
        value={String(value)}
        className={clsx(className, {
          'is-invalid': isInvalid,
        })}
        style={{paddingLeft: 44, paddingRight: 44}}
        disabled={disabled}
        {...props}
        onChange={onChangeWrapper}
      />
      {value && value < max && (
        <InlineSVG
          src={'/media/icons/efood/IconPlus.svg'}
          className='user-select-none position-absolute'
          style={{cursor: 'pointer', right: 12}}
          onClick={disabled ? undefined : () => addQuantity(1)}
        />
      )}
    </div>
  )
}

export default InputPlusMinus
