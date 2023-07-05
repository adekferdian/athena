import clsx from "clsx"
import { useFormik } from "formik"
import { FC, useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router-dom"
import { SelectComponentsConfig } from "react-select"
import Select from 'react-select'
import { PageTitle } from "src/_metronic/layout/core"
import AlertSuccess from "src/app/components/AlertSuccess"
import { ReactSelectMetronicTheme } from "src/app/components/CustomReactSelect"
import { getTitle } from "src/app/utils/title-utils"
import * as Yup from 'yup'
import LimitScreens from "../Screens"
import { createLimit } from "../redux/LimitCRUD"

const addSchema = Yup.object().shape({
  limit_name: Yup.string().required('This field is required'),
  status: Yup.string().required('This field is required'),
})

const initialValues = {
  limit_name: '',
  limit_description: '',
  limit_rules: '',
  limit_type: '',
  status: '',
}


export const AddLimit: FC = (props: any) => {
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<{label: string; value: string} | undefined>()
  const statList = [
    {label: 'Active', value: 'active'},
    {label: 'Inactive', value: 'not_active'},
  ]
  // Variables
  const history = useHistory()
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: addSchema,
    onSubmit: (values: any, {setStatus, setSubmitting}) => {
      setSubmitting(true)
      setLoading(true)
      setTimeout(() => {
        console.log('value: ' + JSON.stringify(values))
        createLimit(values.limit_name, values.limit_description, values.limit_rules ,values.limit_type, values.status)
          .then(() => {
            setLoading(false)
            setSubmitting(false)
            history.goBack()
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('Add Limit failed.')
          })
      }, 1000)
      setLoading(false)
    },
  })

  //start::TITLE_FUNC
  const pageTitle = useMemo(() => LimitScreens.ADD_MASTER_LIMIT.TITLE, [])

  const breadcrumbs = useMemo(
    () => [
      {
        isActive: false,
        path: LimitScreens.LIST_MASTER_LIMIT.PATH,
        title: LimitScreens.LIST_MASTER_LIMIT.TITLE,
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
          <div className='mb-10 col'>
            <div className='col-12 col-md-6 mb-10 mb-md-0 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Limit Name<span className='text-danger'>*</span>
              </label>
              <input
                placeholder='Input Limit Name'
                {...formik.getFieldProps('limit_name')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.limit_name && formik.errors.limit_name,
                })}
                type='text'
                name='limit_name'
                autoComplete='off'
              />
              {formik.touched.limit_name && formik.errors.limit_name && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.limit_name}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mb-10 mb-md-0 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Description
              </label>
              <textarea
                placeholder='Input Description'
                {...formik.getFieldProps('limit_description')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.limit_description && formik.errors.limit_description,
                })}
                name='limit_description'
                autoComplete='off'
              />
              {formik.touched.limit_description && formik.errors.limit_description && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.limit_description}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mb-10 mb-md-0 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Rules
              </label>
              <input
                placeholder='Input Rules'
                {...formik.getFieldProps('limit_rules')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.limit_rules && formik.errors.limit_rules,
                })}
                name='limit_rules'
                autoComplete='off'
                type='text'
              />
              {formik.touched.limit_rules && formik.errors.limit_rules && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.limit_rules}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mb-10 mb-md-0 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Limit Type
              </label>
              <input
                placeholder='Input Limit Type'
                {...formik.getFieldProps('limit_type')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.limit_type && formik.errors.limit_type,
                })}
                type='text'
                name='limit_type'
                autoComplete='off'
              />
              {formik.touched.limit_type && formik.errors.limit_type && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.limit_type}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Status<span className='text-danger'>*</span>
              </label>
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
              />
              {formik.touched.status && formik.errors.status && (
                <div className='fv-plugins-message-container mt-3 text-danger'>
                  <span role='alert'>{formik.errors.status}</span>
                </div>
              )}
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
            >
              {!loading && <span className='indicator-label'>Save</span>}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
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

