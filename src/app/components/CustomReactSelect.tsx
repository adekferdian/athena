import clsx from 'clsx'
import React from 'react'
import {components, ControlProps, GroupTypeBase, OptionTypeBase} from 'react-select'

const Control = <
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
  GroupType extends GroupTypeBase<OptionType> = GroupTypeBase<OptionType>
>({
  children,
  isFocused,
  isDisabled,
  ...rest
}: ControlProps<OptionType, IsMulti, GroupType>) => (
  <components.Control
    className={clsx('form-control border-0 form-control-lg-select form-control-solid', {
      focus: isFocused,
      disabled: isDisabled,
    })}
    isFocused
    isDisabled
    {...rest}
  >
    {children}
  </components.Control>
)

const IndicatorSeparator = () => null

export interface LabelValueProps {
  label?: string
  value?: string
}

export interface LabelValuePropsAny {
  label?: string
  value?: any
}

export const ReactSelectMetronicTheme = {
  Control,
  IndicatorSeparator,
}
