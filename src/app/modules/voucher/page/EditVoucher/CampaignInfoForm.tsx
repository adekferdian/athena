/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useState,
  ChangeEvent,
  HTMLProps,
  // useContext,
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
// import ImageDropZone from 'src/app/components/ImageDropZone';
// import { FormContext } from './index';

interface CampaignInfoFormProps extends HTMLProps<HTMLInputElement> {
  nextStep?: (value: any) => void
}

export const CampaignInfoForm = (props: CampaignInfoFormProps) => {
  const [selectPlatform, setSelectPlatform] = useState('SHOP');
  const [selectCampaign, setSelectCampaign] = useState('VOUCHER');
  const [campaignName, setCampaignName] = useState('');
  const [voucherQuotaTotal, setVoucherQuotaTotal] = useState('');
  const [voucherQuotaEach, setVoucherQuotaEach] = useState('');
  const [voucherCodeType, setVoucherCodeType] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherGeneratedCode, setVoucherGeneratedCode] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [chosenUser, setChosenUser] = useState('all');
  const [targetUser, setTargetUser] = useState([
    {
      id: 0,
      name: 'Name user',
      phone: '0821548625168',
    }
  ]);

  // Use for passing form values
  // const contextState = useContext(FormContext);

  const renderSectionSelectPlatform = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Select Platform</label>
        <InputRadio
          label="SHOP"
          checked={selectPlatform === 'SHOP'}
          onClick={() => setSelectPlatform('SHOP')}
          wrapperClass="col-2"
        />
        <InputRadio
          label="FOOD"
          checked={selectPlatform === 'FOOD'}
          onClick={() => setSelectPlatform('FOOD')}
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
          checked={selectCampaign === 'VOUCHER'}
          onClick={() => setSelectCampaign('VOUCHER')}
          wrapperClass="col-2"
        />
        <InputRadio
          label="Discount"
          checked={selectCampaign === 'DISCOUNT'}
          onClick={() => setSelectCampaign('DISCOUNT')}
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
              value={campaignName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCampaignName(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <TextEditor
              label="Terms & Condition"
              editorHeight={200}
              value="test"
              onChange={() => { }}
            />
          </div>

          <div className="d-flex gap-3 mb-8">
            <div>
              <InputNumber
                label="Total Voucher Quota"
                value={voucherQuotaTotal}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setVoucherQuotaTotal(e.target.value)}
              />
            </div>
            <div>
              <InputNumber
                label="Quota for each User"
                value={voucherQuotaEach}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setVoucherQuotaEach(e.target.value)}
              />
            </div>
          </div>

          <div className="col-8 pe-10">
            <div className="d-flex mb-2">
              <CheckboxSwitch
                label="Display Voucher"
                wrapperClass="flex-row-reverse w-100"
                labelClass="m-0 fw-bold flex-fill"
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
              checked={voucherCodeType === 'MANUAL'}
              onClick={() => setVoucherCodeType('MANUAL')}
              wrapperClass="col-4"
            />
            <InputRadio
              label="Autogenerate"
              checked={voucherCodeType === 'AUTO'}
              onClick={() => setVoucherCodeType('AUTO')}
              wrapperClass="col-4"
            />
          </div>

          {voucherCodeType === 'MANUAL' && (
            <div className="d-flex mt-6">
              <div className="col-8">
                <InputText
                  label="Input Voucher Code"
                  value={voucherCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setVoucherCode(e.target.value)}
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
          {voucherCodeType === 'AUTO' && (
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
                onClick={() => setVoucherGeneratedCode('2311FOOD')}
                tabIndex={8}
              >
                Generate Code
              </button>
              {voucherGeneratedCode && (
                <div className="mt-4">
                  <InputText
                    label="Generated Code"
                    value={voucherGeneratedCode}
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
            <div className='col-4'>
              <label className="form-label text-gray-700 fs-7">Start Date</label>
              <div className="input-group">
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                  dateFormat="dd MMMM yyyy"
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
                  onChange={(date: any) => setStartTime(date)}
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

          <div className="d-flex gap-6">
            <div className='col-4'>
              <label className="form-label text-gray-700 fs-7">End Date</label>
              <div className="input-group">
                <DatePicker
                  className="form-control"
                  selected={endDate}
                  onChange={(date: any) => setEndDate(date)}
                  dateFormat="dd MMMM yyyy"
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
                  onChange={(date: any) => setEndTime(date)}
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
            <select
              className="form-select mb-4"
              aria-label="Select example"
              onChange={(e) => setChosenUser(e.target.value)}
            >
              <option value="all">All User</option>
              <option value="specific">Specific User</option>
              <option value="existing">Existing User</option>
            </select>
          </div>

          {chosenUser !== 'all' && (
            <div className="col-12">
              <div
                className="d-inline-flex align-items-center btn btn-light-secondary mb-4"
                onClick={() => setTargetUser([
                  ...targetUser,
                  {
                    id: Math.random(),
                    name: 'New user',
                    phone: '0821548625168',
                  },
                ])}
              >
                <InlineSVG src="/media/icons/user.svg" />
                <p className="mb-0 ms-2">Add User</p>
              </div>
              <div className="row mx-0">
                {targetUser?.length > 0 && targetUser?.map((item, index) => (
                  <div key={`key-${item?.id}`} className="col-3 ps-0 pb-4">
                    <div className="d-flex align-items-center form-card">
                      <div className="w-100">
                        <p className="m-0">{item?.name}</p>
                        <p className="text-gray-600 m-0">{item?.phone}</p>
                      </div>
                      <InlineSVG
                        src="/media/icons/close.svg"
                        onClick={() => {
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

  const renderSectionImage = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Image</label>
        <div className="col-8 row border-primary-300 border-dashed card-image-voucher">
          {/* <ImageDropZone
            onDrop={() => {}}
            onClear={() => {}}
            preview="preview"
            title="title"
            message="message"
          /> */}
          <div className='col-4 card-image-body-voucher'>
            <img src="/media/icons/image8.png" alt="" className='image-voucher' />
          </div>
          <div className='col-7 card-title-voucher'>
            <div className='col-8'>
              <span className='text-gray-800 fw-bold fs-7'>Img_Banner_voucher_revisi.Png</span>
            </div>
            <div className='col-8'>
              <span className='fw-bold fs-7 text-action cursor-pointer'>Priview </span>
              <span className='text-gray-500 fw-bold fs-7'> · 130 KB</span>
            </div>
          </div>
          <div className='col-1 d-flex align-items-center'>
            <InlineSVG 
              src='/media/icons/trash.svg' 
              className='cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-10 row">
        {renderSectionSelectPlatform()}
        {renderSectionCampaignType()}
        {renderSectionIdentification()}
        {renderSectionVoucherCode()}
        {renderSectionValidityPeriod()}
        {renderSectionTargetUser()}
        {renderSectionImage()}
      </div>
    </>
  )
}
