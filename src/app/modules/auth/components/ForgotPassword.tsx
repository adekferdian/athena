import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../redux/AuthCRUD'
import AuthScreens from '../screens'
import InlineSVG from 'react-inlinesvg/esm'
import {getTitle} from 'src/app/utils/title-utils'
import InputPhone from 'src/app/components/InputPhone'

const initialValues = {
  phone: '',
}

const forgotPasswordSchema = Yup.object().shape({
  phone: Yup.string().min(5, 'Kolom wajib diisi').required('Kolom wajib diisi'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        requestPassword(values.phone)
          .then(({data: {result}}) => {
            setHasErrors(false)
            setLoading(false)
          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('No. HP tidak terdaftar')
          })
      }, 1000)
    },
  })

  useEffect(() => {
    document.title = getTitle('Lupa Password')
  }, [])

  return (
    <>
      {hasErrors === false ? (
        <div className='d-flex flex-column align-items-stretch'>
          <InlineSVG src={'/media/icons/efood/IconMail.svg'} className='align-self-center mb-10' />
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark mb-3 fs-2'>Cek Whatsapp Anda</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-gray-400 fw-bold fs-4'>
              Kami telah mengirim link reset password ke no. HP Anda.
            </div>
            {/* end::Link */}
          </div>
          <Link to={AuthScreens.LOGIN_EMAIL.PATH} className='btn btn-lg btn-secondary w-100 mb-5'>
            <span className='indicator-label'>Kembali ke Login</span>
          </Link>
        </div>
      ) : (
        <form
          className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
          noValidate
          id='kt_login_password_reset_form'
          onSubmit={formik.handleSubmit}
        >
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark mb-3 fs-2'>Lupa Password?</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-gray-400 fw-bold fs-4'>
              Masukkan no. HP terdaftar untuk reset password
            </div>
            {/* end::Link */}
          </div>

          {/* begin::Title */}
          {hasErrors === true && (
            <div
              className='d-flex align-items-center rounded py-4 px-5 mb-10'
              style={{backgroundColor: 'rgba(240, 66, 108, 0.1)'}}
            >
              <InlineSVG src={'/media/icons/efood/IconWarning.svg'} style={{marginRight: 16}} />
              <div className='flex-fill text-danger'>{formik.status}</div>
            </div>
          )}

          {/* end::Title */}

          {/* begin::Form group */}
          <div className='fv-row mb-10'>
            <label className='form-label fw-bolder text-gray-800 fs-6'>No. HP</label>
            <InputPhone
              type='text'
              placeholder=''
              autoComplete='off'
              {...formik.getFieldProps('phone')}
              onChangeValue={(val) => formik.setFieldValue('phone', val)}
              className={clsx('form-control form-control-lg form-control-solid', {
                'is-invalid': formik.status || (formik.touched.phone && formik.errors.phone),
              })}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className='fv-plugins-message-container text-danger'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.phone}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className='d-flex pb-lg-0'>
            <Link
              to={AuthScreens.LOGIN_EMAIL.PATH}
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className={`btn btn-lg btn-light fw-bolder d-block me-4 ${
                formik.isSubmitting ? 'disabled' : ''
              }`}
              style={{flex: 1}}
            >
              Kembali
            </Link>{' '}
            <button
              type='submit'
              id='kt_password_reset_submit'
              className='btn btn-lg btn-secondary fw-bolder'
              style={{flex: 1}}
              disabled={formik.isSubmitting}
            >
              <span className='indicator-label'>Kirim</span>
              {loading && (
                <span className='indicator-progress'>
                  Mohon Tunggu...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
          {/* end::Form group */}
        </form>
      )}
    </>
  )
}
