/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
    // useContext,
    useState,
} from 'react';
import { Modal, Button } from 'react-bootstrap-v5';
import InlineSVG from 'react-inlinesvg/esm';
import Select from 'react-select';
//@ts-ignore
import DatePicker from "react-datepicker";
//@ts-ignore
import {
  ruleList,
  paymentList,
  logisticList,
  orderTypeList,
  timeList,
} from '../../../../utils/rule-list-utils';

// import { FormContext } from './index';

export const RulesForm = () => {

  interface RuleInterface {
    label: string | null;
    value: string | null;
    smallLabel: string | null;
  }

  interface PaymentInterface {
    [index: number]: {
      label: string;
      img: Node;
      value: string;
    }
  }
  interface RuleFormsInterface {
    id: number;
    rule: RuleInterface | null;
    list: any | null;
    time: any | null;
  }

  // Use for passing form values
  // const contextState = useContext(FormContext);
  const [selectedRule, setSelectedRule] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showRuleOptions, setShowRuleOptions] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [ruleForms, setRuleForms] = useState<RuleFormsInterface[]>([]);
  const [ruleChecked, setRuleChecked] = useState<RuleInterface | null>(null);
  const [ruleListChecked, setRuleListChecked] = useState<PaymentInterface[]>([]);
  const [showRemoveRuleModal, setShowRemoveRuleModal] = useState(false);
  const [removeId, setRemoveId] = useState(null);
  const [editIndex, setEditIndex] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const onRulesClick = (item: any) => {
    setRuleChecked(item);
    setShowRuleOptions(false);
    setShowFormModal(true);
  }

  const handleSaveRule = () => {
    if (editIndex) {
      let updateRuleForms = ruleForms;
      if (ruleChecked?.value === 'time-can-be-claimed') {
        updateRuleForms[editIndex - 1].time = {
          type: selectedTime,
          startTime,
          endTime,
        };
      } else {
        updateRuleForms[editIndex - 1].list = ruleListChecked;
      }

      setRuleForms(updateRuleForms);
    } else {
      let submitState = [];
      if (ruleChecked?.value === 'time-can-be-claimed') {
        submitState = [
          ...ruleForms,
          {
            id: ruleForms.length + 1,
            rule: ruleChecked,
            list: [],
            time: {
              type: selectedTime,
              startTime: new Date(startTime).toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute:'2-digit'
              }),
              endTime: new Date(endTime).toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute:'2-digit'
              }),
            },
          }
        ];
      } else {
        submitState = [
          ...ruleForms,
          {
            id: ruleForms.length + 1,
            rule: ruleChecked,
            list: ruleListChecked.sort((a: any, b: any) => { 
              return a.id - b.id;
            }),
            time: null,
          }
        ];
      }
      setRuleForms(submitState);
    }
    setRuleChecked(null);
    setRuleListChecked([]);
    setEditIndex(0);
    setShowFormModal(false);
  };

  const handleEditRule = (item: any, index: number) => {
    setRuleChecked(item?.rule);
    setRuleListChecked(item?.list);
    setEditIndex(index + 1);
    setShowFormModal(true);
  }

  const mapList = (list: any) => {
    let categories = Object.values(list.reduce((b: any, a: any) => {
      if (b.hasOwnProperty(a.category)) b[a.category].item.push(a);
      else b[a.category] = {
        category: a.category,
        item: [a],
      }

      return b;
    }, {}));

    return categories;
  };

  const onRuleFormClick = (item: any) => {
    if (ruleListChecked.includes(item)) {
      setRuleListChecked(ruleListChecked.filter((obj: any) => obj.value !== item.value));
    } else {
      setRuleListChecked([
        ...ruleListChecked,
        item
      ]);
    }
  };

  const renderRuleList = (list: any) => {
    let label = '';
    let renderReturn = [];
    if (list.category === 'courier') label = 'Via Courier';
    else if (list.category === 'virtual-account') label = 'Via Virtual Account';
    else if (list.category === 'instant') label = 'Pembayaran Instant';
    else if (list.category === 'log-instant') label = 'Instant';
    else if (list.category === 'log-next-day') label = 'Next Day';
    else if (list.category === 'log-kargo') label = 'Kargo';

    renderReturn.push(<label className="form-label m-0 p-0" style={{ minHeight: 24 }}>{label}</label>);

    for (let i = 0; i < list.item.length; i++) {
      renderReturn.push(
        <div className="col-4 p-0" key={`key-${list.item[i].value}`}>
          <div className="d-flex align-items-center form-card me-2 mb-2">
            {list.item[i]?.img}
            <div className="w-100 ellipsis">
              <p className="m-0">
                {list.item[i]?.label}
              </p>
            </div>
            <InlineSVG
              src="/media/icons/close.svg"
              onClick={() => {}}
              className="cursor-pointer"
            />
          </div>
        </div>
      );
    }
    return renderReturn;
  };

  const renderRuleForm = (list: any) => {
    let label = '';
    let renderReturn: any = [];

    // Define labels
    if (list.category === 'courier') label = 'Via Courier';
    else if (list.category === 'virtual-account') label = 'Via Virtual Account';
    else if (list.category === 'instant') label = 'Pembayaran Instant';
    else if (list.category === 'log-instant') label = 'Instant';
    else if (list.category === 'log-next-day') label = 'Next Day';
    else if (list.category === 'log-kargo') label = 'Kargo';

    renderReturn.push(<label className="form-label mt-4 p-0">{label}</label>);

    for (let i = 0; i < list.item.length; i++) {
      renderReturn.push(
        <div className="d-flex gap-4 p-4 border rounded-2 align-items-center mb-2">
          {list.item[i]?.img && (
            <div style={{ width: 44 }}>
              {list.item[i]?.img}
            </div>
          )}
          <p className="flex-fill m-0">{list.item[i]?.label}</p>
          <input
            className="form-check-input cursor-pointer"
            type="checkbox"
            checked={ruleListChecked.includes(list.item[i])}
            onClick={() => onRuleFormClick(list.item[i])}
          />
        </div>
      );
    }

    return renderReturn;
  };

  const mapRuleFormList = () => {
    let list: any = [];

    // Define form list to map
    if (ruleChecked?.value === 'payment-method') list = paymentList;
    else if (ruleChecked?.value === 'logistic') list = logisticList;
    else if (ruleChecked?.value === 'order-type') list = orderTypeList;

    return (
      <>
        {mapList(list).map((item: any, index: number) => (
          <div key={`key-${index}`}>
            {renderRuleForm(item)}
          </div>
        ))}
      </>
    );
  };

  const renderSectionRuleForms = (item: any, index: number) => (
    <div className="card mb-4 pt-12 pb-0 px-8">
      <div className="d-flex">
        <div className="col-3 pe-8">
          <label className="form-label">Choose which rule</label>
          <div className="d-flex flex-row align-items-center">
            <Select
              defaultValue={item?.rule}
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
                setRemoveId(item?.id);
                setShowRemoveRuleModal(true);
              }}
            />
          </div>
        </div>
        <div className="d-flex flex-column col-9">
          {item?.rule?.value === 'time-can-be-claimed' ? (
            <div className="d-flex row flex-row col-12 mb-4 ps-2">
              <div className="col-4">
                <p className="m-0 mt-6">Time</p>
                <p><b>{item?.time?.type?.label}</b></p>
              </div>
              <div className="col-3">
                <p className="m-0 mt-6">Start Time</p>
                <p><b>{item?.time?.startTime}</b></p>
              </div>
              <div className="col-3">
                <p className="m-0 mt-6">End Time</p>
                <p><b>{item?.time?.endTime}</b></p>
              </div>
            </div>
          ) : (
            <>
              {mapList(item?.list).map((ruleList: any, index: number) => (
                <div className="d-flex row flex-row col-12 mb-4 ps-2" key={`key-${index}`}>
                  {renderRuleList(ruleList)}
                </div>
              ))}
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
        show={showRemoveRuleModal}
        onHide={() => setShowRemoveRuleModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-8 text-center">
          <div className="d-flex flex-column pt-2 pb-2">
            <h2>Delete this rule?</h2>
            <p className="mb-8">Apa Anda yakin akan menghapus rule ini?</p>
            <div className="d-flex gap-2">
              <Button
                variant="light"
                onClick={() => setShowRemoveRuleModal(false)}
                className="col-6"
              >
                Batal
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setRuleForms(
                    ruleForms.filter((obj) => {
                      return obj.id !== removeId;
                    })
                  );
                  setShowRemoveRuleModal(false);
                }}
                className="col-6"
              >
                Ya, hapus
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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
                onClick={() => onRulesClick(item)}
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
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="row">
            <h5>
              {ruleChecked?.value === 'payment-method' ? 'Select Payment Method' : ''}
              {ruleChecked?.value === 'logistic' ? 'Select Logistic' : ''}
              {ruleChecked?.value === 'order-type' ? 'Order Type' : ''}
              {ruleChecked?.value === 'time-can-be-claimed' ? 'Time can be claimed' : ''}
            </h5>
            {ruleChecked?.smallLabel && (
              <p className="m-0">{ruleChecked?.smallLabel}</p>
            )}
          </div>
        </Modal.Header>
        <Modal.Body className="p-8">
          <div className="d-flex flex-column gap-2 pb-2">
            {ruleChecked?.value === 'time-can-be-claimed' ? (
              <div>
                <label className="form-label m-0 p-0">
                  Choose time
                </label>
                <Select
                  defaultValue={null}
                  onChange={(e: any) => setSelectedTime(e)}
                  options={timeList}
                  className="me-2 w-100"
                />
                {selectedTime && (
                  <div className="d-flex gap-2 mt-8">
                    <div className="col-6">
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
                    <div className="col-6">
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
                )}
              </div>
            ) : mapRuleFormList()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowFormModal(false)}>
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
