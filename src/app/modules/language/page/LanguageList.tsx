/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useCallback, useEffect, useState} from 'react'
import InlineSVG from 'react-inlinesvg/esm'
import Pagination from 'src/app/components/Pagination'
import {usePagination} from 'src/app/hooks/pagination-hook'
import {PageTitle} from 'src/_metronic/layout/core'
import {getTitle} from 'src/app/utils/title-utils'
import {deleteLanguage, getLanguageList} from '../redux/LanguageCRUD'
import {Language} from '../models/Language'
import LanguageScreens from '../Screens'
import {useHistory} from 'react-router-dom'
import DeleteLanguageModal from '../components/DeleteLanguageModal'
import {Link} from 'react-router-dom'

const LanguageList: FC = (props: any) => {
  const history = useHistory()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [handleDeleteData, setHandleDeleteData] = useState<any>(null)
  // const {success}: any = useSelector<RootState>(({admin}) => admin, shallowEqual)
  const {state, setLimit, setPage, setQuery} = usePagination<Language, any>(
    useCallback((state, setState, isActive, cancelToken) => {
      const fetchCall = async () => {
        try {
          const statuses: string[] = []
          if (state.query.status) {
            statuses.push(state.query.status)
          } else {
            statuses.push('ACTIVE')
            statuses.push('INACTIVE')
          }
          const language = await getLanguageList({
            page: state.page,
            limit: state.limit,
            search: state.query.search,
            // role_id: state.query.role_id !== '' ? state.query.role_id : undefined,
            statuses,
            // cancelToken,
          })
          if (isActive()) {
            setState((prev) => ({
              ...prev,
              loading: false,
              refreshing: false,
              error: false,
              page: language.data.data?.current_page ?? 1,
              data: language.data.data?.items ?? [],
              total: language.data.data?.total ?? 0,
            }))
          }
        } catch (e) {
          if (isActive()) {
            setState((prev) => ({
              ...prev,
              loading: false,
              error: true,
              data: [],
            }))
          }
        }
      }

      fetchCall()
    }, []),
    {
      loading: false,
      refreshing: false,
      error: false,
      page: 0,
      data: [] as Language[],
      total: 0,
      limit: 10,
      query: {},
    }
  )
  // const searchFn = useDebounceEffect(
  //   useCallback(
  //     (text: string) => {
  //       setQuery((prev) => ({
  //         ...prev,
  //         search: text,
  //       }))
  //     },
  //     [setQuery]
  //   ),
  //   500
  // )
  // const languageStatus = (label: any) => {
  //   switch (label) {
  //     case LanguageStatus.INACTIVE:
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

  // useEffect(() => {
  //   getRoleList({page: 1, limit: 100, platform: RolePlatform.ZEUS}).then((value) => {
  //     const items: any = value.data.data?.items
  //     setFilterRole([...items?.map((it: any) => ({value: it.id, label: it.name}))] ?? [])
  //   })
  // }, [])

  // useEffect(() => {
  //   if (success) {
  //     setTimeout(() => dispatch(AdminRedux.actions.setSuccess('')), 5000)
  //   }
  // }, [success])

  return (
    <>
      <PageTitle>Manage Language</PageTitle>
      <div className='card shadow-sm'>
        {/* <AlertSuccess
          // message={success}
          message='success'
          handleClose={() => {}}
          // handleClose={() => dispatch(AdminRedux.actions.setSuccess(''))}
        /> */}
        <div className='card-header d-flex align-items-center justify-content-between'>
          <div className='flex-fill fs-2 fw-bolder'>{LanguageScreens.LANGUAGE_LIST.TITLE}</div>
          <div className='card-toolbar'>
            <Link
              to={{
                pathname: `/language/add/1`,
                // state: categoryDetail,
              }}
              className='btn btn-sm btn-secondary fw-bold fs-6'
            >
              Add Language
            </Link>
          </div>
        </div>
        <div className='card-body'>
          {/* begin::Search */}
          <div className='d-flex flex-wrap align-items-center'>
            <div className='w-lg-auto w-100 d-flex align-items-center'>
              <span className='me-5 ms-lg-4 flex-shrink-0'>Filter</span>
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
                  <option value={''}>Choose</option>
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
          </div>
          {/* end::Search */}
          {/* begin::Table */}
          <div className='position-relative'>
            <div className='table-responsive my-8'>
              <table className='table table-striped table-hover gx-4 gy-4'>
                <thead className='text-gray fw-700'>
                  <tr>
                    <th>NO</th>
                    <th>ICON</th>
                    <th>LANGUAGE</th>
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
                      <tr key={value.id}>
                        <td className='align-middle'>
                          {(state.page - 1) * state.limit + index + 1}
                        </td>
                        <td className='align-middle'>
                          <img src={value.logo} alt='' />
                        </td>
                        <td className='align-middle'>{value.description}</td>
                        <td className='align-middle'>
                          {value.status === 0 ? 'inactive' : 'active'}
                        </td>
                        <td className='align-middle' style={{minWidth: 125}}>
                          {/* {hasAccess({access: 'update'}) ? ( */}
                          <button
                            type='button'
                            className='btn-transparent me-3'
                            onClick={() =>
                              // dispatch(AdminRedux.actions.getDetailAdmin('', ''))
                              history.push(`/language/add/${value.id}`)
                            }
                          >
                            <InlineSVG src={'/media/icons/edit.svg'} />
                          </button>
                          {/* ) : null} */}
                          {/* {hasAccess({access: 'delete'}) ? ( */}
                          <div
                            className='d-inline'
                            onClick={() => {
                              setHandleDeleteData(value)
                              setShowDeleteModal(true)
                            }}
                            style={{cursor: 'pointer'}}
                          >
                            <InlineSVG src='/media/icons/trash.svg' />
                          </div>
                          {/* ) : null} */}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* start::Loader */}
            {state.data.length > 0 && state.loading ? (
              <div
                className='position-absolute top-0 start-0 end-0 bottom-0'
                style={{backgroundColor: 'rgba(255,255,255,0.7)'}}
              />
            ) : null}
            {/* end::Loader */}
          </div>
          {/* end::Table */}
          <Pagination
            loading={state.loading}
            page={state.page}
            limit={state.limit}
            setPage={setPage}
            setPerPage={setLimit}
            maxData={state.total}
          />
        </div>
        <DeleteLanguageModal
          onDelete={() => {
            deleteLanguage(handleDeleteData?.id ?? '')

            setShowDeleteModal(false)
            // .then(() => {
            //   dispatch(AdminRedux.actions.setSuccess('User berhasil dihapus.'))
            //   setShowDeleteModal(false)
            //   setPage(state.page)
            // })
            // .catch((err) => {
            //   setShowDeleteModal(false)
            //   addPageToasts({scheme: 'danger', text: getErrorMessage(err, true)})
            // })
          }}
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          data={handleDeleteData}
        />
      </div>
    </>
  )
}

export {LanguageList}
