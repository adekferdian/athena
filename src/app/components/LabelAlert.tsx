import React, {HTMLProps} from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import { KTSVG } from 'src/_metronic/helpers'

interface LabelAlertProps extends HTMLProps<HTMLInputElement> {
  className?: string
  message?: string
  alertType?: 'success' | 'error'
}

const LabelAlert = (props: LabelAlertProps) => {
  return (
    <div className={`${props?.className} d-flex label-alert label-alert-${props?.alertType} align-items-center`}>
      <div className='me-3'>
        {props?.alertType === 'success' && (
          <KTSVG className='svg-icon-2' path='/media/icons/efood/ButtonSuccess.svg' />
        )}
        {props?.alertType === 'error' && (
          <InlineSVG src={'/media/icons/efood/IconWarning.svg'} width={18} height={18} />
        )}
      </div>
      <p className='m-0'>{props?.message}</p>
    </div>
  )
}

export default LabelAlert
