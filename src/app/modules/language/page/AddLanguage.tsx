/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {useFormik} from 'formik'
import React, { useEffect, useMemo, useState} from 'react'
import {useHistory} from 'react-router'
import {PageTitle} from 'src/_metronic/layout/core'
import {getTitle} from 'src/app/utils/title-utils'
import AlertSuccess from 'src/app/components/AlertSuccess'
import LanguageScreens from '../Screens'
import Select from 'react-select'
import {ReactSelectMetronicTheme} from 'src/app/components/CustomReactSelect'
import {SelectComponentsConfig} from 'react-select'
// import {trimNonNumeric} from 'src/app/utils/input-utils'
// import {KTSVG} from '../../../../_metronic/helpers'

const initialValues = {
  username: '',
  name: '',
  phone: '',
  email: '',
  status: '',
  Language: '',
}

export const AddLanguage = () => {
  // States
  const [success, setSuccess] = useState('')
  const [selectedRole, setSelectedRole] = useState<{label: string; value: string} | undefined>()

  // Variables
  const history = useHistory()
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: any, {setStatus, setSubmitting}) => {
      setSubmitting(true)
      setTimeout(() => {
        // updateLanguage(id, payload)
        //   .then(() => {
        //     dispatch(AdminRedux.actions.setSuccess('Data berhasil disimpan.'))
        //     history.goBack()
        //   })
        //   .catch(() => {
        //     setSubmitting(false)
        //     setStatus('Update Admin gagal.')
        //   })
      }, 1000)
    },
  })

  // useEffect(() => {
  //   if (data) {
  //     console.log(data)
  //     formik.setFieldValue('username', data?.username)
  //     formik.setFieldValue('name', data?.name)
  //     formik.setFieldValue('phone', data?.phone)
  //     formik.setFieldValue('email', data?.email)
  //     formik.setFieldValue('Language', data?.Language)
  //     if (data?.status === 'ACTIVE') setStatus(true)
  //   }
  // }, [data])

  // useEffect(() => {
  //   if (data) {
  //     getRoles({
  //       page: 1,
  //       limit: 999999,
  //       platform: RolePlatform.ZEUS,
  //     }).then((value) => {
  //       const items = value.data.data?.items ?? []
  //       if (!selectedRole) {
  //         const role = items.find((item) => item?.id === data?.role_id)
  //         setSelectedRole({label: role?.name!, value: role?.id!})
  //       }
  //       setRole(items.map(({id, name}) => ({value: id ?? '', label: name ?? ''})))
  //     })
  //   }
  // }, [data])

  // useEffect(() => {
  //   getLanguageDetail(id).then(({data}) => {
  //     dispatch(AdminRedux.actions.getDetailAdmin(data.data, ''))
  //   })
  // }, [])

  //start::TITLE_FUNC
  const pageTitle = useMemo(() => LanguageScreens.ADD_LANGUAGE.TITLE, [])

  const breadcrumbs = useMemo(
    () => [
      {
        isActive: false,
        path: LanguageScreens.ADD_LANGUAGE.PATH,
        title: LanguageScreens.ADD_LANGUAGE.TITLE,
      },
      {isActive: false, path: '', title: '', isSeparator: true},
    ],
    []
  )

  useEffect(() => {
    document.title = getTitle(pageTitle)
  }, [])
  //end::TITLE_FUNC

  return (
    <div className='card'>
      <PageTitle breadcrumbs={breadcrumbs}>{pageTitle}</PageTitle>
      <div className='card-body'>
        <AlertSuccess message={success} handleClose={() => setSuccess('')} />
        {/* <ModalSent
          show={sentData !== undefined}
          data={sentData}
          handleClose={() => setSentData(undefined)}
        />
        <ModalEmail
          user_id={id}
          email={formik.values.email}
          handleSuccess={() => {
            setEmailModal(false)
            setSentData({
              title: 'Notifikasi berhasil dikirim',
              description: 'Pemberitahuan perubahan data telah dikirim ke no. HP user.',
            })
          }}
          handleClose={() => setEmailModal(false)}
          show={emailModal}
        />
        <ModalPhone
          user_id={id}
          phone={formik.values.phone}
          handleSuccess={() => {
            setPhoneModal(false)
            setSentData({
              title: 'Notifikasi berhasil dikirim',
              description: 'Pemberitahuan perubahan data telah dikirim ke no. HP user.',
            })
          }}
          handleClose={() => setPhoneModal(false)}
          show={phoneModal}
        />
        <ModalPassword
          user_id={id}
          handleSuccess={() => {
            setSentData({
              title: 'Link ubah password berhasil dikirim',
              description: 'Link ubah password telah dikirim ke no. HP user.',
            })
          }}
          handleClose={() => setPasswordModal(false)}
          show={passwordModal}
        /> */}
        <form className='form w-100' onSubmit={formik.handleSubmit} noValidate>
          <div className='row'>
            <div className='col-4'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Icon</label>
              <div className='d-flex align-items-start py-5'>
                <div className='me-3' style={{position: 'relative'}}>
                  <button
                    className='btn-transparent'
                    onClick={() => {}}
                    style={{right: 5, zIndex: 2, position: 'absolute'}}
                  ></button>
                  <img
                    alt=''
                    key={1}
                    src={'/media/avatars/selfie.png'}
                    className='rounded img-fluid'
                    style={{marginTop: '-20px'}}
                  />
                </div>

                {/* <div className='me-3'> */}
                {/* <button
                    onClick={() => {
                      photoInputRef.current?.click()
                    }}
                    className='d-flex flex-column align-items-center justify-content-center rounded'
                    style={{width: 150, height: 150, backgroundColor: '#EBEDEF'}}
                  >
                    <p className='text-dark fs-5 fw-bold'>Tambah Foto</p>
                    <KTSVG
                      path='/media/icons/efood/ButtonPlus.svg'
                      className='svg-icon-1 svg-icon-primary shadow-lg rounded-circle'
                    />
                  </button> */}
                {/* </div> */}
              </div>
            </div>
            <div className='col'>
              <div className='mb-10 row'>
                <div className='col-12 col-md-6 mb-10 mb-md-0'>
                  <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                    Language
                  </label>
                  <input
                    {...formik.getFieldProps('name')}
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    tabIndex={1}
                  />
                </div>
                <div className='mb-10 row'>
                  <div className='col-12 col-md-6'>
                    <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                      Status*
                    </label>
                    <Select
                      placeholder='Pilih Role'
                      cacheOptions
                      defaultOptions
                      components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                      value={selectedRole}
                      options={[]}
                      onChange={(value: any) => {
                        setSelectedRole(value)
                        formik.setFieldValue('role_id', value.value)
                      }}
                      tabIndex='5'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='border-top pt-10 cardfooter-btns'>
            <button
              type='button'
              className={`btn btn-lg btn-light fw-bolder me-4`}
              onClick={() => history.goBack()}
              tabIndex={8}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-lg btn-secondary fw-bolder me-4'
              disabled={formik.isSubmitting}
              tabIndex={9}
            >
              <span className='indicator-label'>Save</span>
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
  )
}
