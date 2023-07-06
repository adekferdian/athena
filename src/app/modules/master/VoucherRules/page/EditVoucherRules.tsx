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
import VoucherRulesScreens from '../Screens'
import {getVoucherList, getVoucherRulesDetail, updateVoucherRules} from '../redux/VoucherRulesCRUD'
import {getBusinessUnitList} from '../../BusinessUnit/redux/BusinessUnitCRUD'
import {getMasterRulesList} from '../../Rules/redux/MasterRulesCRUD'
import {getMasterComponentList} from '../../Component/redux/MasterComponentCRUD'

const editSchema = Yup.object().shape({
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

const EditVoucherRules: FC = (props: any) => {
  // Variables
  const {id} = useParams<any>()
  const history = useHistory()

  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()
  const [save, setSave] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<any>()
  const [selectedVoucher, setSelectedVoucher] = useState<any>()
  const [selectedRules, setSelectedRules] = useState<any>()
  const [selectedComponent, setSelectedComponent] = useState<any>()
  const [business, setBusiness] = useState<any>([])
  const [voucher, setVoucher] = useState<any>([])
  const [rules, setRules] = useState<any>([])
  const [component, setComponent] = useState<any>([])

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: editSchema,
    onSubmit: (values: any) => {
      saveVoucherRules(values)
    },
  })

  const saveVoucherRules = async (values: any) => {
    formik.setSubmitting(true)
    setLoading(true)
    setTimeout(() => {
      updateVoucherRules(id, values.bu_id ?? data.bu_id, values.voucher_id ?? data.voucher_id, values.rules_id ?? data.rules_id, values.component_id ?? data.component_id)
        .then(() => {
          setLoading(false)
          formik.setSubmitting(false)
          history.goBack()
        })
        .catch(() => {
          setSave(false)
          setLoading(false)
          formik.setSubmitting(false)
          formik.setStatus('Update Voucher Rules Failed.')
        })
    }, 1000)
  }

  //start::TITLE_FUNC
  const pageTitle = useMemo(() => VoucherRulesScreens.EDIT_VOUCHER_RULES.TITLE, [])

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
  console.log('data', data, selectedBusiness, selectedComponent, selectedRules, selectedVoucher)

  const getBusiness = async () => {
    try {
      const masterBusiness = await getBusinessUnitList({})
      const activeBusiness = masterBusiness?.data?.data?.filter((item) => item.status === 'active')
      setBusiness(activeBusiness)
    } catch (error) {
      console.error(error)
    }
  }
  const getVoucher = async () => {
    try {
      const voucher = await getVoucherList({})
      const activeVoucher = voucher?.data?.data?.filter((item) => item.status === 'active')
      setVoucher(activeVoucher)
    } catch (error) {
      console.error(error)
    }
  }
  const getRules = async () => {
    try {
      const rules = await getMasterRulesList({})
      const activeRules = rules?.data?.data?.filter((rule) => rule.status === 'active')
      setRules(activeRules)
    } catch (error) {
      console.error(error)
    }
  }
  const getComponent = async () => {
    try {
      const component = await getMasterComponentList({})
      const activeComponent = component?.data?.data?.filter((item) => item.status === 'active')
      setComponent(activeComponent)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const detail = await getVoucherRulesDetail(id);
        const data = detail?.data?.data ?? null;
        setData(data);
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [id])

  useEffect(() => {
    if (data) {
      console.log(data.bu_id);

      setSelectedBusiness({
        label: data.business_unit?.bu_name,
        value: data.bu_id,
      });

      setSelectedVoucher({
        label: data.voucher?.voucher_name,
        value: data.voucher_id,
      });

      setSelectedRules({
        label: data.rules?.rule_name,
        value: data.rules_id,
      });

      setSelectedComponent({
        label: data.component?.component_name,
        value: data.component_id,
      });

      formik.setFieldValue('bu_id', data.bu_id);
      formik.setFieldValue('voucher_id', data.voucher_id);
      formik.setFieldValue('rules_id', data.rules_id);
      formik.setFieldValue('component_id', data.component_id);
    }
  }, [data]);

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

export {EditVoucherRules}
