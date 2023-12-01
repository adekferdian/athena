/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {getTitle} from 'src/app/utils/title-utils'
import {PageTitle} from '../../../../_metronic/layout/core'
import {useFormik} from 'formik'
import clsx from 'clsx'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {RootState} from 'src/setup'
import AuthRedux from '../../auth/redux/AuthRedux'
import {UserModel} from '../../auth/models/UserModel'
import {resendEmailVerification, updateProfile} from '../../auth/redux/AuthCRUD'
import {useHistory} from 'react-router'
// import EditPhoneModal from '../components/EditPhoneModal'
import EditEmailModal from '../components/EditEmailModal'
import {useHeaderToast} from 'src/app/components/ToastComponent'
import InputPhone from 'src/app/components/InputPhone'
import AlertSuccess from 'src/app/components/AlertSuccess'
import AlertError from 'src/app/components/AlertError'
import {getErrorMessage} from 'src/app/utils/api-utils'

const schema = Yup.object().shape({
  name: Yup.string().required('Kolom wajib diisi'),
})

const initialValues = {
  name: '',
}

const ProfilePageTitle: FC = () => {
  return <PageTitle description='Profil Saya'>Profil Saya</PageTitle>
}

const ProfilePage: FC = () => {
  const history = useHistory()
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const [emailModal, setEmailModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [failed, setFailed] = useState('')
  const {addPageToasts} = useHeaderToast()
  const fetching = useSelector<RootState>(
    ({auth}) => auth.fetchingUser,
    shallowEqual
  ) as AuthRedux.FetchingUserState
  const [loaded, setLoaded] = useState<boolean>()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      updateProfile({name: values.name})
        .then(() => {
          addPageToasts({
            text: 'Data berhasil diubah.',
            scheme: 'info',
          })
          dispatch(AuthRedux.actions.requestUser())
          setSubmitting(false)
        })
        .catch(() => {
          setSubmitting(false)
          setStatus('')
        })
    },
  })
  useEffect(() => {
    document.title = getTitle('Profil Saya')
  }, [])
  useEffect(() => {
    dispatch(AuthRedux.actions.requestUser())
  }, [dispatch])
  useEffect(() => {
    if (loaded === undefined && fetching === 'loading') setLoaded(false)
    else if (loaded === false && fetching !== 'loading') {
      setLoaded(true)
      if (fetching === 'success') {
        formik.setFieldValue('name', user?.name)
      }
    }
  }, [fetching, formik, loaded, user])

  const handleEmail = () => {
    if (!user?.email || user?.email_verified_at !== null) {
      setEmailModal(true)
    } else {
      if (user?.email) {
        setLoading(true)
        resendEmailVerification(user?.email)
          .finally(() => setLoading(false))
          .then((res) => {
            setSuccess('Berhasil mengirim ulang email verifikasi')
          })
          .catch((e) => {
            setFailed(getErrorMessage(e, true, 'Gagal mengirim ulang email verifikasi'))
          })
      }
    }
  }

  return (
    <div className='position-relative'>
      <AlertSuccess message={success} handleClose={() => setSuccess('')} />
      <AlertError message={failed} handleClose={() => setFailed('')} />
      <ProfilePageTitle />
      <div className='card'>
        <div className='card-body'>
          <div className={!loaded ? '' : 'd-none'}>Loading...</div>
          <div className={loaded && fetching === 'failed' ? '' : 'd-none'}>
            Error, try to refresh the page
          </div>
          <form
            className={loaded && fetching !== 'failed' ? 'col-md-6' : 'd-none'}
            onSubmit={formik.handleSubmit}
          >
            <div className='fv-row mb-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Nama</label>
              <input
                placeholder=''
                {...formik.getFieldProps('name')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'is-invalid': formik.status || (formik.touched.name && formik.errors.name),
                })}
                type='text'
                name='name'
                autoComplete='off'
              />
              {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container text-danger'>
                  <span role='alert'>{formik.errors.name}</span>
                </div>
              )}
            </div>
            <div className='fv-row mb-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>No. HP</label>
              <div className='row'>
                <div className={`col-9 col-md-9 col-lg-9`}>
                  <InputPhone
                    placeholder=''
                    containerClass='flex-fill'
                    className='form-control form-control-solid form-control-lg'
                    type='text'
                    name='phone'
                    autoComplete='off'
                    value={user?.phone ?? ''}
                    onChangeValue={() => {}}
                    disabled
                  />
                </div>
                <div className='col'>
                  <button
                    type='button'
                    className={`btn btn-lg btn-info fw-bolder`}
                    disabled={formik.isSubmitting}
                    onClick={() => {}}
                  >
                    Ubah
                  </button>
                </div>
              </div>
            </div>
            <div className='fv-row mb-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Email</label>
              <div className='row'>
                <div
                  className={`col-9 ${
                    !user?.email || user?.email_verified_at !== null
                      ? 'col-md-9 col-lg-9'
                      : 'col-md-6 col-lg-6'
                  }`}
                >
                  <input
                    placeholder=''
                    value={user?.email ?? ''}
                    className={clsx('form-control form-control-solid form-control-lg flex-fill', {
                      'is-invalid': user?.email && user?.email_verified_at === null,
                    })}
                    style={{borderColor: '#e4e6ef'}}
                    type='text'
                    disabled
                    autoComplete='off'
                  />
                  {user?.email && user?.email_verified_at === null && (
                    <div className='fv-plugins-message-container text-danger mt-1'>
                      <span role='alert'>Email belum diverifikasi</span>
                    </div>
                  )}
                </div>
                <div className='col'>
                  <button
                    type='button'
                    className={`btn btn-lg btn-info fw-bolder`}
                    disabled={loading}
                    onClick={handleEmail}
                  >
                    {!user?.email || user?.email_verified_at !== null
                      ? 'Ubah'
                      : 'Kirim ulang verifikasi'}
                  </button>
                </div>
              </div>
            </div>
            <div className='fv-row mb-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Nomor Induk Karyawan (NIK)
              </label>
              <input
                placeholder=''
                value={user?.nip ?? ''}
                className={clsx('form-control form-control-solid form-control-lg')}
                type='text'
                disabled
                autoComplete='off'
              />
            </div>
            <div className='fv-row mb-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Role</label>
              <input
                placeholder=''
                value={user?.role?.name ?? ''}
                className={clsx('form-control form-control-solid form-control-lg')}
                type='text'
                disabled
                autoComplete='off'
              />
            </div>
            <div>
              <button
                type='button'
                className={`btn btn-lg btn-light fw-bolder me-4`}
                disabled={formik.isSubmitting}
                onClick={() => history.goBack()}
              >
                Kembali
              </button>{' '}
              <button
                type='submit'
                className='btn btn-lg btn-secondary fw-bolder'
                disabled={formik.isSubmitting}
              >
                <span className='indicator-label'>Simpan Perubahan</span>
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
      {/* <EditPhoneModal
        show={phoneModal}
        handleClose={() => setPhoneModal(false)}
        handleSuccess={() => {
          addPageToasts({
            text: 'No. HP berhasil diubah.',
            scheme: 'info',
          })
        }}
      /> */}
      <EditEmailModal
        show={emailModal}
        handleClose={() => setEmailModal(false)}
        handleSuccess={() => {
          dispatch(AuthRedux.actions.requestUser())
        }}
      />
    </div>
  )
}

export {ProfilePage}
