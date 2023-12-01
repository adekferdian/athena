/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import * as Yup from 'yup'
import {getTitle} from 'src/app/utils/title-utils'
import {PageTitle} from '../../../../_metronic/layout/core'
import {useFormik} from 'formik'
import {updatePassword} from '../../auth/redux/AuthCRUD'
import {useHistory} from 'react-router'
import {useHeaderToast} from 'src/app/components/ToastComponent'
import InputPassword from 'src/app/components/InputPassword'

const schema = Yup.object().shape({
  oldPassword: Yup.string().min(6, 'Password minimal 6 karakter').required('Kolom wajib diisi'),
  newPassword: Yup.string().min(6, 'Password minimal 6 karakter').required('Kolom wajib diisi'),
  rePassword: Yup.string()
    .min(6, 'Password minimal 6 karakter')
    .required('Kolom wajib diisi')
    .test('equal', 'Konfirmasi Password Baru harus sama dengan Password Baru.', function (v) {
      // Don't use arrow functions
      const ref = Yup.ref('newPassword')
      return v === this.resolve(ref)
    }),
})

const initialValues = {
  oldPassword: '',
  newPassword: '',
  rePassword: '',
}

const PasswordPageTitle: FC = () => {
  return <PageTitle description='Ubah Password'>Ubah Password</PageTitle>
}

const PasswordPage: FC = () => {
  const history = useHistory()
  const {addPageToasts} = useHeaderToast()
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: (values, {setStatus, setSubmitting, setFieldValue, setFieldError}) => {
      updatePassword(values.oldPassword, values.newPassword)
        .then(() => {
          setFieldValue('oldPassword', '')
          setFieldValue('newPassword', '')
          setFieldValue('rePassword', '')
          addPageToasts({
            text: 'Password berhasil diubah.',
            scheme: 'info',
          })
          setSubmitting(false)
        })
        .catch(() => {
          setFieldError('oldPassword', 'Password Saat Ini salah. Coba lagi.')
          setSubmitting(false)
          setStatus('')
        })
    },
  })
  useEffect(() => {
    document.title = getTitle('Ubah Password')
  }, [])

  return (
    <div className='position-relative'>
      <PasswordPageTitle />
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={formik.handleSubmit} className='col-md-6'>
            <div className='fv-row mb-10'>
              <InputPassword
                label='Password Saat Ini'
                placeholder=''
                {...formik.getFieldProps('oldPassword')}
                name='oldPassword'
                autoComplete='off'
              />
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <div className='fv-plugins-message-container text-danger'>
                  <span role='alert'>{formik.errors.oldPassword}</span>
                </div>
              )}
            </div>
            <div className='fv-row mb-10'>
              <InputPassword
                label='Password Baru'
                {...formik.getFieldProps('newPassword')}
                name='newPassword'
                autoComplete='off'
              />
              <div className='fv-plugins-message-container text-muted'>
                <span role='alert'>Password minimal 6 karakter.</span>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className='fv-plugins-message-container text-danger'>
                  <span role='alert'>{formik.errors.newPassword}</span>
                </div>
              )}
            </div>
            <div className='fv-row mb-10'>
              <InputPassword
                label='Konfirmasi (Ulangi) Password Baru'
                {...formik.getFieldProps('rePassword')}
                name='rePassword'
                autoComplete='off'
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <div className='fv-plugins-message-container text-danger'>
                  <span role='alert'>{formik.errors.rePassword}</span>
                </div>
              )}
            </div>
            <div>
              <button
                type='button'
                className={`btn btn-lg btn-light fw-bolder me-4`}
                style={{flex: 1}}
                disabled={formik.isSubmitting}
                onClick={() => history.goBack()}
              >
                Kembali
              </button>
              <button
                type='submit'
                className='btn btn-lg btn-secondary fw-bolder'
                style={{flex: 1}}
                disabled={formik.isSubmitting}
              >
                <span className='indicator-label'>Simpan</span>
                {formik.isSubmitting && (
                  <span className='indicator-progress'>
                    Mohon Tunggu...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export {PasswordPage}
