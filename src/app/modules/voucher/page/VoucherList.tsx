/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import { usePagination } from 'src/app/hooks/pagination-hook'
import { PageTitle } from 'src/_metronic/layout/core'
import { getTitle } from 'src/app/utils/title-utils'
import { Campaign } from '../models/Voucher'
import {
  NavLink,
  useHistory,
} from 'react-router-dom'
import { useHeaderToast } from 'src/app/components/ToastComponent'
import { Link } from 'react-router-dom'
import DeleteVoucherModal from '../components/DeleteVoucherModal'
import PreviewVoucherModal from '../components/PreviewVoucherModal'
import VoucherScreens from '../Screens'
import DateRangePicker from 'src/app/components/DateRangePicker'
import ApproveCampaignModal from '../components/ApproveCampaignModal'
import DeclineCampaignModal from '../components/DeclineCampaignModal'
import { deleteCampaign, getVoucherList, updateRevision } from '../redux/VoucherCRUD'
import moment from 'moment'
import { getErrorMessage } from 'src/app/utils/api-utils'
// import moment from 'moment'

const values = [
  { id: 1, text: "Active" },
  { id: 2, text: "Need Approval" },
  { id: 3, text: "Revision Required" },
  { id: 4, text: "Inactive" },
  { id: 5, text: "Draft" }
];

const VoucherList: FC = (props: any) => {
  const { addPageToasts } = useHeaderToast()
  const history = useHistory()

  const [activeId, setActiveId] = useState(1);
  const [lenghtActive, setLenghtActive] = useState(0);
  const [lenghtApproval, setLenghtApproval] = useState(0);
  const [lenghtRevision, setLenghtRevision] = useState(0);
  const [lenghtInactive, setLenghtInactive] = useState(0);
  const [lenghtDraft, setLenghtDraft] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showApprovCampaign, setShowApprovCampaign] = useState(false)
  const [valueNote, setValueNote] = useState('')
  const [showDeclineCampaign, setShowDeclineCampaign] = useState(false)
  const [handleDeleteData, setHandleDeleteData] = useState<any>(null)
  const [handleApprovCampaign, setHandleApprovCampaign] = useState<any>(null)
  const [handleDeclineCampaign, setHandleDeclineCampaign] = useState<any>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [handleEditData, setHandleEditData] = useState<any>(null)
  const [handlePreviewModal, setHandlePreviewModal] = useState<any>(null)

  const { state, setPage, setQuery } = usePagination<Campaign, any>(
    useCallback((state, setState, isActive, cancelToken) => {
      const fetchCall = async () => {
        console.log("QUeris ", state);

        try {
          const statuses: string[] = []
          if (state.query.status) {
            statuses.push(state.query.status)
          } else {
            statuses.push('ACTIVE')
            statuses.push('INACTIVE')
          }
          const campaignActive = await getVoucherList({
            search: state.query.search,
            //@ts-ignore
            status: 'active',
            bu_id: state.query.bu_id
            // cancelToken,
          })
          const campaignNeedApprove = await getVoucherList({
            search: state.query.search,
            //@ts-ignore
            status: 'need-approval',
            bu_id: state.query.bu_id
            // cancelToken,
          })
          const campaignNeedRevision = await getVoucherList({
            search: state.query.search,
            //@ts-ignore
            status: 'need-revision',
            bu_id: state.query.bu_id
            // cancelToken,
          })
          const campaignInactive = await getVoucherList({
            search: state.query.search,
            //@ts-ignore
            status: 'inactive',
            bu_id: state.query.bu_id
            // cancelToken,
          })
          const campaignDraft = await getVoucherList({
            search: state.query.search,
            //@ts-ignore
            status: 'draft',
            bu_id: state.query.bu_id
            // cancelToken,
          })
          //@ts-ignore
          setLenghtActive(campaignActive?.data?.data?.length ?? 0)
          //@ts-ignore
          setLenghtApproval(campaignNeedApprove?.data?.data?.length ?? 0)
          //@ts-ignore
          setLenghtRevision(campaignNeedRevision?.data?.data?.length ?? 0)
          //@ts-ignore
          setLenghtInactive(campaignInactive?.data?.data?.length ?? 0)
          //@ts-ignore
          setLenghtDraft(campaignDraft?.data?.data?.length ?? 0)

          // if (isActive()) {
          //@ts-ignore
          setState((prev) => ({
            ...prev,
            loading: false,
            refreshing: false,
            error: false,
            data: {
              active: campaignActive?.data?.data ?? [],
              needApproval: campaignNeedApprove?.data?.data ?? [],
              needRevision: campaignNeedRevision?.data?.data ?? [],
              inactive: campaignInactive?.data?.data ?? [],
              draft: campaignDraft?.data?.data ?? [],
            }
          }))

          // }
        } catch (e) {
          //@ts-ignore
          setLenghtActive(0)
          //@ts-ignore
          setLenghtApproval(0)
          //@ts-ignore
          setLenghtRevision(0)
          //@ts-ignore
          setLenghtInactive(0)
          //@ts-ignore
          setLenghtDraft(0)
          // if (isActive()) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: true,
            data: [],
          }))
          // }
        }
      }

      fetchCall()
    }, []),
    {
      loading: false,
      refreshing: false,
      error: false,
      page: 0,
      data: [] as Campaign[],
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


  console.log("data ", handlePreviewModal);

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
                  {val.text + (val.id === 1 ? ` (${lenghtActive})` : val.id === 1 ? ` (${lenghtActive})` : val.id === 2 ? ` (${lenghtApproval})` : val.id === 3 ? ` (${lenghtRevision})` : val.id === 4 ? ` (${lenghtInactive})` : val.id === 5 ? ` (${lenghtDraft})` : null)}
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
                value={state.query.search}
                onChange={(e) =>
                  setQuery((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
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
                  value={state.query.bu_id}
                  onChange={(e) =>
                    setQuery((prev) => ({
                      ...prev,
                      bu_id: e.target.value,
                    }))
                  }
                >
                  <option value={''}>All</option>
                  <option value={2}>FOOD</option>
                  <option value={4}>SHOP</option>
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
                  {
                    //@ts-ignore
                    state.data.length === 0 ? (
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
                      activeId === 1 ?
                        //@ts-ignore
                        state.data.active.map((value, index) => (
                          // console.log("value", value)
                          <tr key={index}>
                            <td className='align-middle'>
                              {(state.page - 1) * state.limit + index + 1}
                            </td>
                            <td className='align-middle'>{value.campaign_name}</td>
                            <td className='align-middle'>{value?.voucher.length >= 1 && value?.voucher_type === 'manual' ? value?.voucher[0].voucher_code : value?.voucher.length >= 1 && value?.voucher_type === 'generate' ? 'Generated code ' + `(${value.voucher_quota})` : '-'}</td>
                            <td className='align-middle'>{value.business_unit.bu_name}</td>
                            <td className='align-middle'>{moment(value.valid_start).format('DD MMM YYYY') + ' - ' + moment(value.valid_end).format('DD MMM YYYY')}</td>
                            <td className='align-middle'>{value.voucher_quota}</td>
                            <td className='align-middle'>{value.voucher_quota_user}</td>
                            <td className='align-middle'>{value.voucher_used}</td>
                            <td className='align-middle'>{value.transaction_type.description}</td>
                            <td className='align-middle'>
                              {' '}
                              <div className='d-flex p-1 status-badge' style={{ width: value.status === 'need-revision' || value.status === 'need-approval' ? 100 : 50, backgroundColor: value.status === 'active' ? '#DCFCE7' : value.status === 'need-approval' ? '#FFFBDF' : value.status === 'need-revision' ? '#FFE4E5' : '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: value.status === 'active' ? '#22C55E' : value.status === 'need-approval' ? '#B78101' : value.status === 'need-revision' ? '#ED1C24' : '#666666', textAlign: 'center', fontSize: 10, flexDirection: 'row' }}>
                                  {value.status === 'active' ? 'Active' : value.status === 'need-approval' ? 'Need Approval' : value.status === 'need-revision' ? 'Revision Required' : 'Inactive'}
                                </span>
                              </div>
                            </td>
                            <td className='align-middle' style={{ minWidth: 125 }}>

                              <div
                                className='d-inline'
                                data-bs-toggle="modal"
                                data-bs-target="#kt_modal_scrollable_2"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setHandlePreviewModal(value)
                                  setShowPreviewModal(true)
                                }}
                              >
                                <InlineSVG src={'/media/icons/eye.svg'} />
                              </div>&nbsp;&nbsp;

                              {
                                value.status === 'need-approval' ?
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
                                      history.push(`/voucher/edit/${value.campaign_id}`)
                                    }
                                  >
                                    <InlineSVG src={'/media/icons/edit.svg'} />
                                  </button>
                              }

                              {value.status === 'need-approval' ?
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
                              {value.status === 'need-revision' ?
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
                          </tr>
                        )) :

                        activeId === 2 ?
                          //@ts-ignore
                          state.data.needApproval.map((value, index) => (
                            <tr key={index}>
                              <td className='align-middle'>
                                {(state.page - 1) * state.limit + index + 1}
                              </td>
                              <td className='align-middle'>{value.campaign_name}</td>
                              <td className='align-middle'>{value?.voucher.length >= 1 && value?.voucher_type === 'manual' ? value?.voucher[0].voucher_code : value?.voucher.length >= 1 && value?.voucher_type === 'generate' ? 'Generated code ' + `(${value.voucher_quota})` : '-'}</td>
                              <td className='align-middle'>{value.business_unit.bu_name}</td>
                              <td className='align-middle'>{moment(value.valid_start).format('DD MMM YYYY') + ' - ' + moment(value.valid_end).format('DD MMM YYYY')}</td>
                              <td className='align-middle'>{value.voucher_quota}</td>
                              <td className='align-middle'>{value.voucher_quota_user}</td>
                              <td className='align-middle'>{value.voucher_used}</td>
                              <td className='align-middle'>{value.transaction_type.description}</td>
                              <td className='align-middle'>
                                {' '}
                                <div className='d-flex p-1 status-badge' style={{ width: value.status === 'need-revision' || value.status === 'need-approval' ? 100 : 50, backgroundColor: value.status === 'active' ? '#DCFCE7' : value.status === 'need-approval' ? '#FFFBDF' : value.status === 'need-revision' ? '#FFE4E5' : '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}>
                                  <span style={{ color: value.status === 'active' ? '#22C55E' : value.status === 'need-approval' ? '#B78101' : value.status === 'need-revision' ? '#ED1C24' : '#666666', textAlign: 'center', fontSize: 10, flexDirection: 'row' }}>
                                    {value.status === 'active' ? 'Active' : value.status === 'need-approval' ? 'Need Approval' : value.status === 'need-revision' ? 'Revision Required' : 'Inactive'}
                                  </span>
                                </div>
                              </td>
                              <td className='align-middle' style={{ minWidth: 125 }}>

                                <div
                                  className='d-inline'
                                  data-bs-toggle="modal"
                                  data-bs-target="#kt_modal_scrollable_2"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    setHandlePreviewModal(value)
                                    setShowPreviewModal(true)
                                  }}
                                >
                                  <InlineSVG src={'/media/icons/eye.svg'} />
                                </div>&nbsp;&nbsp;

                                {
                                  value.status === 'need-approval' ?
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
                                        history.push(`/voucher/edit/${value.campaign_id}`)
                                      }
                                    >
                                      <InlineSVG src={'/media/icons/edit.svg'} />
                                    </button>
                                }

                                {value.status === 'need-approval' ?
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
                                {value.status === 'need-revision' ?
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
                            </tr>
                          )) :

                          activeId === 3 ?
                            //@ts-ignore
                            state.data.needRevision.map((value, index) => (
                              <tr key={index}>
                                <td className='align-middle'>
                                  {(state.page - 1) * state.limit + index + 1}
                                </td>
                                <td className='align-middle'>{value.campaign_name}</td>
                                <td className='align-middle'>{value?.voucher.length >= 1 && value?.voucher_type === 'manual' ? value?.voucher[0].voucher_code : value?.voucher.length >= 1 && value?.voucher_type === 'generate' ? 'Generated code ' + `(${value.voucher_quota})` : '-'}</td>
                                <td className='align-middle'>{value.business_unit.bu_name}</td>
                                <td className='align-middle'>{moment(value.valid_start).format('DD MMM YYYY') + ' - ' + moment(value.valid_end).format('DD MMM YYYY')}</td>
                                <td className='align-middle'>{value.voucher_quota}</td>
                                <td className='align-middle'>{value.voucher_quota_user}</td>
                                <td className='align-middle'>{value.voucher_used}</td>
                                <td className='align-middle'>{value.transaction_type.description}</td>
                                <td className='align-middle'>
                                  {' '}
                                  <div className='d-flex p-1 status-badge' style={{ width: value.status === 'need-revision' || value.status === 'need-approval' ? 100 : 50, backgroundColor: value.status === 'active' ? '#DCFCE7' : value.status === 'need-approval' ? '#FFFBDF' : value.status === 'need-revision' ? '#FFE4E5' : '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: value.status === 'active' ? '#22C55E' : value.status === 'need-approval' ? '#B78101' : value.status === 'need-revision' ? '#ED1C24' : '#666666', textAlign: 'center', fontSize: 10, flexDirection: 'row' }}>
                                      {value.status === 'active' ? 'Active' : value.status === 'need-approval' ? 'Need Approval' : value.status === 'need-revision' ? 'Revision Required' : 'Inactive'}
                                    </span>
                                  </div>
                                </td>
                                <td className='align-middle' style={{ minWidth: 125 }}>

                                  <div
                                    className='d-inline'
                                    data-bs-toggle="modal"
                                    data-bs-target="#kt_modal_scrollable_2"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                      setHandlePreviewModal(value)
                                      setShowPreviewModal(true)
                                    }}
                                  >
                                    <InlineSVG src={'/media/icons/eye.svg'} />
                                  </div>&nbsp;&nbsp;

                                  {
                                    value.status === 'need-approval' ?
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
                                          history.push(`/voucher/edit/${value.campaign_id}`)
                                        }
                                      >
                                        <InlineSVG src={'/media/icons/edit.svg'} />
                                      </button>
                                  }

                                  {value.status === 'need-approval' ?
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
                                  {value.status === 'need-revision' ?
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
                              </tr>
                            )) :

                            activeId === 4 ?
                              //@ts-ignore
                              state.data.inactive.map((value, index) => (
                                <tr key={index}>
                                  <td className='align-middle'>
                                    {(state.page - 1) * state.limit + index + 1}
                                  </td>
                                  <td className='align-middle'>{value.campaign_name}</td>
                                  <td className='align-middle'>{value?.voucher.length >= 1 && value?.voucher_type === 'manual' ? value?.voucher[0].voucher_code : value?.voucher.length >= 1 && value?.voucher_type === 'generate' ? 'Generated code ' + `(${value.voucher_quota})` : '-'}</td>
                                  <td className='align-middle'>{value.business_unit.bu_name}</td>
                                  <td className='align-middle'>{moment(value.valid_start).format('DD MMM YYYY') + ' - ' + moment(value.valid_end).format('DD MMM YYYY')}</td>
                                  <td className='align-middle'>{value.voucher_quota}</td>
                                  <td className='align-middle'>{value.voucher_quota_user}</td>
                                  <td className='align-middle'>{value.voucher_used}</td>
                                  <td className='align-middle'>{value.transaction_type.description}</td>
                                  <td className='align-middle'>
                                    {' '}
                                    <div className='d-flex p-1 status-badge' style={{ width: value.status === 'need-revision' || value.status === 'need-approval' ? 100 : 50, backgroundColor: value.status === 'active' ? '#DCFCE7' : value.status === 'need-approval' ? '#FFFBDF' : value.status === 'need-revision' ? '#FFE4E5' : '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}>
                                      <span style={{ color: value.status === 'active' ? '#22C55E' : value.status === 'need-approval' ? '#B78101' : value.status === 'need-revision' ? '#ED1C24' : '#666666', textAlign: 'center', fontSize: 10, flexDirection: 'row' }}>
                                        {value.status === 'active' ? 'Active' : value.status === 'need-approval' ? 'Need Approval' : value.status === 'need-revision' ? 'Revision Required' : 'Inactive'}
                                      </span>
                                    </div>
                                  </td>
                                  <td className='align-middle' style={{ minWidth: 125 }}>

                                    <div
                                      className='d-inline'
                                      data-bs-toggle="modal"
                                      data-bs-target="#kt_modal_scrollable_2"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => {
                                        setHandlePreviewModal(value)
                                        setShowPreviewModal(true)
                                      }}
                                    >
                                      <InlineSVG src={'/media/icons/eye.svg'} />
                                    </div>&nbsp;&nbsp;

                                    {
                                      value.status === 'need-approval' ?
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
                                            history.push(`/voucher/edit/${value.campaign_id}`)
                                          }
                                        >
                                          <InlineSVG src={'/media/icons/edit.svg'} />
                                        </button>
                                    }

                                    {value.status === 'need-approval' ?
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
                                    {value.status === 'need-revision' ?
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
                                </tr>
                              )) :

                              activeId === 5 ?
                                //@ts-ignore
                                state.data.inactive.map((value, index) => (
                                  <tr key={index}>
                                    <td className='align-middle'>
                                      {(state.page - 1) * state.limit + index + 1}
                                    </td>
                                    <td className='align-middle'>{value.campaign_name}</td>
                                    <td className='align-middle'>{value?.voucher.length >= 1 && value?.voucher_type === 'manual' ? value?.voucher[0].voucher_code : value?.voucher.length >= 1 && value?.voucher_type === 'generate' ? 'Generated code ' + `(${value.voucher_quota})` : '-'}</td>
                                    <td className='align-middle'>{value.business_unit.bu_name}</td>
                                    <td className='align-middle'>{moment(value.valid_start).format('DD MMM YYYY') + ' - ' + moment(value.valid_end).format('DD MMM YYYY')}</td>
                                    <td className='align-middle'>{value.voucher_quota}</td>
                                    <td className='align-middle'>{value.voucher_quota_user}</td>
                                    <td className='align-middle'>{value.voucher_used}</td>
                                    <td className='align-middle'>{value.transaction_type.description}</td>
                                    <td className='align-middle'>
                                      {' '}
                                      <div className='d-flex p-1 status-badge' style={{ width: value.status === 'need-revision' || value.status === 'need-approval' ? 100 : 50, backgroundColor: value.status === 'active' ? '#DCFCE7' : value.status === 'need-approval' ? '#FFFBDF' : value.status === 'need-revision' ? '#FFE4E5' : '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ color: value.status === 'active' ? '#22C55E' : value.status === 'need-approval' ? '#B78101' : value.status === 'need-revision' ? '#ED1C24' : '#666666', textAlign: 'center', fontSize: 10, flexDirection: 'row' }}>
                                          {value.status === 'active' ? 'Active' : value.status === 'need-approval' ? 'Need Approval' : value.status === 'need-revision' ? 'Revision Required' : 'Inactive'}
                                        </span>
                                      </div>
                                    </td>
                                    <td className='align-middle' style={{ minWidth: 125 }}>

                                      <div
                                        className='d-inline'
                                        data-bs-toggle="modal"
                                        data-bs-target="#kt_modal_scrollable_2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          setHandlePreviewModal(value)
                                          setShowPreviewModal(true)
                                        }}
                                      >
                                        <InlineSVG src={'/media/icons/eye.svg'} />
                                      </div>&nbsp;&nbsp;

                                      {
                                        value.status === 'need-approval' ?
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
                                              history.push(`/voucher/edit/${value.campaign_id}`)
                                            }
                                          >
                                            <InlineSVG src={'/media/icons/edit.svg'} />
                                          </button>
                                      }

                                      {value.status === 'need-approval' ?
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
                                      {value.status === 'need-revision' ?
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
                                  </tr>
                                )) : null
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
            deleteCampaign(handleDeleteData?.campaign_id ?? '')
              .then(() => {
                // dispatch(AdminRedux.actions.setSuccess('User berhasil dihapus.'))
                setShowDeleteModal(false)
                setPage(state.page)
              })
              .catch((err) => {
                setShowDeleteModal(false)
                addPageToasts({ scheme: 'danger', text: getErrorMessage(err, true) })
              })
          }}
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          data={handleDeleteData}
        />
        <ApproveCampaignModal
          onDelete={() => {
            updateRevision(handleApprovCampaign.campaign_id, 'approve', '')
              .then(() => {
                // dispatch(GenderRedux.actions.setSuccess('Gender berhasil dihapus.'))
                setShowApprovCampaign(false)
                setPage(state.page)
              })
              .catch((err) => {
                setShowApprovCampaign(false)
                addPageToasts({ scheme: 'danger', text: getErrorMessage(err, true) })
              })
          }}
          show={showApprovCampaign}
          handleClose={() => setShowApprovCampaign(false)}
          data={handleApprovCampaign}
        />
        <DeclineCampaignModal
          onRevision={() => {
            updateRevision(handleDeclineCampaign.campaign_id, 'decline', valueNote)
              .then(() => {
                // dispatch(GenderRedux.actions.setSuccess('Gender berhasil dihapus.'))
                setShowDeclineCampaign(false)
                setPage(state.page)
              })
              .catch((err) => {
                setShowDeclineCampaign(false)
                addPageToasts({ scheme: 'danger', text: getErrorMessage(err, true) })
              })
          }}
          //@ts-ignore
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValueNote(e.target.value)
          }
          show={showDeclineCampaign}
          handleClose={() => setShowDeclineCampaign(false)}
          data={handleDeclineCampaign}
        />
        <PreviewVoucherModal
          onPreview={() => {
            // getCampaignDetail(handlePreviewModal?.campaign_id ?? '')
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
          data={handlePreviewModal}
        />
      </div>
    </>
  )
}

export { VoucherList }
