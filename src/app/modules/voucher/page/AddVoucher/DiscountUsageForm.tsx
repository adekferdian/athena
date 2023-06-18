/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useState,
  // useContext,
} from 'react';

import InputMoney from 'src/app/components/InputMoney';
import InputPercentage from 'src/app/components/InputPercentage';
// import { FormContext } from './index';

export const DiscountUsageForm = () => {
  const [minTransaction, setMinTransaction] = useState('');
  const [maxTransaction, setMaxTransaction] = useState('');
  const [discount, setDiscount] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');

  // Use for passing form values
  // const contextState = useContext(FormContext);

  const renderSectionDiscount = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Discount</label>
        <div className="d-flex col-10 gap-2">
          <InputMoney
            onChangeValue={(value) => setMinTransaction(value)}
            value={minTransaction}
            className="col-3 form-control"
            label="Minimum Transaction"
          />
          <InputMoney
            onChangeValue={(value) => setMaxTransaction(value)}
            value={maxTransaction}
            className="col-3 form-control"
            label="Maximum Transaction (Optional)"
          />
          <InputPercentage
            onChangeValue={(value) => setDiscount(value)}
            value={discount}
            className="col-3 form-control"
            label="Discount"
          />
          <InputMoney
            onChangeValue={(value) => setMaxDiscount(value)}
            value={maxDiscount}
            className="col-3 form-control"
            label="Maximum Discount (Optional)"
          />
        </div>
      </div>
    </div>
  );

  const renderSectionCoveredBy = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Covered By</label>
      </div>
    </div>
  );

  const renderSectionVoucherUsage = () => (
    <div className="card mb-4 py-12 px-8">
      <div className="d-flex">
        <label className="col-2 text-gray-800 fw-bold fs-6">Voucher Usage</label>
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
