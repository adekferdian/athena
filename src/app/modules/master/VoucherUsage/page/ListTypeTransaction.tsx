import {FC, useCallback, useEffect} from 'react'
import {PageTitle} from 'src/_metronic/layout/core'
import {useDebounceEffect} from 'src/app/hooks/debounce-hook'
import {usePagination} from 'src/app/hooks/pagination-hook'
import {getTitle} from 'src/app/utils/title-utils'
import MasterVoucherUsageScreens from '../Screens'
import InlineSVG from 'react-inlinesvg'
import {MasterVoucherUsage} from '../models/VoucherUsage'
import {getVoucherUsageType} from '../redux/MasterVoucherUsageCRUD'
import Pagination from 'src/app/components/Pagination'

const ListTypeTransaction: FC = () => {

  const {state, setLimit, setPage, setQuery} = usePagination<MasterVoucherUsage, any>(
    useCallback((state, setState, isActive) => {
      const fetchCall = async () => {
        try {
          let status = ''
          if (state.query.status) {
            status = state.query.status
          }
          const masterVoucherUsage = await getVoucherUsageType({
            search: state.query.search,
          })
          if (isActive()) {
          setState((prev) => ({
            ...prev,
            loading: false,
            refreshing: false,
            error: false,
            page: 1,
            data: masterVoucherUsage.data.data ?? [],
            total: 0,
            status,
          }))
          }
        } catch (e) {
          if (isActive()) {
            setState((prev) => ({
              ...prev,
              loading: false,
              error: true,
              data: [],
              filter: 0,
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
      data: [] as MasterVoucherUsage[],
      total: 0,
      limit: 10,
      query: {},
    }
  )

  useEffect(() => {
    document.title = getTitle('List of Master How Voucher Usage ')
  }, [])

  useEffect(() => {
    setPage(1)
  }, [setPage])

  const searchFn = useDebounceEffect(
    useCallback(
      (text: string) => {
        setQuery((prev) => ({
          ...prev,
          search: text,
        }))
      },
      [setQuery]
    ),
    500
  )

  return (
    <>
      <PageTitle>List Master How Voucher Usage </PageTitle>
      <div className='card shadow-sm'>
        <div className='card-header d-flex align-items-center justify-content-between'>
          <div className='flex-fill fs-2 fw-bolder'>
            {MasterVoucherUsageScreens.LIST_MASTER_VOUCHER_USAGE_HOW.TITLE}
          </div>
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
                onChange={(e) => searchFn(e.currentTarget.value)}
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
                    <th>No</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Description</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {state.data.length === 0 ? (
                    <tr>
                      <td colSpan={9} className='text-center'>
                        {state.loading ? (
                          'Loading'
                        ) : state.error ? (
                          'Error, try to refresh the page'
                        ) : (
                          <div className='d-flex flex-column justify-content-center align-items-center bg-white mt-0 top-0 pt-0'>
                            <InlineSVG src={'/media/icons/mingle/DataEmpty.svg'} />
                            <span className='mt-3 fw-bold h4'>No data list found yet</span>
                            <span className='mt-1 mb-10' style={{color: '#888888'}}>
                              Please start adding the data you need.
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : (
                    state.data.map((value, index) => (
                      <tr key={index}>
                        <td className='align-middle'>
                          {(state.page - 1) * state.limit + index + 1}
                        </td>
                        <td className='align-middle'>{value.id}</td>
                        <td className='align-middle'>{value.title}</td>
                        <td className='align-middle'>{value.slug}</td>
                        <td className='align-middle'>{value.description}</td>
                        <td className='align-middle'>{value.type}</td>
                        <td className='align-middle' style={{minWidth: 125}}>
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
            page={1}
            limit={state.limit}
            setPage={setPage}
            setPerPage={setLimit}
            maxData={state.total}
          />
        </div>
      </div>
    </>
  )
}

export {ListTypeTransaction}
