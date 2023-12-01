import React, {FC, useState} from 'react'
import {useEffect} from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import {useLocation} from 'react-router-dom'
import {getErrorMessage} from 'src/app/utils/api-utils'
import {setEmailCustomerVerification} from '../redux/AuthCRUD'
import GuestWrapper from './GuestWrapper'

interface Props {}

const EmailCustomerVerification: FC<Props> = (props) => {
  let query = new URLSearchParams(useLocation().search)
  const token = query.get('t')
  const [message, setMessage] = useState('Email berhasil diverifikasi!')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setEmailCustomerVerification(token)
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
      <GuestWrapper isCustomer>
        <div className='d-flex flex-column align-items-stretch ml-0 mr-0'>
          <div className='text-gray-400 fw-bold fs-4'>
            Sedang memverifikasi email, mohon menunggu...
          </div>
        </div>
      </GuestWrapper>
    )
  }
  return (
    <GuestWrapper isCustomer>
      <div className='d-flex flex-column align-items-stretch'>
        <InlineSVG src={'/media/icons/efood/Email.svg'} className='align-self-center mb-10' />
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>{message}</h1>
          {/* end::Title */}

          {/* begin::Link */}
          {!error && (
            <div className='text-gray-400 fw-bold fs-4'>Silakan kembali ke aplikasi eFOOD</div>
          )}
          {/* end::Link */}
        </div>
      </div>
    </GuestWrapper>
  )
}

export default EmailCustomerVerification
