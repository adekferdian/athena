/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {setPassword} from '../redux/AuthCRUD'
import AuthScreens from '../screens'
import InlineSVG from 'react-inlinesvg/esm'
import {getTitle} from 'src/app/utils/title-utils'
import {useHistory, useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import {getErrorMessage} from 'src/app/utils/api-utils'
import GuestWrapper from './GuestWrapper'
import InputPassword from 'src/app/components/InputPassword'

const loginSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Password minimal 6 karakter').required('Kolom wajib diisi'),
  repassword: Yup.string()
    .min(6, 'Password minimal 6 karakter')
    .required('Kolom wajib diisi')
    .test('equal', 'Konfirmasi Password Baru harus sama dengan Password Baru.', function (v) {
      // Don't use arrow functions
      const ref = Yup.ref('password')
      return v === this.resolve(ref)
    }),
})

const initialValues = {
  password: '',
  repassword: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function CreateNewPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const history = useHistory()
  let query = new URLSearchParams(useLocation().search)
  const token = query.get('t')
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        setPassword(token ?? '', values.password.toString())
          .then((res) => {
            setHasErrors(false)
            setLoading(false)
            setSubmitting(false)
          })
          .catch((e) => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus(getErrorMessage(e, true))
          })
      }, 1000)
    },
  })

  useEffect(() => {
    if (!token) history.replace(AuthScreens.LOGIN_EMAIL.PATH)
    document.title = getTitle('Buat Password Baru')
  }, [history, token])

  if (!token) return null

  return (
    <GuestWrapper>
      {hasErrors === false ? (
        <div className='d-flex flex-column align-items-stretch'>
          <InlineSVG src={'/media/icons/efood/IconMail.svg'} className='align-self-center mb-10' />
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark mb-3 fs-2'>Password Berhasil Diubah</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-gray-400 fw-bold fs-4'>
              Silakan kembali ke login untuk melanjutkan
            </div>
            {/* end::Link */}
          </div>
          <Link to={AuthScreens.LOGIN_EMAIL.PATH} className='btn btn-lg btn-secondary w-100 mb-5'>
            <span className='indicator-label'>Kembali ke Login</span>
          </Link>
        </div>
      ) : (
        <form className='form w-100' onSubmit={formik.handleSubmit} noValidate>
          {/* begin::Heading */}
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark mb-3 fs-2'>Buat Password Baru</h1>
            {/* end::Title */}
          </div>
          {/* begin::Heading */}
          {Boolean(formik.status) && (
            <div
              className='d-flex align-items-center rounded py-4 px-5 mb-10'
              style={{backgroundColor: 'rgba(240, 66, 108, 0.1)'}}
            >
              <InlineSVG src={'/media/icons/efood/IconWarning.svg'} style={{marginRight: 16}} />
              <div className='flex-fill text-danger'>{formik.status}</div>
            </div>
          )}

          {/* begin::Form group */}
          <div className='fv-row mb-10'>
            <InputPassword label='Password Baru' {...formik.getFieldProps('password')} />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            )}
          </div>

          <div className='fv-row mb-10'>
            <InputPassword
              label='Konfirmasi (Ulangi) Password Baru'
              {...formik.getFieldProps('repassword')}
            />
            {formik.touched.repassword && formik.errors.repassword && (
              <div className='fv-plugins-message-container text-danger'>
                <span role='alert'>{formik.errors.repassword}</span>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Action */}
          <div className='text-center'>
            <button
              type='submit'
              id='kt_sign_in_submit'
              className='btn btn-lg btn-secondary w-100 mb-5'
              disabled={formik.isSubmitting}
            >
              {!loading && <span className='indicator-label'>Buat Password</span>}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Mohon Tunggu...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
          {/* end::Action */}
        </form>
      )}
    </GuestWrapper>
  )
}
