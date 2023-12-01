import React, {useCallback} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {KTSVG} from 'src/_metronic/helpers'

type GenericSaveModalProps = {
  show: boolean
  processing: boolean
  handleClose: () => void
  handleContinue: () => void
}

const GenericSaveModal: React.FC<GenericSaveModalProps> = ({
  show,
  processing,
  handleClose,
  handleContinue,
}) => {
  const closeFn = useCallback(() => {
    if (!processing) handleClose()
  }, [processing])

  return (
    <Modal aria-hidden='true' tabIndex='-1' show={show} onHide={closeFn} centered scrollable>
      <div className='modal-header d-flex align-items-center justify-content-between'>
        <h3 className='d-flex align-items-center'>Simpan Data</h3>

        {/* begin::Close */}
        <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={closeFn}>
          <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body pb-5'>
        <div>Simpan perubahan data yang telah dibuat?</div>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          className={`btn btn-lg btn-light fw-bolder me-4`}
          disabled={processing}
          onClick={closeFn}
        >
          Kembali
        </button>{' '}
        <button
          onClick={processing ? undefined : handleContinue}
          disabled={processing}
          className={`btn btn-lg btn-secondary fw-bolder`}
        >
          <span className='indicator-label'>Simpan</span>
        </button>
      </div>
    </Modal>
  )
}

export default GenericSaveModal
