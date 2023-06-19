/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Modal } from 'react-bootstrap-v5'
// import {KTSVG} from 'src/_metronic/helpers'

type Props = {
  show: boolean
  data: any
  handleClose: () => void
  onDelete: () => void | any
}

const DeleteVoucherModal: React.FC<Props> = ({ show, handleClose, data, onDelete }) => {
  return (
    <Modal aria-hidden='true' tabIndex='-1' show={show} onHide={handleClose} centered>

      <div className='modal-body'>
        <div className='d-flex align-items-center justify-content-center'>
          <h3 className='d-flex align-items-center'>Delete Campaign</h3>
        </div>
        <div className='fv-row mb-10 d-flex align-items-center justify-content-center'>
          <div className='mb-4 text-gray-500 fw-bold'>
            {/* Are you sure want to delete <span className='fw-bolder'>{data?.name}</span> from list
            gender? */}
            Apa kamu yakin akan menghapus Campaign ini?
          </div>
        </div>
        <div className='fv-row mb-10 d-flex align-items-center justify-content-center'>
          <button type='button' onClick={handleClose} className={`btn btn-lg btn-light fw-bolder`} style={{backgroundColor: '#FDE6F3'}}>
            <span className='text-secondary'>Cancel</span>
          </button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            type='button'
            className={`btn btn-lg btn-secondary fw-bolder me-4`}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteVoucherModal
