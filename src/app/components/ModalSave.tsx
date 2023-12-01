import {MouseEventHandler} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {KTSVG} from 'src/_metronic/helpers'

interface ModalSaveProps {
  show: boolean
  handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  handleProcess: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  loading: boolean
}

const ModalSave = ({show, handleClose, handleProcess, loading}: ModalSaveProps) => {
  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog-centered mw-500px h-auto'
      show={show}
      onHide={handleClose}
      centered
    >
      <div className='modal-header pt-8 pb-5 px-10 d-flex justify-content-between border-bottom-1'>
        {/* begin::Close */}
        <h1>Simpan Data</h1>
        <div className='btn btn-icon btn-sm btn-transparent' onClick={handleClose}>
          <KTSVG className='svg-icon-2' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
        {/* end::Close */}
      </div>
      <div className=''></div>

      <div className='modal-body px-10 py-10'>
        <span>Simpan perubahan data yang telah dibuat</span>
      </div>

      <div className='modal-footer'>
        <div className='d-flex pb-lg-0'>
          <button
            type='button'
            id='kt_login_password_reset_form_cancel_button'
            className='btn btn-lg btn-light fw-bolder d-block me-4'
            onClick={handleClose}
            disabled={loading}
          >
            Kembali
          </button>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-secondary fw-bolder'
            onClick={handleProcess}
            disabled={loading}
          >
            Simpan
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalSave
