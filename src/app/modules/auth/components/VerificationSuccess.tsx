import React, {FC} from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import {Link} from 'react-router-dom'
import AuthScreens from '../screens'
import GuestWrapper from './GuestWrapper'

interface Props {}

const VerificationSuccess: FC<Props> = (props) => {
  return (
    <GuestWrapper>
      <div className='d-flex flex-column align-items-stretch'>
        <InlineSVG src={'/media/icons/efood/IconMail.svg'} className='align-self-center mb-10' />
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Password Berhasil Diubah</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>
            Silakan kembali ke login untuk melanjutkan
          </div>
          {/* end::Link */}
        </div>
        <Link to={AuthScreens.LOGIN_EMAIL.PATH} className='btn btn-lg btn-secondary w-100 mb-5'>
          <span className='indicator-label'>Kembali ke Login</span>
        </Link>
      </div>
    </GuestWrapper>
  )
}

export default VerificationSuccess
