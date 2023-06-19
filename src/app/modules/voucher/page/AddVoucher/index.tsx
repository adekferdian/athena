/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Link } from 'react-router-dom';
import InlineSVG from 'react-inlinesvg/esm';
import { PageTitle } from 'src/_metronic/layout/core';
import { CampaignInfoForm } from './CampaignInfoForm';
import { DiscountUsageForm } from './DiscountUsageForm';
import { RulesForm } from './RulesForm';

interface FormContextInterface {
  setVoucherForm: Dispatch<SetStateAction<any>>;
}

export const formContextDefaultValue: FormContextInterface = {
  setVoucherForm: () => null
}

export const FormContext = createContext<FormContextInterface>(formContextDefaultValue);

export const AddVoucher = () => {
  const [voucherForm, setVoucherForm] = useState(null);
  const [formStep, setFormStep] = useState(1);

  const formContextValue = {
    setVoucherForm,
  };

  return (
    <FormContext.Provider value={formContextValue}>
      <PageTitle>Create Campaign</PageTitle>
      <div className="stepper-wrapper">
        <div className={`stepper-item ${formStep >= 2 ? 'completed' : ''} ${formStep === 1 ? 'active' : ''}`}>
          <div className="d-flex align-items-center w-100">
            <div className="w-100" />
            <div className="step-counter">
              {formStep >= 2 && (<InlineSVG src={'/media/icons/efood/IconCheckWhite.svg'} />)}
            </div>
            <div className="step-name mx-4 flex-shrink-0">Campaign Info</div>
            <div className="border-stepper-wrapper">
              <div className="border-stepper" />
            </div>
          </div>
        </div>
        <div className={`stepper-item ${formStep >= 3 ? 'completed' : ''} ${formStep === 2 ? 'active' : ''}`}>
          <div className="d-flex align-items-center w-100">
            <div className="border-stepper-wrapper">
              <div className="border-stepper" />
            </div>
            <div className="step-counter">
              {formStep >= 3 && (<InlineSVG src={'/media/icons/efood/IconCheckWhite.svg'} />)}
            </div>
            <div className="step-name mx-4 flex-shrink-0">Discount & Usage</div>
            <div className="border-stepper-wrapper">
              <div className="border-stepper" />
            </div>
          </div>
        </div>
        <div className={`stepper-item ${formStep === 3 ? 'active' : ''}`}>
          <div className="d-flex align-items-center w-100">
            <div className="border-stepper-wrapper">
              <div className="border-stepper" />
            </div>
            <div className="step-counter" />
            <div className="step-name mx-4 flex-shrink-0">Rules</div>
            <div className="w-100" />
          </div>
        </div>
      </div>

      {formStep === 1 && (
        <CampaignInfoForm />
      )}
      {formStep === 2 && (
        <DiscountUsageForm />
      )}
      {formStep === 3 && (
        <RulesForm />
      )}

      <div className="d-flex flex-row card border-top p-10">
        <div className="flex-fill">
          <Link
            to={{ pathname: `/voucher/` }}
            className="btn btn-lg btn-light fw-bolder"
            onClick={() => {}}
          >
            Cancel
          </Link>
        </div>
        {formStep > 1 && (
          <a
            href="#"
            className="btn btn-lg btn-outline-secondary fw-bolder mx-4"
            onClick={() => setFormStep(formStep - 1)}
          >
            Kembali
          </a>
        )}
        <a
          href="#"
          className="btn btn-lg btn-secondary fw-bolder"
          onClick={() => setFormStep(formStep < 3 ? formStep + 1 : formStep)}
        >
          <p className="indicator-label m-0">
            {formStep === 1 ? 'Next - Set Discount & Usage' : ''}
            {formStep === 2 ? 'Next - Set Rules' : ''}
            {formStep === 3 ? 'Preview & Submit' : ''}
          </p>
        </a>
      </div>
    </FormContext.Provider>
  )
}
