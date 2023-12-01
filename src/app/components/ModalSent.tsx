import {MouseEventHandler} from 'react'
import {Modal} from 'react-bootstrap-v5'
import InlineSVG from 'react-inlinesvg/esm'

export interface SentDataModel {
  title: string
  description: string
}

interface ModalStoreCloseModel {
  show: boolean
  handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  data?: SentDataModel
}

export const ModalSent = ({show, handleClose, data}: ModalStoreCloseModel) => {
  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog-centered mw-500px h-auto'
      show={show}
      onHide={handleClose}
    >
      <div className='modal-body px-10 py-10'>
        <div className='text-center mb-10'>
          <InlineSVG src='/media/icons/efood/IconPlane.svg' />
        </div>
        <div className='text-center mb-10'>
          <h1>{data?.title}</h1>
          <span className='fs-6 text-gray-600 fw-bold'>{data?.description}</span>
        </div>
        <button
          type='button'
          id='kt_login_password_reset_form_cancel_button'
          className='btn btn-lg btn-secondary fw-bolder min-w-100'
          onClick={handleClose}
        >
          Okay
        </button>
      </div>
    </Modal>
  )
}
