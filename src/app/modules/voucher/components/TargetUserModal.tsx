/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Modal } from 'react-bootstrap-v5'
import { KTSVG } from 'src/_metronic/helpers'

type Props = {
    show: boolean
    data: any
    handleClose: () => void
    onSave: () => void | any
}

const TargetUserModal: React.FC<Props> = ({ show, handleClose, data, onSave }) => {
    return (
        <Modal aria-hidden='true' tabIndex='-1' show={show} onHide={handleClose} centered>
            <div className='modal-header d-flex align-items-center justify-content-between'>
                <h3 className='d-flex align-items-center'>Add User</h3>

                {/* begin::Close */}
                <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={handleClose}>
                    <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2' />
                </div>
                {/* end::Close */}
            </div>
    
            <div className='modal-body'>
                <div className='fv-row mb-10'>
                    <div className='mb-4'>
                        Are you sure want to delete <span className='fw-bolder'>{data?.name}</span> from list
                        gender?
                    </div>
                </div>
            </div>
            <div className='modal-footer'>
                <div className='fv-row mb-10 d-flex align-items-center justify-content-end'>
                    <button type='button' onClick={handleClose} className={`btn btn-lg btn-light fw-bolder`} style={{ backgroundColor: '#FDE6F3' }}>
                        <span className='text-secondary'>Cancel</span>
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        type='button'
                        className={`btn btn-lg btn-secondary fw-bolder me-4`}
                        onClick={onSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default TargetUserModal
