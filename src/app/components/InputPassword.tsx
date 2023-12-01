import React, {HTMLProps, useState} from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import {Link} from 'react-router-dom'

interface InputPasswordProps extends HTMLProps<HTMLInputElement> {
  forgotLink?: string
}

const InputPassword = (props: InputPasswordProps) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div className='d-flex'>
        <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
          {props.label ? props.label : 'Password'}
        </label>
        {props.forgotLink && (
          <Link to={props.forgotLink} className='fs-6 fw-bolder link-info' tabIndex={5}>
            Lupa Password
          </Link>
        )}
      </div>
      <div className='position-relative'>
        <input
          type={visible ? 'text' : 'password'}
          name='password'
          className='form-control form-control-lg form-control-solid'
          style={{paddingRight: 42}}
          {...props}
        />
        <InlineSVG
          src={`/media/icons/efood/${visible ? 'IconEyeOn' : 'IconEyeOff'}.svg`}
          className='position-absolute'
          style={{right: 7, top: 7, cursor: 'pointer'}}
          onClick={() => setVisible(!visible)}
        />
      </div>
    </>
  )
}

export default InputPassword
