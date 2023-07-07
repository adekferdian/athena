/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { KTSVG } from 'src/_metronic/helpers'
import { getCampaignDetail } from '../redux/VoucherCRUD'
import { getErrorMessage } from 'src/app/utils/api-utils'
import { useHeaderToast } from 'src/app/components/ToastComponent'

type Props = {
  show: boolean
  data: any
  handleClose: () => void
  onPreview: () => void | any
}

const values = [
  { id: 1, text: "General information" },
  { id: 2, text: "Discount & Usage" },
  { id: 3, text: "Rules" },
  { id: 4, text: "Note (0)" }
];

const PreviewVoucherModal: React.FC<Props> = ({ show, handleClose, data, onPreview }) => {


  const [activeId, setActiveId] = useState(1);
  const [dataDetail, setData] = useState<any>(null);
  const history = useHistory()
  const { addPageToasts } = useHeaderToast()

  useEffect(() => {
    if (data !== null) {
      getCampaignDetail(data?.campaign_id ?? '')
        .then((value) => {
          console.log("RES DATA ", data);
          setData(value.data.data)
        })
        .catch((err) => {
          setData(null)
          addPageToasts({ scheme: 'danger', text: getErrorMessage(err, true) })
        })
    }
    console.log("STATE DATA ", dataDetail);

  }, [data])

  const modalGeneralInformation = () => {
    return (
      <div>
        <div className='fv-row'>
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
        <div className='row mt-4 mb-2 pl-50 margin-body-modal'>
          <div className='col-12'>
            <div className='row mt-8 mb-12'>
              <div className='col-2 text-gray-800 fs-7'>Select Platform</div>
              <div className='col-10 text-gray-800 fw-bold fs-7'>
                <span className='bg-ligt'>{dataDetail ? dataDetail.business_unit.bu_name : '-'}</span>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'>Identification</div>
              <div className='col-10 text-gray-800 fs-7'>Voucher Name</div>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='col-10 text-gray-800 fw-bold fs-7'>
                <span className='text-gray-800 fw-bold fs-7'>{dataDetail ? dataDetail.campaign_name : '-'}</span>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='col-10 text-gray-800 fs-7'>Display Voucher</div>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='col-10 text-gray-800 fw-bold fs-7'>
                <span className='text-gray-800 fw-bold fs-7'>{dataDetail ? (dataDetail.display_voucher ? `Yes, Voucher akan tampil di platform` : `No, Voucher tidak akan tampil di platform`) : '-'}</span>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='col-10 text-gray-800 fs-7'>Terms & Condition</div>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='col-10 text-gray-800 fw-bold fs-7'>
                <span className='text-gray-800 fw-bold fs-7'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</span>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='col-10 text-gray-800 fs-7'>Voucher Descriptions</div>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='col-10 text-gray-800 fw-bold fs-7'>
                <span className='text-gray-800 fw-bold fs-7'>{dataDetail ? dataDetail.voucher_usage.description : '-'}</span>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='row col-4'>
                <span className='text-gray-800 fs-7'>Total Voucher Quota</span>
                <span className='text-gray-800 fw-bold fs-7'>{dataDetail ? dataDetail.voucher_quota : '-'}</span>
              </div>
              <div className='row col-4'>
                <span className='text-gray-800 fs-7'>Quota for each User </span>
                <span className='text-gray-800 fw-bold fs-7'>{dataDetail ? dataDetail.voucher_quota_user : '-'}</span>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='row col-4'>
                <span className='text-gray-800 fs-7'>Total Used</span>
                <span className='text-gray-800 fw-bold fs-7'>{dataDetail ? dataDetail.voucher_quota : '-'}</span>
              </div>
              <div className='row col-4'>
                <span className='text-gray-800 fs-7'>Remaining quota</span>
                <span className='text-gray-800 fw-bold fs-7'>{dataDetail ? dataDetail.voucher_quota : '-'}</span>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'>Voucher Code</div>
              <div className='col-10 text-gray-800 fs-7'>{dataDetail && dataDetail.voucher_type === 'generate' ? 'Autogenerate' : 'Manual'}</div>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='col-10 text-gray-800 fw-bold fs-7'>
                <span className='text-gray-800 fw-bold fs-7'>{dataDetail ? dataDetail.voucher_quota : '-'} Voucher Codes Generated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const modalDiscountUsage = () => {
    return (
      <div>
        <div className='fv-row'>
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
        <div className='row mt-4 mb-2 pl-50 margin-body-modal'>
          <div className='col-12'>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'>Discount</div>
              {
              dataDetail ? 
              dataDetail.campaign_discount.map((val: any, index: any) => (
                <>
                  <div className='row col-3 border-bottom pb-5'>
                    <span className='text-gray-800 fs-7'>Minimum Transaction</span>
                    <span className='text-gray-800 fw-bold fs-7'>Rp {val.min_transaction}</span>
                  </div>
                  <div className='row col-3 border-bottom pb-5'>
                    <span className='text-gray-800 fs-7'>Maximum Transaction</span>
                    <span className='text-gray-800 fw-bold fs-7'>Rp {val.max_transaction}</span>
                  </div>
                  <div className='row col-2 border-bottom pb-5'>
                    <span className='text-gray-800 fs-7'>Discount</span>
                    <span className='text-gray-800 fw-bold fs-7'>{val.min_discount}%</span>
                  </div>
                  <div className='row col-3 border-bottom pb-5'>
                    <span className='text-gray-800 fs-7'>Maximum Discount</span>
                    <span className='text-gray-800 fw-bold fs-7'>Rp {val.max_discount}</span>
                  </div>
                  <div className='col-2'></div>
                </>
              ))
                : null
            }
            </div>
          </div>
          <div className='col-12'>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'>Covered by</div>
              <div className='row col-3'>
                <span className='text-gray-800 fs-7'>Seller/Merchant</span>
                <span className='text-gray-800 fw-bold fs-7'>50%</span>
              </div>
              <div className='row col-3'>
                <span className='text-gray-800 fs-7'>eDOT</span>
                <span className='text-gray-800 fw-bold fs-7'>50%</span>
              </div>
            </div>
          </div>
          <div className='row mt-6 mb-6'>
            <div className='col-2 text-gray-800 fs-7'>Voucher Usage</div>
            <div className='col-10 text-gray-800 fs-7 pb-5'>How to Use</div>
            <div className='col-2 text-gray-800 fs-7'></div>
            <div className='col-10 text-gray-800 fw-bold fs-7'>
              <span className='text-gray-800 fw-bold fs-7'>Auto Apply</span>
            </div>
            <div className='col-2 text-gray-800 fs-7'></div>
            <div className='col-10 text-gray-800 fw-bold fs-7'>
              <span className='text-gray-600 fs-7'>{dataDetail ? dataDetail.voucher_usage.description : '-'}</span>
            </div>
          </div>
          <div className='row mt-6 mb-6'>
            <div className='col-2 text-gray-800 fs-7'></div>
            <div className='col-10 text-gray-800 fs-7 pb-5'>Applies to</div>
            <div className='col-2 text-gray-800 fs-7'></div>
            <div className='col-10 text-gray-800 fw-bold fs-7'>
              <span className='text-gray-800 fw-bold fs-7'>Shipping</span>
            </div>
            <div className='col-2 text-gray-800 fs-7'></div>
            <div className='col-10 text-gray-800 fw-bold fs-7'>
              <span className='text-gray-600 fs-7'>Berlaku untuk potongan ongkos kirim</span>
            </div>
          </div>
          <div className='row mt-6 mb-6'>
            <div className='col-2 text-gray-800 fs-7'></div>
            <div className='col-10 text-gray-800 fs-7 pb-2'>Transaction Type</div>
            <div className='col-2 text-gray-800 fs-7'></div>
            <div className='col-10 text-gray-800 fw-bold fs-7'>
              <span className='text-gray-800 fw-bold fs-7'>All Transaction</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const modalRules = () => {
    return (
      <div>
        <div className='fv-row'>
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
        <div className='row mt-4 mb-2 pl-50 margin-body-modal'>
          <div className='col-12'>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'>Payment Method</div>
              <div className='row col-4'>
                <span className='text-gray-800 fs-7'>Via Courier</span>
                <span className='text-gray-800 fw-bold fs-7'>Bayar cash di tempat</span>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='row col-8'>
                <div className='text-gray-800 fs-7'>Virtual Account</div>
                <div className='col-5 text-gray-800 fw-bold fs-7 pb-3'>BCA Virtual Account</div>
                <div className='col-5 text-gray-800 fw-bold fs-7 pb-3'>BNI Virtual Account</div>
                <div className='col-5 text-gray-800 fw-bold fs-7 pb-3'>Mandiri Virtual Account</div>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'></div>
              <div className='row col-8'>
                <div className='text-gray-800 fs-7'>Pembayaran Instan</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>QRIS</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>OVO</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>DANA</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>Gopay</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>Link Aja</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>Shopee Pay</div>
              </div>
            </div>
            <div className='row mt-12 mb-12'>
              <div className='col-2 text-gray-800 fs-7'>Logistic</div>
              <div className='row col-8'>
                <div className='text-gray-800 fs-7'>Instan</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>LOG by eDOT</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>Gojek</div>
                <div className='text-gray-800 fs-7'>Instan</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>AnterAja</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>JNE</div>
                <div className='text-gray-800 fs-7'>Reguler</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>AnterAja</div>
                <div className='col-4 text-gray-800 fw-bold fs-7 pb-3'>JNE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const modalNote = () => {
    return (
      <div>
        <div className='fv-row'>
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
        <div className='row margin-body-modal'>
          <div className='w-550px h-150px d-flex align-items-center justify-content-center margin-tab-modal card-note-404'>No note found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal fade modal-custom" tabIndex={-1} id="kt_modal_scrollable_2">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content shadow-none modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Preview Campaign</h5>
            <div
              className="btn btn-icon btn-sm btn-active-light-primary ms-2"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <KTSVG
                path="/media/icons/duotune/arrows/arr061.svg"
                className="svg-icon svg-icon-2x"
              />
            </div>
          </div>
          <div className="modal-body">
            <div className='mb-4'>
              <h2>Diskon April Seru 20%</h2>
            </div>
            <div className='d-flex'>
              <span className='mt-2 text-gray-600'>Campaign Status</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className='d-flex w-75px h-35px border p-2 status-badge'>
                <div className='circle' style={{ width: 10, height: 10, marginRight: 5, marginTop: 5 }} />
                <span style={{ color: '#01874E' }}>
                  Active</span>
              </div>
            </div>
            {
              activeId === 1 ? modalGeneralInformation() :
                activeId === 2 ? modalDiscountUsage() :
                  activeId === 3 ? modalRules() :
                    activeId === 4 ? modalNote() : null
            }
            {/* //bodi */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                // dispatch(AdminRedux.actions.getDetailAdmin('', ''))
                history.push(`/voucher/edit/${1}`)
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default PreviewVoucherModal
