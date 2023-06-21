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
import VoucherScreens from '../../Screens'
import InlineSVG from 'react-inlinesvg/esm'
import { CampaignInfoForm } from './CampaignInfoForm'
import { DiscountUsageForm } from './DiscountUsageForm'
//@ts-ignore
import DatePicker from "react-datepicker";
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
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
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
    setSelectedStatus({ label: 'inactive', value: 2 })
    // setSelectedStatus({label: 'active', value: detail.data.data?.status ?? 1})

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
    { id: 3, text: "Rules" }
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

  const renderDiscount = () => {
    return (
      <div>
        <div className='card mb-5'>
          <div className='row mt-5 mb-5 p-5'>
            <div className='col-2'>
              <span className='text-gray-800 fw-bold' style={{ fontSize: 14 }}>Discount</span> <br />
              <span className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>Maksimal 2 strata</span>
            </div>
            <div className="col-2 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Minimum Transaction
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="col-2 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Maximum Transaction (Optional)
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="col-3 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Discount
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                <select className="form-select form-select-solid" aria-label="Select example">
                  <option value="1" style={{ fontSize: 10 }}>Percentage %</option>
                  <option value="2">Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-3 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Maximum Discount (Optional)
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                <select className="form-select form-select-solid" aria-label="Select example">
                  <option value="1">Percentage %</option>
                  <option value="2">Inactive</option>
                </select>
              </div>
            </div>
            <div className='col-2' />
            <div className="col-2 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Minimum Transaction
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="col-2 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Maximum Transaction (Optional)
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="col-3 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Discount
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                <select className="form-select form-select-solid" aria-label="Select example">
                  <option value="1" style={{ fontSize: 10 }}>Percentage %</option>
                  <option value="2">Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-3 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Maximum Discount (Optional)
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                <select className="form-select form-select-solid" aria-label="Select example">
                  <option value="1">Percentage %</option>
                  <option value="2">Inactive</option>
                </select>
              </div>
            </div>
            <div className='col-2' />
            <div className="col-2 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Minimum Transaction
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="col-2 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Maximum Transaction (Optional)
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="col-3 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Discount
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                <select className="form-select form-select-solid" aria-label="Select example">
                  <option value="1" style={{ fontSize: 10 }}>Percentage %</option>
                  <option value="2">Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-3 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label className='text-gray-600 fw-bold' style={{ fontSize: 12 }}>
                Maximum Discount (Optional)
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">Rp</span>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                <select className="form-select form-select-solid" aria-label="Select example">
                  <option value="1">Percentage %</option>
                  <option value="2">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='card mb-5'>
          <div className='row mt-5 mb-5 p-5'>
            <div className='col-2'>
              <span className='text-gray-800 fw-bold' style={{ fontSize: 14 }}>Covered by</span> <br />
            </div>
            <div className="col-4 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label style={{ fontSize: 14 }}>
                Seller/Merchant
              </label>
              <span className='text-gray-600 fw-bold'>Biaya diskon ditanggung oleh Seller/Merchant</span>
              <div className="input-group mb-5">
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                <span className="input-group-text" id="basic-addon1">Percentage %</span>
              </div>
            </div>
            <div className="col-4 form-check form-check-custom form-check-solid" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label style={{ fontSize: 12 }}>
                eDOT
              </label>
              <span className='text-gray-600 fw-bold'>Biaya diskon ditanggung oleh pihak eDOT</span>
              <div className="input-group mb-5">
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                <span className="input-group-text" id="basic-addon1">Percentage %</span>
              </div>
            </div>
          </div>
        </div>
        <div className='card mb-5'>
          <div className='row mt-5 mb-5 p-5'>
            <div className='col-2'>
              <span className='text-gray-800 fw-bold' style={{ fontSize: 14 }}>Voucher Usage</span>
            </div>
            <div className='col-10' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>How to Use</span>
            </div>
            <div className='col-2'></div>
            <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Auto Apply</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Jika T&C memenuhi syarat maka voucher secara otomatis terapply dan bisa diuncheck dan bisa memilih voucher lain yang lebih menguntungkan</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>
            <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Manually</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>User harus memilih sendiri voucher yang ingin dia gunakan</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>

            <div className='col-2' />
            <div className='col-10' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Voucher type</span>
            </div>
            <div className='col-2'></div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Shopping</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Diskon berlaku untuk pembelian produk </span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Shipment</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Berlaku untuk potongan ongkos kirim </span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Cashback</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Berlaku sebagai cashback </span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>

            <div className='col-2' />
            <div className='col-10' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Applies to</span>
            </div>
            <div className='col-2'></div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Total Cart</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Total harga semua produk di keranjang sebelum biaya ongkir, transaksi, diskon dll</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Total payment before discount</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Termasuk ongkir, biaya transaksi. Sebelum dikurangi diskon yang ada, seperti SKU, IPT dll</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Total payment after discount</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Termasuk ongkir, biaya transaksi. Setelah dikurangi diskon yang ada, seperti SKU, IPT dll</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>

            <div className='col-2' />
            <div className='col-10' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Transaction Type</span>
            </div>
            <div className='col-2'></div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>All Transaction</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Diskon berlaku untuk semua transaksi</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>First Transaction</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Diskon hanya berlaku untuk  transaksi pertama</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Second and Following</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Diskon berlaku untuk transaksi kedua dan berikutnya</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>

            <div className='col-2'></div>
            <div className='col-10 mb-5 row'>
              <div className='col-5 mt-5 p-0'>
                <label className="form-label text-gray-800" style={{ fontWeight: 'bold', fontSize: 12 }}>OTP Validation Required</label>
              </div>
              <div className='col-2 mt-5 p-0 d-flex'>
                <div className="form-check form-switch form-check-custom form-check-solid">
                  <input className="form-check-input" type="checkbox" value={displayVoucher} id="flexSwitchChecked" checked={displayVoucher == 1} onChange={onValueChangeDisplay} />
                </div>
              </div>
              <div className='col-8 p-0'>
                <span className="text-gray-600 fs-7">Jika Aktif, maka untuk menggunakan voucher akan tampil permintaan OTP</span>
              </div>
            </div>

            <div className='col-2'></div>
            <div className='col-10 mb-5 row'>
              <div className='col-5 mt-5 p-0'>
                <label className="form-label text-gray-800" style={{ fontWeight: 'bold', fontSize: 12 }}>Allow Combination with Other Voucher</label>
              </div>
              <div className='col-2 mt-5 p-0 d-flex'>
                <div className="form-check form-switch form-check-custom form-check-solid">
                  <input className="form-check-input" type="checkbox" value={displayVoucher} id="flexSwitchChecked" checked={displayVoucher == 1} onChange={onValueChangeDisplay} />
                </div>
              </div>
              <div className='col-8 p-0'>
                <span className="text-gray-600 fs-7">Pilih jenis voucher yang bisa dipakai bersama voucher ini</span>
              </div>
            </div>

            <div className='col-2' />
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Shopping</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Kombinasi dengan voucher pembelian produk</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Shipment</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Kombinasi dengan voucher ongkos kirim</span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>
            <div className="d-flex row col-3 mb-5 border border-gray-400" style={{ borderRadius: 10, padding: 5, marginRight: 20, marginLeft: 0 }}>
              <div className='col-10 d-flex' style={{ flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', fontSize: 12 }}>Cashback</label>
                <span className='text-gray-600 fw-bold' style={{ fontSize: 10 }}>Kombinasi dengan voucher cashback </span>
              </div>
              <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input" type="radio" value="" id="flexRadioChecked" checked={true} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

  const renderRules = () => {
    return (
      <div>
        <div className='card mb-5'>
          <div className='row mt-5 mb-5 p-5'>
            {/* VIA KURIR */}
            <div className='col-4 row'>
              <span className='text-gray-800 fw-bold' style={{ fontSize: 14 }}>Choose which rule</span>
            </div>
            <div className='col-8' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Via Courier</span>
            </div>

            <div className='col-4 row'>
              <div className="d-flex row col-7 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 10, marginLeft: 0 }}>
                <select className="form-select form-select-white mr-5" aria-label="Select example" style={{ width: '100%', height: 20, padding: 0, paddingRight: 30 }}>
                  <option value="1">Payment Method</option>
                  <option value="2">Logistic</option>
                  <option value="3">Time can be claimed</option>
                </select>
              </div>
              <div className="d-flex row col-4 mb-5" >
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10, marginLeft: 20 }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/setting.svg' />
                  </div>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/trash.svg' />
                  </div>
                </div>
              </div>
            </div>

            <div className='col-8 row p-0' style={{ marginLeft: 0 }}>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>Bayar cash di tempat</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
            </div>

            {/* VIRTUAL */}
            <div className='col-4 row' />
            <div className='col-8' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Virtual Account</span>
            </div>

            <div className='col-4 row' />
            <div className='col-8 row p-0' style={{ marginLeft: 0 }}>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>BCA Virtual Account</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>BNI Virtual Account</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>Mandiri Virtual Account</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
            </div>

            {/* Pembayaran Instan */}
            <div className='col-4 row' />
            <div className='col-8' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Pembayaran Instan</span>
            </div>

            <div className='col-4 row' />
            <div className='col-8 row p-0' style={{ marginLeft: 0 }}>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>QRIS</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>OVO</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>DANA</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>Link Aja</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>Shopee Pay</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='card mb-5'>
          <div className='row mt-5 mb-5 p-5'>
            <div className='col-4 row'>
              <span className='text-gray-800 fw-bold' style={{ fontSize: 14 }}>Choose which rule</span>
            </div>
            <div className='col-8' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Instan</span>
            </div>

            <div className='col-4 row'>
              <div className="d-flex row col-7 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 10, marginLeft: 0 }}>
                <select className="form-select form-select-white mr-5" aria-label="Select example" style={{ width: '100%', height: 20, padding: 0, paddingRight: 30 }}>
                  <option value="1">Logistic</option>
                  <option value="2">Payment Method</option>
                  <option value="3">Time can be claimed</option>
                </select>
              </div>
              <div className="d-flex row col-4 mb-5" >
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10, marginLeft: 20 }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/setting.svg' />
                  </div>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/trash.svg' />
                  </div>
                </div>
              </div>
            </div>

            <div className='col-8 row p-0' style={{ marginLeft: 0 }}>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>LOG by eDOT</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>Gojek</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
            </div>

            {/* Next Day */}
            <div className='col-4 row' />
            <div className='col-8' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Next Day</span>
            </div>

            <div className='col-4 row' />
            <div className='col-8 row p-0' style={{ marginLeft: 0 }}>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>AnterAja</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>JNE</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
            </div>

            {/* Reguler */}
            <div className='col-4 row' />
            <div className='col-8' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Reguler</span>
            </div>

            <div className='col-4 row' />
            <div className='col-8 row p-0' style={{ marginLeft: 0 }}>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>AnterAja</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>JNE Reg</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>J&T</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
            </div>

            {/* Kargo */}
            <div className='col-4 row' />
            <div className='col-8' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Kargo</span>
            </div>

            <div className='col-4 row' />
            <div className='col-8 row p-0' style={{ marginLeft: 0 }}>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>AnterAja</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
              <div className="d-flex row col-4 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 20, marginLeft: 0 }}>
                <div className='col-2 d-flex' style={{ alignItems: 'center' }}>
                  <img src="/media/icons/payment/cod.png" alt="" className='image-voucher' style={{ width: 20, height: 10 }} />
                </div>
                <div className='col-8 d-flex' style={{ alignItems: 'center' }}>
                  <span className='text-gray-800 fw-bold' style={{ fontSize: 10 }}>JNE</span>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/close.svg' />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='card mb-5'>
          <div className='row mt-5 mb-5 p-5'>
            <div className='col-4 row'>
              <span className='text-gray-800 fw-bold' style={{ fontSize: 14 }}>Choose which rule</span>
              {/* </div> */}
              {/* <div className='col-8' style={{ padding: 0 }}>
              <span className='text-gray-600 fw-bold'>Instan</span>
            </div> */}

              {/* <div className='col-4 row'> */}
              <div className="d-flex row col-7 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 10, marginLeft: 0 }}>
                <select className="form-select form-select-white mr-5" aria-label="Select example" style={{ width: '100%', height: 20, padding: 0, paddingRight: 30 }}>
                  <option value="1">Time can be claimed</option>
                  <option value="2">Payment Method</option>
                  <option value="3">Logistic</option>
                </select>
              </div>
              <div className="d-flex row col-4 mb-5" >
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10, marginLeft: 20 }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/setting.svg' />
                  </div>
                </div>
                <div className='col-2 d-flex' style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="form-check form-check-custom form-check-solid">
                    <InlineSVG src='/media/icons/trash.svg' />
                  </div>
                </div>
              </div>
            </div>

            <div className='col-8 row p-0'>
              <div className='col-4'>
                <span className='text-gray-600 fw-bold'>Instan</span>
                <div className="d-flex row col-12 mb-5 border border-gray-400" style={{ borderRadius: 8, padding: 10, marginRight: 10, marginLeft: 0 }}>
                  <select className="form-select form-select-white mr-5" aria-label="Select example" style={{ width: '100%', height: 20, padding: 0, paddingRight: 30 }}>
                    <option value="1">Rush Hour</option>
                  </select>
                </div>
              </div>

              <div className='col-3'>
                <span className='text-gray-600 fw-bold'>Instan</span>
                <div className="input-group">
                  <DatePicker
                    className="form-control"
                    selected={startTime}
                    onChange={(time: any) => setStartTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                  <div className="custom-content-input">
                    <InlineSVG src="/media/icons/time.svg" />
                  </div>
                </div>
              </div>

              <div className='col-3'>
                <span className='text-gray-600 fw-bold'>Instan</span>
                <div className="input-group">
                  <DatePicker
                    className="form-control"
                    selected={endTime}
                    onChange={(time: any) => setEndTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                  <div className="custom-content-input">
                    <InlineSVG src="/media/icons/time.svg" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='card mb-5'>
          <div className='row mt-5 mb-5 p-5'>
            <div className='col-12 border-grey-300 border-dashed p-2 d-flex' style={{ borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
              <span className='text-secondary'>Add New Rule</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='body-edit-campaign'>
      <PageTitle breadcrumbs={breadcrumbs}>{pageTitle}</PageTitle>
      {/* <div className='card-body'> */}
      <AlertSuccess message={success} handleClose={() => setSuccess('')} />
      <form className='form w-100' onSubmit={formik.handleSubmit} noValidate>
        <div className='mb-10 row'>
          <div className='card mb-5 pt-5' style={{ paddingLeft: 25 }}>
            <div className='fv-row'>
              <div className='mb-4'>
                <h2>Diskon April Seru 20%</h2>
              </div>
              <div className='d-flex'>
                <span className='mt-2 text-gray-600'>Voucher Status</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className='d-flex border p-2 status-badge' style={{ display: 'inline-block' }}>
                  <div className='d-flex' style={{ width: 20, alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}>
                    <div className='circle' style={{ width: 10, height: 10, marginRight: 5 }} />
                  </div>
                  {/* <span className="text-success">
                    Active
                  </span> */}
                  <select className="form-select form-select-white mr-5" aria-label="Select example" style={{ width: '100%', height: 20, padding: 0, paddingRight: 30, color: '#01874E' }}>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                  </select>
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
          {
            activeId === 1 ? <CampaignInfoForm /> :
              activeId === 2 ? <DiscountUsageForm /> :
                activeId === 3 ? renderRules() : null
          }
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
