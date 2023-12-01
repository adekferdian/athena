import React, {MouseEventHandler} from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import {KTSVG} from 'src/_metronic/helpers'

interface AlertErrorProps {
  message?: string
  handleClose: MouseEventHandler<HTMLDivElement>
}

const AlertError = ({message, handleClose}: AlertErrorProps) => {
  if (!message) return null

  return (
    <div
      className='alert_error position-absolute'
      role='alert'
      style={{left: 0, top: 0, right: 0, zIndex: 2}}
    >
      <div className='d-flex align-items-center'>
        <InlineSVG src={'/media/icons/efood/IconWarning.svg'} style={{marginRight: 16}} />
        <p>{message}</p>
      </div>
      <div className='btn btn-icon btn-sm btn-transparent' onClick={handleClose}>
        <KTSVG className='svg-icon-2' path='/media/icons/efood/ButtonClose.svg' />
      </div>
    </div>
  )
}

export default AlertError
