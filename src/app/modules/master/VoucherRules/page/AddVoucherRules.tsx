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
import VoucherRulesScreens from '../Screens'
import {createVoucherRules, getVoucherList} from '../redux/VoucherRulesCRUD'
import { getBusinessUnitList } from '../../BusinessUnit/redux/BusinessUnitCRUD'
import { getMasterRulesList } from '../../Rules/redux/MasterRulesCRUD'
import { getMasterComponentList } from '../../Component/redux/MasterComponentCRUD'

const addSchema = Yup.object().shape({
  bu_id: Yup.string().required('This field is required'),
  voucher_id: Yup.string().required('This field is required'),
  rules_id: Yup.string().required('This field is required'),
  component_id: Yup.string().required('This field is required'),
})

const initialValues = {
  bu_id: '',
  voucher_id: '',
  rules_id: '',
  component_id: '',
}

export const AddVoucherRules: FC = () => {
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<
    {label: string; value: string} | undefined
  >()
  const [selectedVoucher, setSelectedVoucher] = useState<
    {label: string; value: string} | undefined
  >()
  const [selectedRules, setSelectedRules] = useState<
    {label: string; value: string} | undefined
  >()
  const [selectedComponent, setSelectedComponent] = useState<
    {label: string; value: string} | undefined
  >()
  const [business, setBusiness] = useState<any>([])
  const [voucher, setVoucher] = useState<any>([])
  const [rules, setRules] = useState<any>([])
  const [component, setComponent] = useState<any>([])

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
        createVoucherRules(values.bu_id, values.voucher_id, values.rules_id, values.component_id)
          .then(() => {
            setLoading(false)
            setSubmitting(false)
            history.goBack()
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('Add voucher rules failed.')
          })
      }, 1000)
      setLoading(false)
    },
  })

  //start::TITLE_FUNC
  const pageTitle = useMemo(() => VoucherRulesScreens.ADD_VOUCHER_RULES.TITLE, [])

  const breadcrumbs = useMemo(
    () => [
      {
        isActive: false,
        path: VoucherRulesScreens.LIST_VOUCHER_RULES.PATH,
        title: VoucherRulesScreens.LIST_VOUCHER_RULES.TITLE,
      },
      {isActive: false, path: '', title: '', isSeparator: true},
    ],
    []
  )

  const getBusiness = async () => {
    try {
      const masterBusiness = await getBusinessUnitList({})
      const activeBusiness = masterBusiness?.data?.data?.filter(item => item.status === 'active');
      setBusiness(activeBusiness)
    } catch (error) {
      console.error(error)
    }
  }
  const getVoucher = async () => {
    try {
      const voucher = await getVoucherList({})
      const activeVoucher = voucher?.data?.data?.filter(item => item.status === 'active');
      setVoucher(activeVoucher)
    } catch (error) {
      console.error(error)
    }
  }
  const getRules = async () => {
    try {
      const rules = await getMasterRulesList({})
      const activeRules = rules?.data?.data?.filter(rule => rule.status === 'active');
      setRules(activeRules)
    } catch (error) {
      console.error(error)
    }
  }
  const getComponent = async () => {
    try {
      const component = await getMasterComponentList({})
      const activeComponent = component?.data?.data?.filter(item => item.status === 'active');
      setComponent(activeComponent)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    document.title = getTitle(pageTitle)
    getBusiness()
    getVoucher()
    getRules()
    getComponent()
  }, [])
  //end::TITLE_FUNC

  return (
    <div className='card'>
      <PageTitle breadcrumbs={breadcrumbs}>{pageTitle}</PageTitle>
      <div className='card-body'>
        <AlertSuccess message={success} handleClose={() => setSuccess('')} />
        <form className='form w-100' onSubmit={formik.handleSubmit} noValidate>
          <div className='mb-10 col'>
            <div className='col-12 col-md-6 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
               Business Unit<span className='text-danger'>*</span>
              </label>
              <Select
                placeholder='Select Business Unit'
                cacheOptions
                defaultOptions
                components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                value={selectedBusiness}
                options={business.map((data: any) => {
                  return {label: data.bu_name, value: data.bu_id}
                })}
                onChange={(value: any) => {
                  setSelectedBusiness(value)
                  formik.setFieldValue('bu_id', value.value)
                }}
              />
              {formik.touched.bu_id && formik.errors.bu_id && (
                <div className='fv-plugins-message-container mt-3 text-danger'>
                  <span role='alert'>{formik.errors.bu_id}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
               Voucher<span className='text-danger'>*</span>
              </label>
              <Select
                placeholder='Select Voucher'
                cacheOptions
                defaultOptions
                components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                value={selectedVoucher}
                options={voucher.map((data: any) => {
                  return {label: data.voucher_name, value: data.voucher_id}
                })}
                onChange={(value: any) => {
                  setSelectedVoucher(value)
                  formik.setFieldValue('voucher_id', value.value)
                }}
              />
              {formik.touched.voucher_id && formik.errors.voucher_id && (
                <div className='fv-plugins-message-container mt-3 text-danger'>
                  <span role='alert'>{formik.errors.voucher_id}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
               Rules<span className='text-danger'>*</span>
              </label>
              <Select
                placeholder='Select Rules'
                cacheOptions
                defaultOptions
                components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                value={selectedRules}
                options={rules.map((data: any) => {
                  return {label: data.rule_name, value: data.rule_id}
                })}
                onChange={(value: any) => {
                  setSelectedRules(value)
                  formik.setFieldValue('rules_id', value.value)
                }}
              />
              {formik.touched.rules_id && formik.errors.rules_id && (
                <div className='fv-plugins-message-container mt-3 text-danger'>
                  <span role='alert'>{formik.errors.rules_id}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
               Component<span className='text-danger'>*</span>
              </label>
              <Select
                placeholder='Select Component'
                cacheOptions
                defaultOptions
                components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                value={selectedComponent}
                options={component.map((data: any) => {
                  return {label: data.component_name, value: data.component_id}
                })}
                onChange={(value: any) => {
                  setSelectedComponent(value)
                  formik.setFieldValue('component_id', value.value)
                }}
              />
              {formik.touched.component_id && formik.errors.component_id && (
                <div className='fv-plugins-message-container mt-3 text-danger'>
                  <span role='alert'>{formik.errors.component_id}</span>
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
