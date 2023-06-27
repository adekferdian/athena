/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
    // useContext,
    useState,
} from 'react';
import { Modal, Button } from 'react-bootstrap-v5';
import InlineSVG from 'react-inlinesvg/esm';
import Select from 'react-select';

// import { FormContext } from './index';

const ruleList = [{
  label: 'Category',
  value: 'category',
  smallLabel: '',
}, {
  label: 'Distributor',
  value: 'distributor',
  smallLabel: '',
}, {
  label: 'Payment Method',
  value: 'payment-method',
  smallLabel: '',
}, {
  label: 'Logistic',
  value: 'logistic',
  smallLabel: '',
}, {
  label: 'Product',
  value: 'product',
  smallLabel: '',
}, {
  label: 'Store Type',
  value: 'store-type',
  smallLabel: '',
}, {
  label: 'Store',
  value: 'store',
  smallLabel: '',
}, {
  label: 'Time can be claimed',
  value: 'time-can-be-claimed',
  smallLabel: 'Tentukan waktu campaign bisa diklaim setiap harinya',
}, {
  label: 'Unit',
  value: 'unit',
  smallLabel: '',
}];

const paymentCourierList = [{
  label: 'Bayar cash di tempat',
  img: (<img src="/media/icons/payment/cod.svg" alt="" height="16" className="me-2" />),
  value: 'cod'
}];

const paymentVirtualAccountList = [{
  label: 'BCA Virtual Account',
  img: (<InlineSVG src="/media/icons/payment/bca.svg" height={16} className="me-2" />),
  value: 'bca'
}, {
  label: 'BRI Virtual Account',
  img: (<img src="/media/icons/payment/bri.png" alt="" height="16" className="me-2" />),
  value: 'bri'
}, {
  label: 'BNI Virtual Account',
  img: (<img src="/media/icons/payment/bni.png" alt="" height={16} className="me-2" />),
  value: 'bni'
}, {
  label: 'Mandiri Virtual Account',
  img: (<img src="/media/icons/payment/mandiri.png" alt="" height={16} className="me-2" />),
  value: 'mandiri'
}];

const paymentInstantList = [{
  label: 'QRIS',
  img: (<img src="/media/icons/payment/qris.png" alt="" height="16" className="me-2" />),
  value: 'qris'
}, {
  label: 'OVO',
  img: (<InlineSVG src="/media/icons/payment/ovo.svg" height={16} className="me-2" />),
  value: 'ovo'
}, {
  label: 'DANA',
  img: (<img src="/media/icons/payment/dana.png" alt="" height="16" className="me-2" />),
  value: 'dana'
}, {
  label: 'Link Aja',
  img: (<InlineSVG src="/media/icons/payment/linkaja.svg" height={16} className="me-2" />),
  value: 'linkaja'
}, {
  label: 'Shopee Pay',
  img: (<img src="/media/icons/payment/shopeepay.png" alt="" height="16" className="me-2" />),
  value: 'shopeepay'
}];

export const RulesForm = () => {

  interface RuleInterface {
    label: string | null;
    value: string | null;
    smallLabel: string | null;
  }
  interface PaymentInterface {
    [index: number]: {
      label: string;
      img: Element;
      value: string;
    }
  };

  interface RuleFormsInterface {
    id: number;
    ruleValue: RuleInterface | null;
    paymentCourier: PaymentInterface[];
    paymentVirtualAccount: PaymentInterface[];
    paymentInstant: PaymentInterface[];
  }

  // Use for passing form values
  // const contextState = useContext(FormContext);
  const [selectedRule, setSelectedRule] = useState('');
  const [showRuleOptions, setShowRuleOptions] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [ruleForms, setRuleForms] = useState<RuleFormsInterface[]>([]);
  const [ruleChecked, setRuleChecked] = useState<RuleInterface | null>(null);
  const [paymentCourierChecked, setPaymentCourierChecked] = useState<PaymentInterface[]>([]);
  const [paymentVirtualAccountChecked, setPaymentVirtualAccountChecked] = useState<PaymentInterface[]>([]);
  const [paymentInstantChecked, setPaymentInstantChecked] = useState<PaymentInterface[]>([]);
  const [editIndex, setEditIndex] = useState(0);

  const onPaymentCourierCheck = (item: any) => {
    if (paymentCourierChecked.some((obj: any) => obj.value === item?.value)) {
      setPaymentCourierChecked(paymentCourierChecked.filter((obj: any) => obj.value !== item.value));
    } else {
      setPaymentCourierChecked([
        ...paymentCourierChecked,
        item
      ]);
    }
  };

  const onPaymentVirtualAccountCheck = (item: any) => {
    if (paymentVirtualAccountChecked.some((obj: any) => obj.value === item?.value)) {
      setPaymentVirtualAccountChecked(paymentVirtualAccountChecked.filter((obj: any) => obj.value !== item.value));
    } else {
      setPaymentVirtualAccountChecked([
        ...paymentVirtualAccountChecked,
        item
      ]);
    }
  };

  const onPaymentInstantCheck = (item: any) => {
    if (paymentInstantChecked.some((obj: any) => obj.value === item?.value)) {
      setPaymentInstantChecked(paymentInstantChecked.filter((obj: any) => obj.value !== item.value));
    } else {
      setPaymentInstantChecked([
        ...paymentInstantChecked,
        item
      ]);
    }
  };

  const handleSaveRule = () => {
    if (editIndex) {
      let updateRuleForms = ruleForms;
      updateRuleForms[editIndex - 1].paymentCourier = paymentCourierChecked;
      updateRuleForms[editIndex - 1].paymentVirtualAccount = paymentVirtualAccountChecked;
      updateRuleForms[editIndex - 1].paymentInstant = paymentInstantChecked;

      setRuleForms(updateRuleForms);
    } else {
      setRuleForms([
        ...ruleForms,
        {
          id: ruleForms.length + 1,
          ruleValue: ruleChecked,
          paymentCourier: paymentCourierChecked,
          paymentVirtualAccount: paymentVirtualAccountChecked,
          paymentInstant: paymentInstantChecked,
        }
      ]);
    }
    setRuleChecked(null);
    setPaymentCourierChecked([]);
    setPaymentVirtualAccountChecked([]);
    setPaymentInstantChecked([]);
    setEditIndex(0);
    setShowPaymentOptions(false);
  };

  const handleEditRule = (item: any, index: number) => {
    setPaymentCourierChecked([
      ...item?.paymentCourier
    ]);
    setPaymentVirtualAccountChecked([
      ...item?.paymentVirtualAccount
    ]);
    setPaymentInstantChecked([
      ...item?.paymentInstant
    ]);
    setEditIndex(index + 1);
    setShowPaymentOptions(true);
  }

  const renderSectionRuleForms = (item: any, index: number) => (
    <div className="card mb-4 pt-12 pb-0 px-8">
      <div className="d-flex">
        <div className="col-3 pe-8">
          <label className="form-label">Choose which rule</label>
          <div className="d-flex flex-row align-items-center">
            <Select
              defaultValue={item?.ruleValue}
              onChange={(e: any) => setSelectedRule(e)}
              options={ruleList}
              className="me-2 w-100"
            />
            <InlineSVG
              src="/media/icons/payment/gear.svg"
              height="16"
              className="me-2 cursor-pointer"
              onClick={() => handleEditRule(item, index)}
            />
            <InlineSVG
              src="/media/icons/payment/trash.svg"
              height="16"
              className="me-2 cursor-pointer"
              onClick={() => {
                setRuleForms(
                  ruleForms.filter((obj) => {
                    return obj.id !== item?.id;
                  })
                );
              }}
            />
          </div>
        </div>
        <div className="d-flex flex-column col-9">

          {item?.paymentCourier.length > 0 && (
            <>
              <label className="form-label">Via Courier</label>
              <div className="d-flex row flex-row col-12 gap-2 mb-8 ps-2">
                {item?.paymentCourier?.map((payment: any, index: number) => (
                  <div className="col-4 p-0" key={`key-${payment.value}`}>
                    <div className="d-flex align-items-center form-card">
                      {payment?.img}
                      <div className="w-100 ">
                        <p className="m-0">
                          {payment?.label}
                        </p>
                      </div>
                      <InlineSVG
                        src="/media/icons/close.svg"
                        onClick={() => {}}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {item?.paymentVirtualAccount.length > 0 && (
            <>
              <label className="form-label">Via Courier</label>
              <div className="d-flex row flex-row col-12 gap-2 mb-8 ps-2">
                {item?.paymentVirtualAccount?.map((payment: any, index: number) => (
                  <div className="col-4 p-0" key={`key-${payment.value}`}>
                    <div className="d-flex align-items-center form-card">
                      {payment?.img}
                      <div className="w-100 ">
                        <p className="m-0">
                          {payment?.label}
                        </p>
                      </div>
                      <InlineSVG
                        src="/media/icons/close.svg"
                        onClick={() => {}}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {item?.paymentInstant.length > 0 && (
            <>
              <label className="form-label">Pembayaran Instant</label>
              <div className="d-flex row flex-row col-12 gap-2 mb-8 ps-2">
                {item?.paymentInstant?.map((payment: any, index: number) => (
                  <div className="col-4 p-0" key={`key-${payment.value}`}>
                    <div className="d-flex align-items-center form-card">
                      {payment?.img}
                      <div className="w-100 ">
                        <p className="m-0">
                          {payment?.label}
                        </p>
                      </div>
                      <InlineSVG
                        src="/media/icons/close.svg"
                        onClick={() => {}}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mt-12">
        <h4>Define rules to be applied to the voucher</h4>
        <p className="text-gray-600">Choose payment method, logistic, product & other to be applied to the voucher</p>
      </div>

      <div className="mb-10 row">
        {ruleForms.map((item, index) => (
          <div className="p-0" key={`key-${item.id}`}>
            {renderSectionRuleForms(item, index)}
          </div>
        ))}

        <div className="card mb-4 p-8">
          <div className="d-flex">
            <div className="col-12">
              <div className="dashed-button mt-4" onClick={() => setShowRuleOptions(true)}>
                <p className="m-0">+ Add New Rule</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showRuleOptions}
        onHide={() => setShowRuleOptions(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-0">
          <div className="d-flex flex-column pt-2 pb-2">
            {ruleList?.map((item) => (
              <div
                className="d-flex flex-column"
                key={`key-${item.value}`}
                onClick={() => {
                  setRuleChecked(item);
                  setShowRuleOptions(false);
                  setShowPaymentOptions(true);
                }}
              >
                <div className="select-option">
                  <p className={`m-0 ${item.value === selectedRule ? 'text-secondary' : ''}`}><b>{item.label}</b></p>
                  {item.smallLabel && ( <p className="m-0 text-gray-600">{item.smallLabel}</p> )}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showPaymentOptions}
        onHide={() => setShowPaymentOptions(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <h5>Select Payment Method</h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="d-flex flex-column gap-2 pt-2 pb-2">
            <label className="form-label">Via Courier</label>
            {paymentCourierList.map((item) => (
              <div className="d-flex gap-4 p-4 border rounded-2 align-items-center">
                <div style={{ width: 44 }}>
                  {item?.img}
                </div>
                <p className="flex-fill m-0">{item?.label}</p>
                <input
                  className="form-check-input cursor-pointer"
                  type="checkbox"
                  checked={paymentCourierChecked.some((obj: any) => obj.value === item?.value)}
                  onClick={() => onPaymentCourierCheck(item)}
                />
              </div>
            ))}

            <label className="form-label mt-8">Virtual Account</label>
            {paymentVirtualAccountList.map((item) => (
              <div className="d-flex gap-4 p-4 border rounded-2 align-items-center">
                <div style={{ width: 44 }}>
                  {item?.img}
                </div>
                <p className="flex-fill m-0">{item?.label}</p>
                <input
                  className="form-check-input cursor-pointer"
                  type="checkbox"
                  checked={paymentVirtualAccountChecked.some((obj: any) => obj.value === item?.value)}
                  onClick={() => onPaymentVirtualAccountCheck(item)}
                />
              </div>
            ))}

            <label className="form-label mt-8">Pembayaran Instant</label>
            {paymentInstantList.map((item) => (
              <div className="d-flex gap-4 p-4 border rounded-2 align-items-center">
                <div style={{ width: 44 }}>
                  {item?.img}
                </div>
                <p className="flex-fill m-0">{item?.label}</p>
                <input
                  className="form-check-input cursor-pointer"
                  type="checkbox"
                  checked={paymentInstantChecked.some((obj: any) => obj.value === item?.value)}
                  onClick={() => onPaymentInstantCheck(item)}
                />
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowPaymentOptions(false)}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => handleSaveRule()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
