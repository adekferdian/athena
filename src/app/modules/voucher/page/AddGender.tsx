/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {useFormik} from 'formik'
import React, {useEffect, useMemo, useState} from 'react'
import {useHistory} from 'react-router'
import {PageTitle} from 'src/_metronic/layout/core'
import {getTitle} from 'src/app/utils/title-utils'
import AlertSuccess from 'src/app/components/AlertSuccess'
import Select from 'react-select'
import {ReactSelectMetronicTheme} from 'src/app/components/CustomReactSelect'
import {SelectComponentsConfig} from 'react-select'
import VoucherScreens from '../Screens'
// import {createGender} from '../redux/GenderCRUD'

const initialValues = {
  description: '',
  status: '',
}


export const AddGender = () => {
  // States
  // const [status, setStatus] = useState(false)
  const [success, setSuccess] = useState('')
  // const [role, setRole] = useState<{label: string; value: string}[]>([])
  // const [sentData, setSentData] = useState<undefined | SentDataModel>(undefined)
  // const [passwordModal, setPasswordModal] = useState(false)
  // const [emailModal, setEmailModal] = useState(false)
  // const [phoneModal, setPhoneModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<{label: string; value: string} | undefined>()
  const statList = [
    {label: 'active', value: 1},
    {label: 'inactive', value: 0},
  ]
  // Variables
  const history = useHistory()
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: any, {setStatus, setSubmitting}) => {
      setSubmitting(true)
      // setTimeout(() => {
      //     createGender( values.description, values.status)
      //       .then(() => {
      //         // dispatch(GenderRedux.actions.setSuccess('Data berhasil disimpan.'))
      //         history.goBack()
      //       })
      //       .catch(() => {
      //         setSubmitting(false)
      //         setStatus('Add Gender gagal.')
      //       })
      // }, 1000)
    },
  })

  //start::TITLE_FUNC
  const pageTitle = useMemo(() => VoucherScreens.ADD_VOUCHER.TITLE, [])

  const breadcrumbs = useMemo(
    () => [
      {
        isActive: false,
        path: VoucherScreens.VOUCHER_LIST.PATH,
        title: VoucherScreens.VOUCHER_LIST.TITLE,
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
        <form className='form w-100' onSubmit={formik.handleSubmit} noValidate>
          <div className='mb-10 row'>
            <div className='col-12 col-md-6 mb-10 mb-md-0'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Gender</label>
              <input
                {...formik.getFieldProps('description')}
                type='text'
                className='form-control form-control-lg form-control-solid'
              />
            </div>
            <div className='col-12 col-md-6'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Status*</label>
              <Select
                placeholder='Select'
                cacheOptions
                defaultOptions
                components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                value={selectedStatus}
                options={statList}
                onChange={(value: any) => {
                  setSelectedStatus(value)
                  formik.setFieldValue('status', value.value)
                }}
                tabIndex='5'
              />
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
