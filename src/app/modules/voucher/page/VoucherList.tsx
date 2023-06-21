/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useState } from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import { usePagination } from 'src/app/hooks/pagination-hook'
import { PageTitle } from 'src/_metronic/layout/core'
import { getTitle } from 'src/app/utils/title-utils'
// import { deleteGender, getGenderList } from '../redux/GenderCRUD'
import { Voucher } from '../models/Voucher'
import {
  NavLink,
  useHistory,
} from 'react-router-dom'
// import DeleteGenderModal from '../components/DeleteGenderModal'
// import { getErrorMessage } from 'src/app/utils/api-utils'
import { useHeaderToast } from 'src/app/components/ToastComponent'
import { Link } from 'react-router-dom'
import DeleteVoucherModal from '../components/DeleteVoucherModal'
import PreviewVoucherModal from '../components/PreviewVoucherModal'
import VoucherScreens from '../Screens'
import DateRangePicker from 'src/app/components/DateRangePicker'
import ApproveCampaignModal from '../components/ApproveCampaignModal'
import DeclineCampaignModal from '../components/DeclineCampaignModal'

const values = [
  { id: 1, text: "Active (3)" },
  { id: 2, text: "Need Approval ()" },
  { id: 3, text: "Revision Required ()" },
  { id: 4, text: "Inactive (2)" },
  { id: 5, text: "Draft ()" }
];

const VoucherList: FC = (props: any) => {
  const { addPageToasts } = useHeaderToast()
  const history = useHistory()

  const [activeId, setActiveId] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showApprovCampaign, setShowApprovCampaign] = useState(false)
  const [showDeclineCampaign, setShowDeclineCampaign] = useState(false)
  const [handleDeleteData, setHandleDeleteData] = useState<any>(null)
  const [handleApprovCampaign, setHandleApprovCampaign] = useState<any>(null)
  const [handleDeclineCampaign, setHandleDeclineCampaign] = useState<any>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [handleEditData, setHandleEditData] = useState<any>(null)


  const { state, setPage, setQuery } = usePagination<Voucher, any>(
    useCallback((state, setState, isActive, cancelToken) => {
      const fetchCall = async () => {
        const statuses: string[] = []
        //   if (state.query.status) {
        //     statuses.push(state.query.status)
        //   } else {
        statuses.push('ACTIVE')
        //     statuses.push('INACTIVE')
        //   }
        const User = {
          data: {
            data: {
              current_page: 1,
              items: [
                {
                  id: 1,
                  campaign_name: 'Diskon 30% April Mop',
                  code: 'edot10',
                  platform: 'FOOD',
                  periode: '1 Nov 2022 - 31 Des 2022',
                  total_quota: 50,
                  quota_user: 1,
                  total_used: 0,
                  transaction_type: 'All Transaction',
                  status: 2,
                } as Voucher,
                {
                  id: 1,
                  campaign_name: 'Diskon 30% April Mop',
                  code: 'edot10',
                  platform: 'FOOD',
                  periode: '1 Nov 2022 - 31 Des 2022',
                  total_quota: 50,
                  quota_user: 1,
                  total_used: 0,
                  transaction_type: 'All Transaction',
                  status: 1,
                } as Voucher,
                {
                  id: 1,
                  campaign_name: 'Diskon 30% April Mop',
                  code: 'edot10',
                  platform: 'FOOD',
                  periode: '1 Nov 2022 - 31 Des 2022',
                  total_quota: 50,
                  quota_user: 1,
                  total_used: 0,
                  transaction_type: 'All Transaction',
                  status: 2,
                } as Voucher,
                {
                  id: 1,
                  campaign_name: 'Diskon 30% April Mop',
                  code: 'edot10',
                  platform: 'FOOD',
                  periode: '1 Nov 2022 - 31 Des 2022',
                  total_quota: 50,
                  quota_user: 1,
                  total_used: 0,
                  transaction_type: 'All Transaction',
                  status: 1,
                } as Voucher,
                {
                  id: 1,
                  campaign_name: 'Diskon 30% April Mop',
                  code: 'edot10',
                  platform: 'FOOD',
                  periode: '1 Nov 2022 - 31 Des 2022',
                  total_quota: 50,
                  quota_user: 1,
                  total_used: 0,
                  transaction_type: 'All Transaction',
                  status: 3,
                } as Voucher,
                {
                  id: 1,
                  campaign_name: 'Diskon 30% April Mop',
                  code: 'edot10',
                  platform: 'FOOD',
                  periode: '1 Nov 2022 - 31 Des 2022',
                  total_quota: 50,
                  quota_user: 1,
                  total_used: 0,
                  transaction_type: 'All Transaction',
                  status: 4,
                } as Voucher,
              ],
              total_item: 5,
            },
          },
        }
        //   const admin = await getVerifiedMemberList({
        //     page: state.page,
        //     limit: state.limit,
        //     search: state.query.search,
        //     role_id: state.query.role_id !== '' ? state.query.role_id : undefined,
        //     statuses,
        //     cancelToken,
        //   })
        //   if (isActive()) {
        setState((prev) => ({
          ...prev,
          loading: false,
          refreshing: false,
          error: false,
          page: User.data.data?.current_page,
          data: User.data.data?.items,
          total: User.data.data?.total_item,
        }))
        //   }
        // } catch (e) {
        //   if (isActive()) {
        //     setState((prev) => ({
        //       ...prev,
        //       loading: false,
        //       error: true,
        //       data: [],
        //     }))
        //   }
        // }
      }
      // try {
      //   const statuses: string[] = []
      //   if (state.query.status) {
      //     statuses.push(state.query.status)
      //   } else {
      //     statuses.push('ACTIVE')
      //     statuses.push('INACTIVE')
      //   }
      //   const gender = await getGenderList({
      //     search: state.query.search,
      //     // role_id: state.query.role_id !== '' ? state.query.role_id : undefined,
      //     statuses,
      //     // cancelToken,
      //   })
      //   if (isActive()) {
      //     setState((prev) => ({
      //       ...prev,
      //       loading: false,
      //       refreshing: false,
      //       error: false,
      //       data: gender.data.data ?? [],
      //     }))
      //   }
      // } catch (e) {
      //   if (isActive()) {
      //     setState((prev) => ({
      //       ...prev,
      //       loading: false,
      //       error: true,
      //       data: [],
      //     }))
      //   }
      // }

      fetchCall()
    }, []),
    {
      loading: false,
      refreshing: false,
      error: false,
      page: 0,
      data: [] as Voucher[],
      total: 0,
      limit: 10,
      query: {},
    }
  )

  // const genderStatus = (label: any) => {
  //   switch (label) {
  //     case GenderStatus.INACTIVE:
  //       return <span className='badge badge-light-dark text-gray-600'>Inactive</span>
  //     default:
  //       return <span className='badge badge-light-success'>Active</span>
  //   }
  // }
  useEffect(() => {
    document.title = getTitle('List of Verified')
  }, [])

  useEffect(() => {
    setPage(1)
  }, [setPage])

  return (
    <>
      <PageTitle>Manage Voucher</PageTitle>
      <div className='card shadow-sm'>
        {/* <AlertSuccess
          // message={success}
          message='success'
          handleClose={() => {}}
          // handleClose={() => dispatch(AdminRedux.actions.setSuccess(''))}
        /> */}
        <div className='card-tab d-flex align-items-center justify-content-between'>
          <div className='flex-fill fs-2 fw-bolder'>{VoucherScreens.VOUCHER_LIST.TITLE}</div>
          <div className='card-toolbar'>
            <Link
              to={{
                pathname: `/voucher/add`,
                // state: categoryDetail,
              }}
              className='btn btn-sm btn-secondary fw-bold fs-6'
            >
              <InlineSVG
                src={'/media/icons/circleplus.svg'}
                // className='position-absolute translate-middle-y top-50 ms-4 pe-none'
              />
              &nbsp;
              Create Voucher
            </Link>
          </div>
        </div>
        <div className='card-header d-flex align-items-center justify-content-between' id='navbar'>
          <ul className="nav">
            {values.map((val, index) => (
              //@ts-ignore
              <li key={index} className="nav-item" onClick={() => setActiveId(val.id)}>
                <NavLink exact activeClassName={activeId === val.id ? "nav-active link-dark d-flex" : "nav-link link-dark d-flex"} style={{ flexDirection: 'row' }} to='#' >
                  <div className='circle' style={{ width: 10, height: 10, marginRight: 10, marginTop: 5, backgroundColor: val.id === 2 ? '#FFB400' : val.id === 3 ? '#FF4D53' : val.id === 4 ? '#888888' : val.id === 5 ? '#DDDDDD' : '#02EF8B' }} />
                  {val.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className='card-body'>
          {/* begin::Search */}
          <div className='d-flex flex-wrap align-items-center'>
            <div className='w-lg-200px w-100 position-relative'>
              <InlineSVG
                src={'/media/icons/efood/IconSearch.svg'}
                className='position-absolute translate-middle-y top-50 ms-4 pe-none'
              />
              <input
                placeholder='Search'
                className='form-control form-control-lg form-control-solid ps-13'
                type='text'
                autoComplete='off'
              // onChange={(e) => searchFn(e.currentTarget.value)}
              />
            </div>
            <div className='w-lg-auto w-100 d-flex align-items-center'>
              <span className='me-5 ms-lg-4 flex-shrink-0'>Platform</span>
              <div className='position-relative w-lg-200px w-100'>
                <InlineSVG
                  src={'/media/icons/efood/IconChevronDown.svg'}
                  className='position-absolute translate-middle-y top-50 me-4 end-0 pe-none'
                />
                <select
                  className='form-control form-control-lg form-control-solid pe-13'
                  autoComplete='off'
                  value={state.query.role_id}
                  onChange={(e) =>
                    setQuery((prev) => ({
                      ...prev,
                      role_id: e.target.value,
                    }))
                  }
                >
                  <option value={''}>All</option>
                  <option value={''}>FOOD</option>
                  <option value={''}>SHOP</option>
                  {/* {filterRole.map((data: any, index: any) => {
                    return (
                      <option key={index} value={data.value}>
                        {data.label}
                      </option>
                    )
                  })} */}
                </select>
              </div>
            </div>
            <div className='w-lg-auto w-200 d-flex align-items-center'>
              <span className='me-5 ms-lg-4 flex-shrink-0'>Periode</span>
              <div className='position-relative w-lg-250px w-200'>
                <DateRangePicker className='' onChange={() => { }} format='DD MMM YYYY' />
              </div>
            </div>
          </div>
          {/* end::Search */}
          {/* begin::Table */}
          <div className='position-relative'>
            <div className='table-responsive my-8'>
              <table className='table table-striped table-hover gx-4 gy-4'>
                <thead className='text-gray fw-700'>
                  <tr>
                    <th>NO</th>
                    <th>VOUCHER NAME</th>
                    <th>VOUCHER CODE</th>
                    <th>PLATFORM</th>
                    <th>PERIODE</th>
                    <th>TOTAL QUOTA</th>
                    <th>QUOTA @USER</th>
                    <th>TOTAL USED</th>
                    <th>TRANSACTION TYPE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {state.data.length === 0 ? (
                    <tr>
                      <td colSpan={9} className='text-center'>
                        {state.loading
                          ? 'Loading'
                          : state.error
                            ? 'Error, try to refresh the page'
                            : 'Data Kosong'}
                      </td>
                    </tr>
                  ) : (
                    state.data.map((value, index) => (
                      value.status === 1 && activeId === 1 ||
                        value.status === 2 && activeId === 2 ||
                        value.status === 3 && activeId === 3 ||
                        value.status === 4 && activeId === 4
                        ?
                        <tr key={index}>
                          <td className='align-middle'>
                            {(state.page - 1) * state.limit + index + 1}
                          </td>
                          <td className='align-middle'>{value.campaign_name}</td>
                          <td className='align-middle'>{value.code}</td>
                          <td className='align-middle'>{value.platform}</td>
                          <td className='align-middle'>{value.periode}</td>
                          <td className='align-middle'>{value.total_quota}</td>
                          <td className='align-middle'>{value.quota_user}</td>
                          <td className='align-middle'>{value.total_used}</td>
                          <td className='align-middle'>{value.transaction_type}</td>
                          <td className='align-middle'>
                            {' '}
                            <div className='d-flex p-1 status-badge' style={{ width: value.status === 3 || value.status === 2 ? 100 : 50, backgroundColor: value.status === 1 ? '#DCFCE7' : value.status === 2 ? '#FFFBDF' : value.status === 3 ? '#FFE4E5' : '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ color: value.status === 1 ? '#22C55E' : value.status === 2 ? '#B78101' : value.status === 3 ? '#ED1C24' : '#666666', textAlign: 'center', fontSize: 10, flexDirection: 'row' }}>
                                {value.status === 1 ? 'Active' : value.status === 2 ? 'Need Approval' : value.status === 3 ? 'Revision Required' : 'Inactive'}
                              </span>
                            </div>
                          </td>
                          <td className='align-middle' style={{ minWidth: 125 }}>

                            <div
                              className='d-inline'
                              data-bs-toggle="modal"
                              data-bs-target="#kt_modal_scrollable_2"
                              style={{ cursor: 'pointer' }}
                            >
                              <InlineSVG src={'/media/icons/eye.svg'} />
                            </div>&nbsp;&nbsp;

                            {
                              value.status === 2 ?
                                <div
                                  className='d-inline'
                                  onClick={() => {
                                    setHandleApprovCampaign(value)
                                    setShowApprovCampaign(true)
                                  }}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <InlineSVG src='/media/icons/ceklis.svg' />
                                </div>
                                :
                                <button
                                  type='button'
                                  className='btn-transparent me-3'
                                  onClick={() =>
                                    // dispatch(AdminRedux.actions.getDetailAdmin('', ''))
                                    history.push(`/voucher/edit/${value.id}`)
                                  }
                                >
                                  <InlineSVG src={'/media/icons/edit.svg'} />
                                </button>
                            }

                            {value.status === 2 ?
                              <div
                                className='d-inline'
                                onClick={() => {
                                  setHandleDeclineCampaign(value)
                                  setShowDeclineCampaign(true)
                                }}
                                style={{ cursor: 'pointer' }}
                              > &nbsp;
                                <InlineSVG src='/media/icons/closered.svg' />
                              </div>
                              :
                              <div
                                className='d-inline'
                                onClick={() => {
                                  setHandleDeleteData(value)
                                  setShowDeleteModal(true)
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <InlineSVG src='/media/icons/trash.svg' />
                              </div>}
                            &nbsp;&nbsp;
                            {value.status === 3 ?
                              <div
                                className='d-inline'
                                onClick={() => {
                                  setHandleDeleteData(value)
                                  setShowDeleteModal(true)
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <InlineSVG src='/media/icons/note.svg' />
                              </div> : null
                            }
                            {/* ) : null} */}
                          </td>
                        </tr> : null
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* start::Loader */}
            {state.data.length > 0 && state.loading ? (
              <div
                className='position-absolute top-0 start-0 end-0 bottom-0'
                style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
              />
            ) : null}
            {/* end::Loader */}
          </div>
          {/* end::Table */}
        </div>
        <DeleteVoucherModal
          onDelete={() => {
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
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          data={handleDeleteData}
        />
        <ApproveCampaignModal
          onDelete={() => {
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
          show={showApprovCampaign}
          handleClose={() => setShowApprovCampaign(false)}
          data={handleApprovCampaign}
        />
        <DeclineCampaignModal
          onDelete={() => {
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
          show={showDeclineCampaign}
          handleClose={() => setShowDeclineCampaign(false)}
          data={handleDeclineCampaign}
        />
        <PreviewVoucherModal
          onEdit={() => {
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
          show={showPreviewModal}
          handleClose={() => setShowPreviewModal(false)}
          data={handleEditData}
        />
      </div>
    </>
  )
}

export { VoucherList }
