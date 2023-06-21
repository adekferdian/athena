/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Modal } from 'react-bootstrap-v5'
import InlineSVG from 'react-inlinesvg/esm'
// import {KTSVG} from 'src/_metronic/helpers'

type Props = {
    show: boolean
    data: any
    handleClose: () => void
    onDelete: () => void | any
}

const DeclineCampaignModal: React.FC<Props> = ({ show, handleClose, data, onDelete }) => {
    return (
        <Modal aria-hidden='true' tabIndex='-1' show={show} onHide={handleClose} centered>

            <div className='modal-body'>
                <div className='d-flex align-items-center justify-content-center'>
                    <InlineSVG
                        src={'/media/icons/decline.svg'}
                    // className='position-absolute translate-middle-y top-50 ms-4 pe-none'
                    />
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <h3 className='d-flex align-items-center'>Decline Campaign</h3>
                </div>
                <div className='fv-row mb-10 d-flex align-items-center justify-content-center'>
                    <div className='mb-4 text-gray-500 fw-bold' style={{ textAlign: 'center' }}>
                        {/* Are you sure want to delete <span className='fw-bolder'>{data?.name}</span> from list
            gender? */}
                        Apa Anda yakin akan menolak Campaign ini?
                        Jika iya, Campaign akan dipindahkan ke Revision Required
                    </div>
                </div>
                <div className='fv-row mb-10 d-flex align-items-center justify-content-center'>
                    <button
                        type='button'
                        onClick={handleClose}
                        className={`btn btn-lg btn-light fw-bolder`}
                        style={{
                            backgroundColor: '#FDE6F3',
                        }}
                    >
                        <span className='text-secondary'>Batal</span>
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        type='button'
                        className={`btn btn-lg btn-secondary fw-bolder me-4`}
                        onClick={onDelete}
                    >
                        Ya, Decline
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default DeclineCampaignModal
