import React, {useEffect} from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from 'src/_metronic/helpers'
import AuthScreens from '../screens'

const GuestWrapper: React.FC<{isCustomer?: boolean}> = ({isCustomer, children}) => {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/background/bg-3.jpg')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        {isCustomer ? (
          <div style={{position: 'absolute', top: 100}}>
            <InlineSVG
              src={'/media/icons/efood/IconEfoodHorizontal.svg'}
              className='align-self-center'
            />
          </div>
        ) : (
          <Link to={AuthScreens.LOGIN_EMAIL.PATH} className='mb-12 fs-1 text-dark fw-bolder'>
            Zeus
          </Link>
        )}
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>{children}</div>
      </div>
    </div>
  )
}

export default GuestWrapper
