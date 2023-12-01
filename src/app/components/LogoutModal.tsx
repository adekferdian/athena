/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Modal} from 'react-bootstrap-v5'
import {KTSVG} from 'src/_metronic/helpers'

type Props = {
  show: boolean
  handleClose: () => void
  handleContinue: () => void
}

const LogoutModal: React.FC<Props> = ({show, handleClose, handleContinue}) => {
  return (
    <Modal aria-hidden='true' tabIndex='-1' show={show} onHide={handleClose} centered>
      <div className='modal-header d-flex align-items-center justify-content-between'>
        <h3 className='d-flex align-items-center'>Logout</h3>

        {/* begin::Close */}
        <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={handleClose}>
          <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body'>
        <div className='fv-row mb-10'>
          <div className='mb-4'>Apakah Anda yakin ingin keluar/logout?</div>
        </div>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          className={`btn btn-lg btn-light fw-bolder me-4`}
          onClick={handleClose}
        >
          Kembali
        </button>{' '}
        <button onClick={handleContinue} className={`btn btn-lg btn-secondary fw-bolder`}>
          <span className='indicator-label'>Logout</span>
        </button>
      </div>
    </Modal>
  )
}

export default LogoutModal
