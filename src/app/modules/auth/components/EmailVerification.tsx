import React, {FC, useState} from 'react'
import {useEffect} from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import {Link, useLocation} from 'react-router-dom'
import {getErrorMessage} from 'src/app/utils/api-utils'
import {setEmailVerification} from '../redux/AuthCRUD'
import AuthScreens from '../screens'
import GuestWrapper from './GuestWrapper'

interface Props {}

const EmailVerification: FC<Props> = (props) => {
  let query = new URLSearchParams(useLocation().search)
  const token = query.get('t')
  const [message, setMessage] = useState('Email Berhasil di Verifikasi!')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setEmailVerification(token)
      .finally(() => setLoading(false))
      .then((res) => {
        setMessage('Email Berhasil di Verifikasi!')
      })
      .catch((e) => {
        setError(true)
        setMessage(getErrorMessage(e, true, 'Terjadi kesalahan saat verifikasi email'))
      })
  }, [token])

  if (loading) {
    return (
      <GuestWrapper>
        <div className='d-flex flex-column align-items-stretch ml-0 mr-0'>
          <div className='text-gray-400 fw-bold fs-4'>
            Sedang memverifikasi email, mohon menunggu...
          </div>
        </div>
      </GuestWrapper>
    )
  }
  return (
    <GuestWrapper>
      <div className='d-flex flex-column align-items-stretch'>
        <InlineSVG src={'/media/icons/efood/IconMail.svg'} className='align-self-center mb-10' />
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>{message}</h1>
          {/* end::Title */}

          {/* begin::Link */}
          {!error && (
            <div className='text-gray-400 fw-bold fs-4'>
              Silakan kembali ke login untuk melanjutkan
            </div>
          )}
          {/* end::Link */}
        </div>
        <Link to={AuthScreens.LOGIN_EMAIL.PATH} className='btn btn-lg btn-secondary w-100 mb-5'>
          <span className='indicator-label'>Kembali ke Login</span>
        </Link>
      </div>
    </GuestWrapper>
  )
}

export default EmailVerification
