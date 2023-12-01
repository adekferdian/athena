/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useFormik} from 'formik'
import React, {useCallback, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {RootState} from 'src/setup'
import {KTSVG} from 'src/_metronic/helpers'
import * as Yup from 'yup'
import {updateEmail, updateEmailOtp} from '../../auth/redux/AuthCRUD'
import AuthRedux from '../../auth/redux/AuthRedux'

type Props = {
  show: boolean
  handleClose: () => void
  handleSuccess: () => void
}

type RequestProps = {
  onSuccess: (email: string) => void
  onProcessing: (processing: boolean) => void
  onBack: () => void
}

type ValidateProps = {
  email: string
  onSuccess: () => void
  onProcessing: (processing: boolean) => void
  onBack: () => void
}

const requestInitial = {
  email: '',
}

const requestSchema = Yup.object().shape({
  email: Yup.string().email('Format email salah').required('Kolom wajib diisi'),
})

const validateInitial = {
  otp: '',
}

const validateSchema = Yup.object().shape({
  otp: Yup.string()
    .min(4, 'Kolom wajib diisi')
    .max(4, 'Kolom wajib diisi')
    .required('Kolom wajib diisi'),
})

const EditEmailRequest: React.FC<RequestProps> = ({onSuccess, onProcessing, onBack}) => {
  const email = useSelector<RootState>(({auth}) => auth.user?.email, shallowEqual) as
    | string
    | undefined
    | null
  const formik = useFormik({
    initialValues: requestInitial,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: requestSchema,
    onSubmit: (values, {setStatus, setSubmitting, setErrors}) => {
      onProcessing(true)
      updateEmail(values.email)
        .then(() => {
          onProcessing(false)
          setSubmitting(false)
          onSuccess(values.email)
        })
        .catch((e) => {
          onProcessing(false)
          setSubmitting(false)
          setStatus(e?.response?.data?.message[0]?.constraint[0]?.message)
          setErrors({email: e?.response?.data?.message[0]?.constraint[0]?.message})
        })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='modal-body'>
        <div className='fv-row mb-10'>
          <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
            Email saat ini
          </label>
          <input
            placeholder=''
            value={email ?? ''}
            className={clsx('form-control form-control-lg')}
            type='text'
            disabled
            autoComplete='off'
          />
        </div>
        <div className='fv-row mb-10'>
          <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Email Baru*</label>
          <input
            placeholder=''
            {...formik.getFieldProps('email')}
            className={clsx('form-control form-control-lg form-control-solid text-gray-900', {
              'is-invalid': formik.status || (formik.touched.email && formik.errors.email),
            })}
            type='email'
            name='email'
            autoComplete='off'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container text-danger'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          )}
        </div>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          className={`btn btn-lg btn-light fw-bolder me-4`}
          disabled={formik.isSubmitting}
          onClick={onBack}
        >
          Kembali
        </button>{' '}
        <button
          type='submit'
          className='btn btn-lg btn-secondary fw-bolder'
          disabled={formik.isSubmitting}
        >
          <span className='indicator-label'>Ubah Email</span>
          {formik.isSubmitting && (
            <span className='indicator-progress'>
              Mohon Tunggu...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}

const EditEmailValidate: React.FC<ValidateProps> = ({email, onSuccess, onProcessing, onBack}) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: validateInitial,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: validateSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      onProcessing(true)
      updateEmailOtp(email, values.otp)
        .then(({data}) => {
          onProcessing(false)
          setSubmitting(false)
          dispatch(AuthRedux.actions.setUser(data.data))
          onSuccess()
        })
        .catch(() => {
          onProcessing(false)
          setSubmitting(false)
          setStatus('error')
        })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='modal-body'>
        <div className='mb-10'>
          Kami telah mengirim link verifikasi ke email baru Anda. Silahkan cek email dan klik link
          untuk melakukan verifikasi ubah email.
        </div>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          className={`btn btn-lg btn-secondary fw-bolder`}
          onClick={() => {
            onBack()
            onSuccess()
          }}
        >
          Okay
        </button>
      </div>
    </form>
  )
}

const EditEmailModal: React.FC<Props> = ({show, handleClose, handleSuccess}) => {
  const [newEmail, setNewEmail] = useState<string>()
  const [processing, setProcessing] = useState(false)
  const close = useCallback(() => {
    if (!processing) handleClose()
  }, [processing])
  useEffect(() => {
    if (show) setNewEmail(undefined)
  }, [show])

  return (
    <Modal aria-hidden='true' tabIndex='-1' show={show} onHide={close} centered>
      <div className='modal-header d-flex align-items-center justify-content-between'>
        <h3 className='d-flex align-items-center'>
          {newEmail ? 'Verifikasi Ubah Data' : 'Ubah Email'}
        </h3>

        {/* begin::Close */}
        <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={close}>
          <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2' />
        </div>
        {/* end::Close */}
      </div>

      {newEmail ? (
        <EditEmailValidate
          email={newEmail}
          onSuccess={() => {
            close()
            handleSuccess()
          }}
          onProcessing={setProcessing}
          onBack={() => setNewEmail(undefined)}
        />
      ) : (
        <EditEmailRequest
          onSuccess={(email) => {
            setNewEmail(email)
            handleSuccess()
          }}
          onProcessing={setProcessing}
          onBack={close}
        />
      )}
    </Modal>
  )
}

export default EditEmailModal
