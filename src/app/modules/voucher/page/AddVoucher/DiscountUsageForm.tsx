/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useState,
  // useContext,
} from 'react';

import InputMoney from 'src/app/components/InputMoney';
import InputPercentage from 'src/app/components/InputPercentage';
import RadioButtonCard from 'src/app/components/RadioButtonCard';
import CheckboxSwitch from 'src/app/components/CheckboxSwitch';
import LabelAlert from 'src/app/components/LabelAlert';
import InlineSVG from 'react-inlinesvg/esm';
// import { FormContext } from './index';

export const DiscountUsageForm = () => {
  const [discountMerchantCovered, setDiscountMerchantCovered] = useState('');
  const [discountCompanyCovered, setDiscountCompanyCovered] = useState('');
  const [usageHowTo, setUsageHowTo] = useState('');
  const [usageVoucher, setUsageVoucher] = useState('');
  const [usageTransaction, setUsageTransaction] = useState('');
  const [OTPRequired, setOTPRequired] = useState(false);
  const [voucherCombine, setVoucherCombine] = useState(false);
  const [voucherCombineType, setVoucherCombineType] = useState('');
  const [strataForms, setStrataForms] = useState([{
    id: 0,
    minTransaction: '',
    maxTransaction: '',
    discount: '',
    maxDiscount: '',
  }])

  // Use for passing form values
  // const contextState = useContext(FormContext);

  const onMinTrasactionChange = (value: string, index: number) => {
    let updatedForms = [...strataForms];
    updatedForms[index].minTransaction = value;
    setStrataForms(updatedForms);
  };

  const onMaxTrasactionChange = (value: string, index: number) => {
    let updatedForms = [...strataForms];
    updatedForms[index].maxTransaction = value;
    setStrataForms(updatedForms);
  };

  const onDiscountChange = (value: string, index: number) => {
    let updatedForms = [...strataForms];
    updatedForms[index].discount = value;
    setStrataForms(updatedForms);
  };

  const onMaxDiscountChange = (value: string, index: number) => {
    let updatedForms = [...strataForms];
    updatedForms[index].maxDiscount = value;
    setStrataForms(updatedForms);
  };

  const renderSectionDiscount = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Discount</label>
        <div className="col-10">
          {strataForms.map((item, index) => (
            <div className="d-flex gap-2 mb-4 align-items-center" key={`key-${item?.id}`}>
              <InputMoney
                onChangeValue={(value) => onMinTrasactionChange(value, index)}
                value={item?.minTransaction}
                className="col-3 col-sm-6 form-control"
                label="Minimum Transaction"
              />
              <InputMoney
                onChangeValue={(value) => onMaxTrasactionChange(value, index)}
                value={item?.maxTransaction}
                className="col-3 col-sm-6 form-control"
                label="Maximum Transaction (Optional)"
              />
              <InputPercentage
                onChangeValue={(value) => onDiscountChange(value, index)}
                value={item?.discount}
                className="col-3 col-sm-6 form-control"
                label="Discount"
              />
              <InputMoney
                onChangeValue={(value) => onMaxDiscountChange(value, index)}
                value={item?.maxDiscount}
                className="col-3 col-sm-6 form-control"
                label="Maximum Discount (Optional)"
              />
              {index > 0 && (
                <InlineSVG
                  src="/media/icons/payment/trash.svg"
                  height="16"
                  className="me-2 mt-8 cursor-pointer"
                  onClick={() => {
                    setStrataForms(
                      strataForms.filter((obj) => {
                        return obj.id !== item?.id;
                      })
                    );
                  }}
                />
              )}

              {strataForms.length > 1 && (
                <div style={{ width: 30 }} />
              )}
            </div>
          ))}

          {strataForms.length < 3 && (
            <div
              className="dashed-button mt-4"
              onClick={() => {
                setStrataForms([
                  ...strataForms,
                  {
                    id: strataForms.length + 1,
                    minTransaction: '',
                    maxTransaction: '',
                    discount: '',
                    maxDiscount: '',
                  }
                ])
              }}
            >
              <p className="m-0">+ Add Strata Discount</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSectionCoveredBy = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Covered By</label>
        <div className="d-flex col-10 gap-2">
          <div className="col-4">
            <p className="m-0"><b>Seller/Merchant</b></p>
            <small className="text-gray-600">Biaya diskon ditanggung oleh Seller/Merchant</small>
            <InputPercentage
              onChangeValue={(value) => setDiscountMerchantCovered(value)}
              value={discountMerchantCovered}
              className="col-3 form-control"
            />
          </div>
          <div className="col-4">
            <p className="m-0"><b>eDOT</b></p>
            <small className="text-gray-600">Biaya diskon ditanggung oleh pihak eDOT</small>
            <InputPercentage
              onChangeValue={(value) => setDiscountCompanyCovered(value)}
              value={discountCompanyCovered}
              className="col-3 form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionVoucherUsage = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Voucher Usage</label>
          <div className="col-10">
            <div className="mb-8">
              <p>How to Use</p>
              <div className="d-flex col-12 gap-2 align-items-stretch">
                <div className="d-flex col-5">
                  <RadioButtonCard
                    label="Auto Apply"
                    description="Jika T&C memenuhi syarat maka voucher secara otomatis terapply dan bisa diuncheck dan bisa memilih voucher lain yang lebih menguntungkan"
                    checked={usageHowTo === 'auto'}
                    onClick={() => setUsageHowTo('auto')}
                  />
                </div>
                <div className="d-flex col-5">
                  <RadioButtonCard
                    label="Manually"
                    description="User harus memilih sendiri voucher yang ingin dia gunakan"
                    checked={usageHowTo === 'manual'}
                    onClick={() => setUsageHowTo('manual')}
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p>Voucher Type</p>
              <div className="d-flex col-11 gap-2 align-items-stretch">
                <div className="d-flex col-4">
                  <RadioButtonCard
                    label="Shopping"
                    description="Diskon berlaku untuk pembelian produk"
                    checked={usageVoucher === 'shopping'}
                    onClick={() => setUsageVoucher('shopping')}
                  />
                </div>
                <div className="d-flex col-4">
                  <RadioButtonCard
                    label="Shipment"
                    description="Berlaku untuk potongan ongkos kirim"
                    checked={usageVoucher === 'shipment'}
                    onClick={() => setUsageVoucher('shipment')}
                  />
                </div>
                <div className="d-flex col-4">
                  <RadioButtonCard
                    label="Cashback"
                    description="Berlaku sebagai cashback"
                    checked={usageVoucher === 'cashback'}
                    onClick={() => setUsageVoucher('cashback')}
                  />
                </div>
              </div>
            </div>

            <div className="mb-12">
              <p>Transaction Type</p>
              <div className="d-flex col-11 gap-2 align-items-stretch">
                <div className="d-flex col-4">
                  <RadioButtonCard
                    label="All Transaction"
                    description="Diskon berlaku untuk semua transaksi"
                    checked={usageTransaction === 'all'}
                    onClick={() => setUsageTransaction('all')}
                  />
                </div>
                <div className="d-flex col-4">
                  <RadioButtonCard
                    label="First Transaction"
                    description="Diskon hanya berlaku untuk transaksi pertama"
                    checked={usageTransaction === 'first'}
                    onClick={() => setUsageTransaction('first')}
                  />
                </div>
                <div className="d-flex col-4">
                  <RadioButtonCard
                    label="Second and Following"
                    description="Diskon berlaku untuk transaksi kedua dan berikutnya"
                    checked={usageTransaction === 'second'}
                    onClick={() => setUsageTransaction('second')}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex col-12">
              <div className="col-5">
                <CheckboxSwitch
                  label="OTP Validation Required"
                  wrapperClass="flex-row-reverse w-100 mb-2"
                  labelClass="m-0 fw-bold flex-fill"
                  checked={OTPRequired}
                  onClick={() => setOTPRequired(!OTPRequired)}
                />
                <p className="text-gray-600 mb-6 pe-4">
                  Jika aktif, maka untuk menggunakan voucher akan tampil permintaan OTP
                </p>
              </div>
              {OTPRequired && (
                <div className="col-6">
                  <LabelAlert
                    message="Akan ada permintaan OTP untuk menggunakan voucher"
                    className="ms-4"
                    alertType="success"
                  />
                </div>
              )}
            </div>
            <div className="col-12">
              <div className="col-5">
                <CheckboxSwitch
                  label="Allow Combination with Other Voucher"
                  wrapperClass="flex-row-reverse w-100 mb-2"
                  labelClass="m-0 fw-bold flex-fill"
                  checked={voucherCombine}
                  onClick={() => setVoucherCombine(!voucherCombine)}
                />
                {voucherCombine && (
                  <p className="text-gray-600 mb-6 pe-4">
                    Pilih jenis voucher yang bisa dipakai bersama voucher ini
                  </p>
                )}
              </div>
            </div>

            {voucherCombine && (
              <div className="mb-12">
                <p>Transaction Type</p>
                <div className="d-flex col-11 gap-2 align-items-stretch">
                  <div className="d-flex col-4">
                    <RadioButtonCard
                      label="Shopping"
                      description="Kombinasi dengan voucher pembelian produk"
                      checked={voucherCombineType === 'shopping'}
                      onClick={() => setVoucherCombineType('shopping')}
                    />
                  </div>
                  <div className="d-flex col-4">
                    <RadioButtonCard
                      label="Shipment"
                      description="Kombinasi dengan voucher ongkos kirim"
                      checked={voucherCombineType === 'shipment'}
                      onClick={() => setVoucherCombineType('shipment')}
                    />
                  </div>
                  <div className="d-flex col-4">
                    <RadioButtonCard
                      label="Cashback"
                      description="Kombinasi dengan voucher cashback"
                      checked={voucherCombineType === 'cashback'}
                      onClick={() => setVoucherCombineType('cashback')}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mt-12">
        <h4>Campaign Discount & Usage</h4>
        <p className="text-gray-600">Input your voucher discount such as strata and other requirements</p>
      </div>

      <div className="mb-10 row">
        {renderSectionDiscount()}
        {renderSectionCoveredBy()}
        {renderSectionVoucherUsage()}
      </div>
    </>
  )
}
