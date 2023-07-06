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
import { createCampaign } from '../../redux/VoucherCRUD';
import { getErrorMessage } from 'src/app/utils/api-utils';
import { useHeaderToast } from 'src/app/components/ToastComponent';

interface FormContextInterface {
  voucherForm: object
  setVoucherForm: Dispatch<SetStateAction<any>>;
}

export const formContextDefaultValue: FormContextInterface = {
  voucherForm: {
    campaigntype_id: 1,
    bu_id: 4,
    campaign_name: "eFood Discount 20%",
    campaign_term: "lorem ipsum",
    campaign_image_id: 1,
    voucher_quota: "200",
    voucher_quota_user: "1",
    voucher_type: "generate", //value: generate OR generate-amount OR manual
    voucher_code: "", //diisi jika voucher_type manual, lainnya string kosong
    campaign_mark: "hDP7gFOiKJfQypYrO93T0607FOOD1", //diisi ketika voucher_type: generate/generate-amount, lainnya string kosong
    valid_start: "2023-06-25 16:00:00",
    valid_end: "2023-07-20 08:00:00",
    display_voucher: false,
    target_user: "All User",
    target_user_ids:[],
    campaign_condition_ids: [1],
    campaign_limit_ids: [],
    discount: [],
    covered_byseller: "70",
    covered_bycompany: "30",
    usage_id: 2,
    vouchertype_id: 4,
    transaction_type_id: 7,
    otp_validation: false,
    allow_combination_id: 0,
    rules:[]
  },
  setVoucherForm: () => null
}

export const FormContext = createContext<FormContextInterface>(formContextDefaultValue);

export const AddVoucher = () => {
  const [voucherForm, setVoucherForm] = useState({
    campaigntype_id: 0,
    bu_id: 0,
    campaign_name: "",
    campaign_term: "",
    campaign_image_id: 1,
    voucher_quota: "",
    voucher_quota_user: "",
    voucher_type: "manual", //value: generate OR generate-amount OR manual
    voucher_code: "", //diisi jika voucher_type manual, lainnya string kosong
    campaign_mark: "", //diisi ketika voucher_type: generate/generate-amount, lainnya string kosong
    valid_start: "",
    valid_end: "",
    display_voucher: false,
    target_user: "All User",
    target_user_ids:[],
    campaign_condition_ids: [1],
    campaign_limit_ids: [],
    discount: [
      {
        min_transaction: 20000,
        max_transaction: 0,
        discount_type: "percentage",
        min_discount: 5,
        max_discount: 0,
        seq: 1
      },
      {
        min_transaction: 20000,
        max_transaction: 0,
        discount_type: "percentage",
        min_discount: 5,
        max_discount: 0,
        seq: 2
      }
    ],
    covered_byseller: "",
    covered_bycompany: "",
    usage_id: 2,
    vouchertype_id: 4,
    transaction_type_id: 7,
    otp_validation: false,
    allow_combination_id: 0,
    rules:[{
      rules_id:1,
      item: [{
          ref_id:1,
          data:{}
      }]
  },{
      rules_id:5,
      item: [{
          ref_id:10,
          data:{
              time_start:"01:00",
              time_end:"03:00"
          }
      }]
  }]
  });
  const [formStep, setFormStep] = useState(1);
  const { addPageToasts } = useHeaderToast()
  const formContextValue = {
    voucherForm,
    setVoucherForm,
  };

  console.log("voucher", voucherForm);
  
  return (
    //@ts-ignore
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
          onClick={() => {
            setFormStep(formStep < 3 ? formStep + 1 : formStep)
            if (formStep === 3) {
              createCampaign(voucherForm)
                .then((res) => {
                  // dispatch(GenderRedux.actions.setSuccess('Gender berhasil dihapus.'))
                  console.log("res ", res);
                  
                })
                .catch((err) => {
                  // setShowDeclineCampaign(false)
                  addPageToasts({ scheme: 'danger', text: getErrorMessage(err, true) })
                })
            }
          }}
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
