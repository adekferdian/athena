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
import MasterBenefitTypeScreens from '../Screens'
import {getMasterBenefitTypeDetail, updateMasterBenefitType} from '../redux/MasterBenefitTypeCRUD'

const editSchema = Yup.object().shape({
  benefittype: Yup.string().required('This field is required'),
})

const initialValues = {
  benefittype: '',
  status: '',
}

const EditMasterBenefitType: FC = (props: any) => {
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
      updateMasterRule(values)
      setSave(true)
    },
  })

  const updateMasterRule = async (values:any) => {
    formik.setSubmitting(true)
    setLoading(true)
    setTimeout(() => {
      updateMasterBenefitType(id, values.benefittype,selectedStatus?.value ?? values.status)
        .then(() => {
          setLoading(false)
          formik.setSubmitting(false)
          history.goBack()
        })
        .catch(() => {
          setSave(false)
          setLoading(false)
          formik.setSubmitting(false)
          formik.setStatus('Update Master Rule Failed.')
        })
    }, 1000)
  }

  //start::TITLE_FUNC
  const pageTitle = useMemo(() => MasterBenefitTypeScreens.EDIT_MASTER_BENEFIT_TYPE.TITLE, [])

  const breadcrumbs = useMemo(
    () => [
      {
        isActive: false,
        path: MasterBenefitTypeScreens.LIST_MASTER_BENEFIT_TYPE.PATH,
        title: MasterBenefitTypeScreens.LIST_MASTER_BENEFIT_TYPE.TITLE,
      },
      {isActive: false, path: '', title: '', isSeparator: true},
    ],
    []
  )

  useEffect(() => {
    const getData = async () => {
      try {
        const detail = await getMasterBenefitTypeDetail(id)
        setData(detail.data.data ?? null)
        detail.data.data?.status === 'not_active'
          ? setSelectedStatus({label: 'Inactive', value: detail.data.data?.status})
          : setSelectedStatus({label: 'Active', value: detail.data.data?.status ?? 'active'})
        formik.setFieldValue('benefittype', detail.data.data?.benefittype)
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
                {...formik.getFieldProps('benefittype')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.benefittype && formik.errors.benefittype,
                })}
                type='text'
                name='benefittype'
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

export {EditMasterBenefitType}
