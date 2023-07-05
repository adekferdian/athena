import clsx from 'clsx'
import {useFormik} from 'formik'
import {FC, useEffect, useMemo, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {SelectComponentsConfig} from 'react-select'
import Select from 'react-select'
import {PageTitle} from 'src/_metronic/layout/core'
import AlertSuccess from 'src/app/components/AlertSuccess'
import {ReactSelectMetronicTheme} from 'src/app/components/CustomReactSelect'
import {getTitle} from 'src/app/utils/title-utils'
import * as Yup from 'yup'
import MasterComponentScreens from '../Screens'
import {getMasterComponentDetail, updateMasterComponent} from '../redux/MasterComponentCRUD'

const editSchema = Yup.object().shape({
  component_name: Yup.string().required('This field is required'),
  // status: Yup.string().required('This field is required'),
})

const initialValues = {
  component_name: '',
  description: '',
  meta_data: '',
  status: '',
}

const EditMasterComponent: FC = (props: any) => {
  // Variables
  const {id} = useParams<any>()
  const history = useHistory()

  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()
  const [save, setSave] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<{label: string; value: string} | undefined>()
  const statList = [
    {label: 'Active', value: 'active'},
    {label: 'Inactive', value: 'not_active'},
  ]

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: editSchema,
    onSubmit: (values: any, {setStatus, setSubmitting}) => {
      updateComponent(values)
      setSave(true)
    },
  })

  const updateComponent = async (values:any) => {
    formik.setSubmitting(true)
    setLoading(true)
    setTimeout(() => {
      updateMasterComponent(id, values.component_name, values.description, values.meta_data ,selectedStatus?.value ?? values.status)
        .then(() => {
          setLoading(false)
          formik.setSubmitting(false)
          history.goBack()
        })
        .catch(() => {
          setSave(false)
          setLoading(false)
          formik.setSubmitting(false)
          formik.setStatus('Update Master Component Failed.')
        })
    }, 1000)
  }

  //start::TITLE_FUNC
  const pageTitle = useMemo(() => MasterComponentScreens.EDIT_MASTER_COMPONENT.TITLE, [])

  const breadcrumbs = useMemo(
    () => [
      {
        isActive: false,
        path: MasterComponentScreens.LIST_MASTER_COMPONENT.PATH,
        title: MasterComponentScreens.LIST_MASTER_COMPONENT.TITLE,
      },
      {isActive: false, path: '', title: '', isSeparator: true},
    ],
    []
  )

  useEffect(() => {
    const getData = async () => {
      try {
        const detail = await getMasterComponentDetail(id)
        setData(detail.data.data ?? null)
        detail.data.data?.status === 'not_active'
          ? setSelectedStatus({label: 'Inactive', value: detail.data.data?.status})
          : setSelectedStatus({label: 'Active', value: detail.data.data?.status ?? 'active'})
        formik.setFieldValue('component_name', detail.data.data?.component_name)
        formik.setFieldValue('description', detail.data.data?.description)
        formik.setFieldValue('meta_data', detail.data.data?.meta_data)
        formik.setFieldValue('status', selectedStatus)
      } catch (error) {}
    }

    getData()
  }, [id])

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
                Benefit Type Name<span className='text-danger'>*</span>
              </label>
              <input
                placeholder='Input Benefit Type Name'
                {...formik.getFieldProps('component_name')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.component_name && formik.errors.component_name,
                })}
                type='text'
                name='component_name'
                autoComplete='off'
              />
              {formik.touched.component_name && formik.errors.component_name && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.component_name}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mb-10 mb-md-0 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Description
              </label>
              <textarea
                placeholder='Input Component Description'
                {...formik.getFieldProps('description')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.description && formik.errors.description,
                })}
                name='description'
                autoComplete='off'
              />
              {formik.touched.description && formik.errors.description && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.description}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mb-10 mb-md-0 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
               Meta Data
              </label>
              <input
                placeholder='Input Meta Data'
                {...formik.getFieldProps('meta_data')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.meta_data && formik.errors.meta_data,
                })}
                type='text'
                name='meta_data'
                autoComplete='off'
              />
              {formik.touched.meta_data && formik.errors.meta_data && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.meta_data}</span>
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

export {EditMasterComponent}
