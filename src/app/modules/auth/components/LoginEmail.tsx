/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {loginByEmail} from '../redux/AuthCRUD'
import AuthScreens from '../screens'
import InlineSVG from 'react-inlinesvg/esm'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import AuthRedux from '../redux/AuthRedux'
import {getTitle} from 'src/app/utils/title-utils'
import {RootState} from 'src/setup'
import InputPassword from 'src/app/components/InputPassword'
import {getFirstError} from 'src/app/utils/api-utils'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Masukkan format email yang valid').required('Kolom wajib diisi'),
  password: Yup.string().min(6, 'Password minimal 6 karakter').required('Kolom wajib diisi'),
})

const initialValues = {
  email: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function LoginEmail() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const message: string | undefined = useSelector<RootState>(
    ({auth}) => auth.message,
    shallowEqual
  ) as string | undefined
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        loginByEmail(values.email.toString(), values.password.toString())
          .then(({data: {data: token}}) => {
            console.log('TEST', token)
            console.log(token)
            setLoading(false)
            dispatch(AuthRedux.actions.login(token, token))
          })
          .catch((e) => {
            const [code, msg] = getFirstError(e)
            if (code === 'EMAIL_NOT_VERIFIED') {
              setStatus('Email Anda belum terverifikasi')
            } else if (code === 'USER_NOT_VERIFIED') {
              setStatus('User Anda belum terverifikasi')
            } else if (code === 'UNREGISTERED_EMAIL') {
              setStatus(msg)
            } else {
              setStatus('Email dan/atau password tidak sesuai.')
            }
            setLoading(false)
            setSubmitting(false)
          })
      }, 1000)
    },
  })

  useEffect(() => {
    document.title = getTitle('Login')
  }, [])

  useEffect(() => {
    if (message) {
      formik.setStatus(message)
    }
  }, [message])

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3 fs-2'>Login</h1>
      </div>
      {/* begin::Heading */}
      {formik.status ? (
        <div
          className='d-flex align-items-center rounded py-4 px-5 mb-10'
          style={{backgroundColor: 'rgba(240, 66, 108, 0.1)'}}
        >
          <InlineSVG src={'/media/icons/efood/IconWarning.svg'} style={{marginRight: 16}} />
          <div className='flex-fill text-danger'>{formik.status}</div>
        </div>
      ) : null}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Email</label>
        <input
          placeholder=''
          {...formik.getFieldProps('email')}
          className={clsx('form-control form-control-lg form-control-solid', {
            'is-invalid': formik.status || (formik.touched.email && formik.errors.email),
          })}
          type='email'
          name='email'
          autoComplete='off'
          tabIndex={1}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container text-danger'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>

      <div className='fv-row mb-10'>
        <InputPassword
          {...formik.getFieldProps('password')}
          placeholder=''
          tabIndex={2}
          forgotLink={AuthScreens.FORGOT.PATH}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container text-danger'>
            <span role='alert'>{formik.errors.password}</span>
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
          {!loading && <span className='indicator-label'>Login</span>}
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
  )
}
