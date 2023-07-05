import clsx from 'clsx'
import {useFormik} from 'formik'
import {FC, useEffect, useMemo, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {SelectComponentsConfig} from 'react-select'
import Select from 'react-select'
import {PageTitle} from 'src/_metronic/layout/core'
import AlertSuccess from 'src/app/components/AlertSuccess'
import {ReactSelectMetronicTheme} from 'src/app/components/CustomReactSelect'
import {getTitle} from 'src/app/utils/title-utils'
import * as Yup from 'yup'
import MasterBenefitScreens from '../Screens'
import {createMasterBenefit} from '../redux/MasterBenefitCRUD'
import {getMasterBenefitTypeList} from '../../BenefitType/redux/MasterBenefitTypeCRUD'

const addSchema = Yup.object().shape({
  benefit_type: Yup.string().required('This field is required'),
  benefit_name: Yup.string().required('This field is required'),
  status: Yup.string().required('This field is required'),
})

const initialValues = {
  benefit_type: '',
  benefit_name: '',
  benefit_description: '',
  meta_data: '',
  status: '',
}

export const AddMasterBenefit: FC = () => {
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<{label: string; value: string} | undefined>()
  const [selectedBenefitType, setSelectedBenefitType] = useState<
    {label: string; value: string} | undefined
  >()
  const [benefitType, setBenefitType] = useState<any>([])
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
        createMasterBenefit(
          values.benefit_type,
          values.benefit_name,
          values.benefit_description,
          values.meta_data,
          values.status
        )
          .then(() => {
            setLoading(false)
            setSubmitting(false)
            history.goBack()
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('Add benefit failed.')
          })
      }, 1000)
      setLoading(false)
    },
  })

  //start::TITLE_FUNC
  const pageTitle = useMemo(() => MasterBenefitScreens.ADD_MASTER_BENEFIT.TITLE, [])

  const breadcrumbs = useMemo(
    () => [
      {
        isActive: false,
        path: MasterBenefitScreens.LIST_MASTER_BENEFIT.PATH,
        title: MasterBenefitScreens.LIST_MASTER_BENEFIT.TITLE,
      },
      {isActive: false, path: '', title: '', isSeparator: true},
    ],
    []
  )

  const getBenefitType = async () => {
    try {
      const masterBenefitType = await getMasterBenefitTypeList({})
      setBenefitType(masterBenefitType.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    document.title = getTitle(pageTitle)
    getBenefitType()
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
                Benefit Name<span className='text-danger'>*</span>
              </label>
              <input
                placeholder='Input Benefit Name'
                {...formik.getFieldProps('benefit_name')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.benefit_name && formik.errors.benefit_name,
                })}
                type='text'
                name='benefit_name'
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
                Benefit Description
              </label>
              <textarea
                placeholder='Input Benefit Description'
                {...formik.getFieldProps('benefit_description')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger':
                    formik.touched.benefit_description && formik.errors.benefit_description,
                })}
                name='benefit_description'
                autoComplete='off'
              />
              {formik.touched.description && formik.errors.description && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.description}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mb-10 mb-md-0 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Meta Data</label>
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
              {formik.touched.description && formik.errors.description && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.description}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Benefit Type<span className='text-danger'>*</span>
              </label>
              <Select
                placeholder='Select'
                cacheOptions
                defaultOptions
                components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                value={selectedBenefitType}
                options={benefitType.map((data: any) => {
                  return {label: data.benefittype, value: data.benefittype_id}
                })}
                onChange={(value: any) => {
                  setSelectedBenefitType(value)
                  formik.setFieldValue('benefit_type', value.value)
                }}
              />
              {formik.touched.status && formik.errors.status && (
                <div className='fv-plugins-message-container mt-3 text-danger'>
                  <span role='alert'>{formik.errors.status}</span>
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
