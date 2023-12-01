/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import { PageTitle } from 'src/_metronic/layout/core'
import { getTitle } from 'src/app/utils/title-utils'
// import {RolePlatform} from '../../role-management/models/Role'
import AlertSuccess from 'src/app/components/AlertSuccess'
import { NavLink, useParams } from 'react-router-dom'
// import Select from 'react-select'
// import {ReactSelectMetronicTheme} from 'src/app/components/CustomReactSelect'
// import {SelectComponentsConfig} from 'react-select'
import VoucherScreens from '../Screens'
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
//@ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InlineSVG from 'react-inlinesvg/esm'
//@ts-ignore
import DatePicker from "react-datepicker";
//@ts-ignore
// import TimePicker from 'react-times';
import { TimePicker } from 'react-ios-time-picker';

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import "react-datepicker/dist/react-datepicker.css";
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
// import {getvoucherDetail, updatevoucher} from '../redux/voucherCRUD'

const initialValues = {
  voucher: '',
  status: '',
}

export const EditVoucher = () => {
  // States
  // const [status, setStatus] = useState(false)

  const [displayVoucher, setDisplayVoucher] = useState(1)
  const [selectPlatform, setSelectPlatform] = useState('SHOP')
  const [selectCampaign, setSelectCampaign] = useState('VOUCHER')
  const [success, setSuccess] = useState('')
  const [activeId, setActiveId] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState('10:00');
  // const [role, setRole] = useState<{label: string; value: string}[]>([])
  // const [sentData, setSentData] = useState<undefined | SentDataModel>(undefined)
  // const [passwordModal, setPasswordModal] = useState(false)
  // const [emailModal, setEmailModal] = useState(false)
  // const [phoneModal, setPhoneModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<{ label: string; value: number } | undefined>()
  const statList = [
    { label: 'active', value: 1 },
    { label: 'inactive', value: 0 },
  ]
  // Variables
  const { id } = useParams<any>()
  const history = useHistory()
  // const {data}: any = useSelector<RootState>(({admin}) => admin, shallowEqual)
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: any, { setStatus, setSubmitting }) => {
      setSubmitting(true)
      // setTimeout(() => {
      //   updatevoucher(id, voucher, selectedStatus?.value ?? values.status)
      //     .then(() => {
      //       // dispatch(voucherRedux.actions.setSuccess('Data berhasil disimpan.'))
      //       history.goBack()
      //     })
      //     .catch(() => {
      //       setSubmitting(false)
      //       setStatus('Update Sport gagal.')
      //     })
      // }, 1000)
    },
  })
  useEffect(() => {
    //   const getData = async () => {
    //     try {
    //       const detail = await getvoucherDetail(id)
    //       setVoucher(detail.data.data?.description ?? '')
    //       detail.data.data?.status === 0
    //         ? setSelectedStatus({label: 'inactive', value: detail.data.data?.status})
    //         : setSelectedStatus({label: 'active', value: detail.data.data?.status ?? 1})

    //       formik.setFieldValue('voucher', detail.data.data?.description)
    //       formik.setFieldValue('status', selectedStatus)
    //     } catch (error) {}
    //   }

    //   getData()
  }, [])
  //start::TITLE_FUNC
  const pageTitle = useMemo(() => VoucherScreens.EDIT_VOUCHER.TITLE, [])

  const breadcrumbs = useMemo(
    () => [
      {
        isActive: false,
        path: VoucherScreens.VOUCHER_LIST.PATH,
        title: VoucherScreens.VOUCHER_LIST.TITLE,
      },
      { isActive: false, path: '', title: '', isSeparator: true },
    ],
    []
  )

  useEffect(() => {
    document.title = getTitle(pageTitle)
  }, [])
  //end::TITLE_FUNC

  const values = [
    { id: 1, text: "General information" },
    { id: 2, text: "Discount & Usage" },
    { id: 3, text: "Rules" },
    { id: 4, text: "Note (0)" }
  ];

  const onValueChangePlatform = (event: any) => {
    console.log('event ', event);

    setSelectPlatform(event?.target?.defaultValue)
  }

  const onValueChangeCampaign = (event: any) => {
    console.log('event ', event);

    setSelectCampaign(event?.target?.defaultValue)
  }

  const onValueChangeDisplay = (event: any) => {
    console.log('event ', event);

    setDisplayVoucher(event?.target?.defaultValue == 1 ? 0 : 1)
  }

  const onChange = (timeValue: any) => {
    setValue(timeValue);
  }

  return (
    <div className=''>
      <PageTitle breadcrumbs={breadcrumbs}>{pageTitle}</PageTitle>
      {/* <div className='card-body'> */}
      <AlertSuccess message={success} handleClose={() => setSuccess('')} />
      <form className='form w-100' onSubmit={formik.handleSubmit} noValidate>
        <div className='mb-10 row'>
          <div className='card mb-5 pt-5'>
            <div className='fv-row'>
              <div className='mb-4'>
                <h2>Diskon April Seru 20%</h2>
              </div>
              <div className='d-flex'>
                <span className='mt-2 text-gray-600'>Voucher Status</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className='d-flex w-75px h-35px border p-2 status-badge'>
                  <div className='circle' />
                  <span className="text-success">
                    Active</span>
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-between margin-tab-modal' id='navbar'>
                <ul className="nav">
                  {values.map((val, index) => (
                    //@ts-ignore
                    <li key={index} className="nav-item" onClick={() => setActiveId(val.id)}>
                      <NavLink exact activeClassName={activeId === val.id ? "nav-active-modal" : "nav-link text-gray-600"} to='#' >{val.text}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='card mb-5'>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fw-bold fs-7'>Select Platform</div>
              <div className="col-1 form-check form-check-custom form-check-solid">
                <input className="form-check-input" type="radio" value="SHOP" id="flexRadioDefault" checked={selectPlatform == "SHOP"} onChange={onValueChangePlatform} />
                <label className="form-check-label">
                  SHOP
                </label>
              </div>
              <div className="col-1 form-check form-check-custom form-check-solid">
                <input className="form-check-input" type="radio" value="FOOD" id="flexRadioDefault" checked={selectPlatform == "FOOD"} onChange={onValueChangePlatform} />
                <label className="form-check-label">
                  FOOD
                </label>
              </div>
            </div>
          </div>
          <div className='card mb-5'>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fw-bold fs-7'>Campaign type</div>
              <div className="col-1 form-check form-check-custom form-check-solid">
                <input className="form-check-input" type="radio" value="VOUCHER" id="flexRadioDefault" checked={selectCampaign == "VOUCHER"} onChange={onValueChangeCampaign} />
                <label className="form-check-label">
                  Voucher
                </label>
              </div>
              <div className="col-1 form-check form-check-custom form-check-solid">
                <input className="form-check-input" type="radio" value="DISCOUNT" id="flexRadioDefault" checked={selectCampaign == "DISCOUNT"} onChange={onValueChangeCampaign} />
                <label className="form-check-label">
                  Discount
                </label>
              </div>
            </div>
          </div>
          <div className='card mb-5'>
            <div className="row mb-5 pt-5">
              <div className='col-2 text-gray-800 fw-bold fs-7'>Identification</div>
              <div className='col-8'>
                <label className="form-label">Campaign Name</label>
                <input
                  type="text"
                  className="form-control"
                  value='Discount April Seru 20%'
                />
              </div>
            </div>
            <div className="row mb-5 pt-5">
              <div className='col-2'></div>
              <div className='col-8'>
                <div className="App">
                  <label className="form-label">Terms & Condition</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam"
                    onReady={(editor: any) => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event: any, editor: any) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event: any, editor: any) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event: any, editor: any) => {
                      console.log('Focus.', editor);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-5 pt-5">
              <div className='col-2'></div>
              <div className='col-4'>
                <label className="form-label">Total Voucher Quota</label>
                <input
                  type="text"
                  className="form-control"
                  value='200'
                />
              </div>
              <div className='col-4'>
                <label className="form-label">Quota for each User </label>
                <input
                  type="text"
                  className="form-control"
                  value='1'
                />
              </div>
            </div>
            <div className="row mb-10 pt-5">
              <div className='col-2'></div>
              <div className='row col-8'>
                <div className='col-5'>
                  <label className="form-label">Display Voucher </label>
                </div>
                <div className='col-5'>
                  <div className="form-check form-switch form-check-custom form-check-solid">
                    <input className="form-check-input" type="checkbox" value={displayVoucher} id="flexSwitchChecked" checked={displayVoucher == 1} onChange={onValueChangeDisplay} />
                  </div>
                </div>
                <div className='col-8'>
                  <span className="text-gray-600 fs-7">Matikan jika voucher tidak ingin tampil di platform. Kode voucher akan tetap bisa dipakai.</span>
                </div>
              </div>
            </div>
          </div>
          <div className='card mb-5'>
            <div className='row mt-12'>
              <div className='col-2 text-gray-800 fw-bold fs-7'>Voucher Code</div>
              <div className="col-2 form-check form-check-custom form-check-solid">
                <input className="form-check-input" type="radio" value="VOUCHER" id="flexRadioDefault" checked={selectCampaign == "VOUCHER"} onChange={onValueChangeCampaign} />
                <label className="form-check-label">
                  Input Manually
                </label>
              </div>
              <div className="col-2 form-check form-check-custom form-check-solid">
                <input className="form-check-input" type="radio" value="DISCOUNT" id="flexRadioDefault" checked={selectCampaign == "DISCOUNT"} onChange={onValueChangeCampaign} />
                <label className="form-check-label">
                  Autogenerate
                </label>
              </div>
            </div>
            <div className='row mt-10 mb-12'>
              <div className='col-2 text-gray-800 fw-bold fs-7'></div>
              <div className="col-8 form-check form-check-custom form-check-solid">
                <div className="input-group">
                  <input type="text" className="form-control input-generate" value="200 Voucher Codes Generated" />
                  <div className='custom-content-input'>
                    <span className="" id="basic-addon2">Preview</span>&nbsp;
                    <span className="text-gray-400" id="basic-addon2">|</span>&nbsp;
                    <InlineSVG src='/media/icons/download.svg' />&nbsp;&nbsp;
                    <InlineSVG src='/media/icons/trash.svg' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card mb-5'>
            <div className='row mt-12'>
              <div className='col-2 text-gray-800 fw-bold fs-7'>Validity Period</div>
              <div className="col-4">
                <div className="input-group">
                  <label className="form-label text-gray-700 fs-7">Start Date</label>
                  <DatePicker className="form-control" selected={startDate} onChange={(date: any) => setStartDate(date)} />
                  <div className='custom-content-date'>
                    <InlineSVG src='/media/icons/date.svg' />
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="form-label text-gray-700 fs-7">Start Time</label>
                  <TimePicker className="form-control" onChange={onChange} value={value} />
                  <div className='custom-content-time'>
                    <InlineSVG src='/media/icons/time.svg' />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-12'>
              <div className='col-2 text-gray-800 fw-bold fs-7'></div>
              <div className="col-4">
                <div className="input-group">
                  <label className="form-label text-gray-700 fs-7">End Date</label>
                  <DatePicker className="form-control" selected={startDate} onChange={(date: any) => setStartDate(date)} />
                  <div className='custom-content-date'>
                    <InlineSVG src='/media/icons/date.svg' />
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="form-label text-gray-700 fs-7">End Time</label>
                  <TimePicker onChange={onChange} value={value} />
                  <div className='custom-content-time'>
                    <InlineSVG src='/media/icons/time.svg' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card mb-5'>
            <div className="row mb-5 pt-5">
              <div className='col-2 text-gray-800 fw-bold fs-7'>Target User</div>
              <div className='col-4'>
                <label className="form-label">Choose User</label>
                <select className="form-select mb-5" aria-label="Select example">
                  <option>Spesific User</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button className="btn btn-light-secondary mb-5">
                  <InlineSVG src='/media/icons/user.svg' />
                  &nbsp;
                  <span>Add User</span>
                </button>
                <div className='col-8'>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                  />
                  <div className='custom-content-input-user'>
                    <span className='text-gray-800 fw-bold fs-7'>Nama user</span><br />
                    <span className='text-gray-500 fs-7'>0821548625168</span>
                  </div>
                  <button className='custom-content-icon-input-user'>
                    <InlineSVG src='/media/icons/close.svg' />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='col-12 col-md-6'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Status*</label>
              <Select
                placeholder='Select'
                cacheOptions
                defaultOptions
                components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                value={selectedStatus}
                options={statList}
                // onChange={(value: any) => {
                //   setSelectedStatus(value)
                //   formik.setFieldValue('status', value.value)
                // }}
                tabIndex='5'
              />
            </div> */}
        </div>

        <div className='card border-top pt-10 cardfooter-btns'>
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
      {/* </div> */}
    </div>
  )
}
