/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {getTitle} from 'src/app/utils/title-utils'
import {setPasswordVerification} from '../redux/AuthCRUD'
import {useHistory, useLocation} from 'react-router-dom'
import AlertError from 'src/app/components/AlertError'
import GuestWrapper from './GuestWrapper'
import InputPassword from 'src/app/components/InputPassword'
import {getErrorMessage} from 'src/app/utils/api-utils'

const loginSchema = Yup.object({
  password: Yup.string().min(6, 'Password minimal 6 karakter').required('Kolom wajib diisi'),
  passwordConfirmation: Yup.string()
    .min(6, 'Password minimal 6 karakter')
    .required('Kolom wajib diisi')
    .oneOf([Yup.ref('password'), null], 'Konfirmasi Password Baru harus sama dengan Password Baru'),
})

const initialValues = {
  password: '',
  passwordConfirmation: '',
}

interface Props {
  location: {
    search: string
  }
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const PhoneVerification: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false)
  let query = new URLSearchParams(useLocation().search)
  const token = query.get('t')
  const history = useHistory()
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setPasswordVerification(token, values.password)
        .then((res) => {
          setLoading(false)
          history.push('/auth/verification-success')
        })
        .catch((e) => {
          setStatus(getErrorMessage(e, true, 'Gagal membuat password'))
          setLoading(false)
          setSubmitting(false)
        })
    },
  })

  useEffect(() => {
    document.title = getTitle('Buat Password Baru')
  }, [])

  return (
    <GuestWrapper>
      <AlertError message={formik.status} handleClose={() => formik.setStatus('')} />
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3 fs-2'>Buat Password Baru</h1>
        </div>
        {/* begin::Heading */}

        <div className='fv-row mb-10'>
          <InputPassword
            {...formik.getFieldProps('password')}
            label='Password Baru'
            autoComplete='off'
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container text-danger'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'>
          <InputPassword
            {...formik.getFieldProps('passwordConfirmation')}
            label='Konfirmasi (Ulangi) Password Baru'
            autoComplete='off'
          />
          {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <div className='fv-plugins-message-container text-danger'>
              <span role='alert'>{formik.errors.passwordConfirmation}</span>
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
            tabIndex={3}
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
    </GuestWrapper>
  )
}

export default PhoneVerification
