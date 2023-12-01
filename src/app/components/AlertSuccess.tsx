import React, {MouseEventHandler} from 'react'
import {KTSVG} from 'src/_metronic/helpers'

interface AlertSuccessProps {
  message?: string
  handleClose: MouseEventHandler<HTMLDivElement>
}

const AlertSuccess = ({message, handleClose}: AlertSuccessProps) => {
  if (!message) return null

  return (
    <div
      className='alert_success position-absolute'
      role='alert'
      style={{left: 0, top: 0, right: 0, zIndex: 2}}
    >
      <div className='d-flex align-items-center'>
        <div className='btn btn-icon btn-sm btn-transparent'>
          <KTSVG className='svg-icon-2' path='/media/icons/efood/ButtonSuccess.svg' />
        </div>
        <p>{message}</p>
      </div>
      <div className='btn btn-icon btn-sm btn-transparent' onClick={handleClose}>
        <KTSVG className='svg-icon-2' path='/media/icons/efood/ButtonClose.svg' />
      </div>
    </div>
  )
}

export default AlertSuccess
