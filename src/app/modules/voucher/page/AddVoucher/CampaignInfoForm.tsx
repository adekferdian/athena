/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useState,
  ChangeEvent,
  HTMLProps,
  useEffect,
  useContext,
} from 'react';
import InlineSVG from 'react-inlinesvg/esm';
//@ts-ignore
import DatePicker from "react-datepicker";
//@ts-ignore

import InputRadio from 'src/app/components/InputRadio';
import InputText from 'src/app/components/InputText';
import InputNumber from 'src/app/components/InputNumber';
import TextEditor from 'src/app/components/TextEditor';
import CheckboxSwitch from 'src/app/components/CheckboxSwitch';
import LabelAlert from 'src/app/components/LabelAlert';
import InputCheckBox from 'src/app/components/InputCheckBox';
import ImageDropZone from 'src/app/components/ImageDropZone';
import Select from 'react-select';
import TargetUserModal from '../../components/TargetUserModal';
import { FormContext } from '.';
import moment from 'moment';
import { generateVoucher } from '../../redux/VoucherCRUD';
import { getErrorMessage } from 'src/app/utils/api-utils';
import { useHeaderToast } from 'src/app/components/ToastComponent';
var dragula = require('react-dragula');


interface CampaignInfoFormProps extends HTMLProps<HTMLInputElement> {
  nextStep?: (value: any) => void
}

export const CampaignInfoForm = (props: CampaignInfoFormProps) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherQuotaTotal, setVoucherQuotaTotal] = useState('');
  const [voucherQuotaEach, setVoucherQuotaEach] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [chosenUser, setChosenUser] = useState({ value: 'All User', label: 'All User' });
  const [showTargetUserModal, setShowTargetUserModal] = useState(false)
  const [handleTargetUserData, setHandleTargetUserData] = useState<any>(null)
  const [targetUser, setTargetUser] = useState([
    {
      id: 0,
      name: 'Name user',
      phone: '0821548625168',
    }
  ]);

  const options = [
    { value: 'All User', label: 'All User' },
    { value: 'specific', label: 'Specific User' },
    { value: 'existing', label: 'Existing User' },
  ];

  const { addPageToasts } = useHeaderToast()

  // Use for passing form values
  const { voucherForm, setVoucherForm } = useContext(FormContext);

  const renderSectionSelectPlatform = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Select Platform</label>
        <InputRadio
          label="SHOP"
          //@ts-ignore
          checked={voucherForm?.bu_id === 4}
          onClick={() => setVoucherForm({
            ...voucherForm,
            bu_id: 4
          })}
          wrapperClass="col-2"
        />
        <InputRadio
          label="FOOD"
          //@ts-ignore
          checked={voucherForm?.bu_id === 2}
          onClick={() => setVoucherForm({
            ...voucherForm,
            bu_id: 2
          })}
          wrapperClass="col-2"
        />
      </div>
    </div>
  );

  const renderSectionCampaignType = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Campaign Type</label>
        <InputRadio
          label="Voucher"
          //@ts-ignore
          checked={voucherForm?.campaigntype_id === 1}
          onClick={() => setVoucherForm({
            ...voucherForm,
            campaigntype_id: 1
          })}
          wrapperClass="col-2"
        />
        <InputRadio
          label="Discount"
          //@ts-ignore
          checked={voucherForm?.campaigntype_id === 2}
          onClick={() => setVoucherForm({
            ...voucherForm,
            campaigntype_id: 2
          })}
          wrapperClass="col-2"
        />
      </div>
    </div>
  );

  const renderSectionIdentification = () => (
    <div className="card mb-4 p-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Identification</label>
        <div className="col-8">
          <div className="mb-8">
            <InputText
              label="Campaign Name"
              //@ts-ignore
              value={voucherForm?.campaign_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setVoucherForm({
                ...voucherForm,
                campaign_name: e.target.value
              })}
            />
          </div>

          <div className="mb-8">
            <TextEditor
              label="Terms & Condition"
              editorHeight={200}
              //@ts-ignore
              value={voucherForm?.campaign_term}
              onChange={(e) => setVoucherForm({
                ...voucherForm,
                campaign_term: e
              })}
            />
          </div>

          <div className="d-flex gap-3 mb-8">
            <div>
              <InputNumber
                label="Total Voucher Quota"
                //@ts-ignore
                value={voucherForm.voucher_quota}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setVoucherForm({
                  ...voucherForm,
                  voucher_quota: e.target.value
                })}
              />
            </div>
            <div>
              <InputNumber
                label="Quota for each User"
                //@ts-ignore
                value={voucherForm.voucher_quota_user}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setVoucherForm({
                  ...voucherForm,
                  voucher_quota_user: e.target.value
                })}
              />
            </div>
          </div>

          <div className="col-8 pe-10">
            <div className="d-flex mb-2">
              <CheckboxSwitch
                label="Display Voucher"
                wrapperClass="flex-row-reverse w-100"
                labelClass="m-0 fw-bold flex-fill"
                //@ts-ignore
                checked={voucherForm?.display_voucher}
                onClick={() => setVoucherForm({
                  ...voucherForm,
                  //@ts-ignore
                  display_voucher: !voucherForm?.display_voucher
                })}
              />
            </div>
            <p className="text-gray-600 fs-7">
              Matikan jika voucher tidak ingin tampil di platform. Kode voucher akan tetap bisa dipakai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionVoucherCode = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Voucher Code</label>
        <div className="col-8">
          <div className="d-flex">
            <InputRadio
              label="Input Manually"
              //@ts-ignore
              checked={voucherForm.voucher_type === 'manual'}
              onClick={() => setVoucherForm({
                ...voucherForm,
                //@ts-ignore
                voucher_type: 'manual'
              })}
              wrapperClass="col-4"
            />
            <InputRadio
              label="Autogenerate"
              //@ts-ignore
              checked={voucherForm.voucher_type === 'generate'}
              onClick={() => setVoucherForm({
                ...voucherForm,
                //@ts-ignore
                voucher_type: 'generate'
              })}
              wrapperClass="col-4"
            />
          </div>


          {
            //@ts-ignore
            voucherForm.voucher_type === 'manual' && (
              <div className="d-flex mt-6">
                <div className="col-8">
                  <InputText
                    label="Input Voucher Code"
                    //@ts-ignore
                    value={voucherForm?.voucher_code}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setVoucherForm({
                      ...voucherForm,
                      //@ts-ignore
                      voucher_code: e.target.value
                    })}
                    showCharacterCount
                    maxLength={25}
                  />
                </div>
                <div className="col-4">
                  <LabelAlert
                    message="The code is available"
                    className="mt-8 ms-4"
                    alertType="success"
                  />
                </div>
              </div>
            )}
          {
            //@ts-ignore
            voucherForm.voucher_type === 'generate' && (
              <div className="col-8 mt-6">
                <InputCheckBox
                  label="Generate code based on Total Voucher Quota"
                />
                <p className="text-gray-600 fs-7 mt-4">
                  Sistem akan generate kode voucher berdasarkan banyaknya Voucher Quota yang diisi
                </p>
                <button
                  type="button"
                  className={`btn btn-md btn-light-secondary fw-bolder me-4`}
                  onClick={() => {
                    generateVoucher('2311FOOD', 100)
                    .then((res) => {
                      console.log("res generate",res);
                      setVoucherForm({
                        ...voucherForm,
                        //@ts-ignore
                        campaign_mark: res.data.data.campaign_mark
                      })
                      // setVoucherCode(res.data.campaign_mark)
                      // dispatch(GenderRedux.actions.setSuccess('Gender berhasil dihapus.'))
                    })
                    .catch((err) => {
                      // setShowDeclineCampaign(false)
                      addPageToasts({ scheme: 'danger', text: getErrorMessage(err, true) })
                    })
                    
                  }}
                  tabIndex={8}
                >
                  Generate Code
                </button>
                {
                  //@ts-ignore
                  voucherForm.campaign_mark && (
                    <div className="mt-4">
                      <InputText
                        label="Generated Code"
                        //@ts-ignore
                        value={voucherForm.campaign_mark}
                        showCharacterCount
                        maxLength={25}
                        disabled
                      />
                    </div>
                  )}
              </div>
            )}
        </div>
      </div>
    </div>
  );

  const renderSectionValidityPeriod = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Validity Period</label>
        <div className="col-8">
          <div className="d-flex gap-6 mb-6">
            <div>
              <label className="form-label text-gray-700 fs-7">Start Date</label>
              <div className="input-group">
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                />
                <div className="custom-content-input">
                  <InlineSVG src="/media/icons/date.svg" />
                </div>
              </div>
            </div>
            <div>
              <label className="form-label text-gray-700 fs-7">Start Time</label>
              <div className="input-group">
                <DatePicker
                  className="form-control"
                  selected={startTime}
                  onChange={(time: any) => {
                    setStartTime(time)
                    setVoucherForm({
                      ...voucherForm,
                      //@ts-ignore
                      valid_start: moment(startDate).format('YYYY-MM-DD') + " " + moment(time).format('h:mm:ss')
                    })
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm:ss"
                />
                <div className="custom-content-input">
                  <InlineSVG src="/media/icons/time.svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-6">
            <div>
              <label className="form-label text-gray-700 fs-7">End Date</label>
              <div className="input-group">
                <DatePicker
                  className="form-control"
                  selected={endDate}
                  onChange={(date: any) => setEndDate(date)}
                />
                <div className="custom-content-input">
                  <InlineSVG src="/media/icons/date.svg" />
                </div>
              </div>
            </div>
            <div>
              <label className="form-label text-gray-700 fs-7">End Time</label>
              <div className="input-group">
                <DatePicker
                  className="form-control"
                  selected={endTime}
                  onChange={(time: any) => {
                    setEndTime(time)
                    setVoucherForm({
                      ...voucherForm,
                      //@ts-ignore
                      valid_end: moment(endDate).format('YYYY-MM-DD') + " " + moment(time).format('h:mm:ss')
                    })
                  }}
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
    </div>
  );

  const renderSectionTargetUser = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Target User</label>
        <div className="col-10">
          <div className="col-4">
            <label className="form-label">Choose User</label>
            <Select
              defaultValue={chosenUser}
              onChange={(e: any) => {
                setChosenUser(e)
                // setVoucherForm({
                //   ...voucherForm,
                //   //@ts-ignore
                //   target_user: e.value
                // })
              }}
              options={options}
              className="mb-4"
            />
          </div>

          {chosenUser.value !== 'All User' && (
            <div className="col-12">
              <div
                className="d-inline-flex align-items-center btn btn-light-secondary mb-4"
                onClick={() =>
                // setShowTargetUserModal(true)
                {
                  setTargetUser([
                    ...targetUser,
                    {
                      id: Math.random(),
                      name: 'New user',
                      phone: '0821548625168',
                    },
                  ])
                  // setVoucherForm({
                  //   ...voucherForm,
                  //   //@ts-ignore
                  //   target_user_ids: [
                  //     //@ts-ignore
                  //     ...voucherForm.target_user_ids,
                  //     {
                  //       id: Math.random(),
                  //       name: 'New user',
                  //       phone: '0821548625168',
                  //     },
                  //   ]
                  // })
                }
                }
              >
                <InlineSVG src="/media/icons/user.svg" />
                <p className="mb-0 ms-2">Add User</p>
              </div>
              <div className="row mx-0">
                {
                  //@ts-ignore
                  voucherForm.target_user_ids.length > 0 && voucherForm.target_user_ids.map((item, index) => (
                    <div key={`key-${item?.id}`} className="col-3 ps-0 pb-4">
                      <div className="d-flex align-items-center form-card">
                        <div className="w-100">
                          <p className="m-0">{item?.name}</p>
                          <p className="text-gray-600 m-0">{item?.phone}</p>
                        </div>
                        <InlineSVG
                          src="/media/icons/close.svg"
                          onClick={() => {
                            // setVoucherForm({
                            //   ...voucherForm,
                            //   //@ts-ignore
                            //   target_user_ids: voucherForm.target_user_ids.filter((obj) => {
                            //     return obj.id !== item?.id;
                            //   })
                            // })
                            setTargetUser(
                              targetUser.filter((obj) => {
                                return obj.id !== item?.id;
                              })
                            );
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    let condition = document.getElementById('condition');
    let limit = document.getElementById('limit');
    let rules = document.getElementById('rules');
    let result = document.getElementById('result');
    dragula([condition, limit, rules, result], {
      moves: function (el: any, source: any, handle: any, sibling: any) {
        console.log("EL ", el);
        console.log("handle ", handle);
        console.log("source ", source);
        console.log("sibling ", sibling);
        return true; // elements are always draggable by default
      },
      accepts: function (el: any, target: any, source: any, sibling: any) {
        console.log("EL accept ", el);
        console.log("target accept ", target);
        return true; // elements can be dropped in any of the `containers` by default
      },
    });
    var drake = dragula({
      copy: true
    });
    drake.containers.push(result);
    document.getElementById('container-drag')
  })

  const renderSectionRule = () => (
    <div className='row p-0'>
      <div className='col-5' style={{ display: 'inline-block' }}>
        <label className="text-gray-800 fw-bold fs-6 py-2">Condition</label>
        <div id="condition" className="card mb-4 py-12 px-8 container-drag" style={{ marginRight: 5 }}>
          <div className="row py-2">
            <div className="col-12 pb-4">
              <div className="d-flex align-items-center form-card-draggable">
                <div className='col-3 py-8 px-8 d-flex align-items-center justify-content-center bg-primary' style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                  <InlineSVG
                    src="/media/icons/close.svg"
                  />
                </div>
                <div className="w-100 px-4">
                  <p className="m-0">efood</p>
                  <p className="text-gray-600 m-0">provider_corporate</p>
                  <p className="text-gray-600 m-0">VoucherID: MAKANGRATIS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <label className="text-gray-800 fw-bold fs-6 py-2">Limit</label>
        <div id="limit" className="card mb-4 py-12 px-8 container-drag" style={{ marginRight: 5 }}>
          <div className="row py-2">
            <div className="col-12 pb-4">
              <div className="d-flex align-items-center form-card-draggable">
                <div className='col-3 py-8 px-8 d-flex align-items-center justify-content-center bg-primary' style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                  <InlineSVG
                    src="/media/icons/close.svg"
                  />
                </div>
                <div className="w-100 px-4">
                  {/* <p className="m-0">efood</p> */}
                  <p className="text-gray-500 m-0">Min Belanja 20.000</p>
                  <p className="text-gray-800 m-0 fs-16">Min belanja sampai 20.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <label className="text-gray-800 fw-bold fs-6 py-2">Rules</label>
        <div id="rules" className="card mb-4 py-12 px-8 container-drag" style={{ marginRight: 5 }}>
          <div className="row py-2">
            <div className="col-12 pb-4">
              <div className="d-flex align-items-center form-card-draggable">
                <div className='col-3 py-8 px-8 d-flex align-items-center justify-content-center bg-primary' style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                  <InlineSVG
                    src="/media/icons/close.svg"
                  />
                </div>
                <div className="w-100 px-4">
                  <p className="m-0">efood</p>
                  <p className="text-gray-600 m-0">provider_corporate</p>
                  <p className="text-gray-600 m-0">VoucherID: MAKANGRATIS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-5' style={{ display: 'inline-block' }}>
        <label className="text-gray-800 fw-bold fs-6 py-2">Result</label>
        <div id="result" className="card mb-4 py-12 px-8 container-drag" style={{ marginLeft: 5 }}>

        </div>
      </div>
    </div>
  );

  const renderSectionImage = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Image</label>
        <div className="col-8">
          <ImageDropZone
            onDrop={() => { }}
            onClear={() => { }}
            preview="preview"
            title="title"
            message="message"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mt-12">
        <h4>General Information</h4>
        <p className="text-gray-600">Input your voucher information</p>
      </div>

      <div className="mb-10 row">
        {renderSectionSelectPlatform()}
        {renderSectionCampaignType()}
        {renderSectionIdentification()}
        {renderSectionVoucherCode()}
        {renderSectionValidityPeriod()}
        {renderSectionTargetUser()}
        {renderSectionRule()}
        {renderSectionImage()}
      </div>

      <TargetUserModal
        onSave={() => {
          // deleteGender(handleDeleteData?.id ?? '')
          //   .then(() => {
          //     // dispatch(AdminRedux.actions.setSuccess('User berhasil dihapus.'))
          //     setShowDeleteModal(false)
          //   })
          //   .catch((err) => {
          //     setShowDeleteModal(false)
          //     addPageToasts({ scheme: 'danger', text: getErrorMessage(err, true) })
          //   })
        }}
        show={showTargetUserModal}
        handleClose={() => setShowTargetUserModal(false)}
        data={handleTargetUserData}
      />
    </>
  )
}
