/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useMemo} from 'react'
import InlineSVG from 'react-inlinesvg/esm'

type PaginationProps = {
  loading: boolean
  limit: number
  setPerPage: (number: number) => void
  page: number
  setPage: (number: number) => void
  maxData: number
}

const Pagination: FC<PaginationProps> = ({loading, limit, setPerPage, page, setPage, maxData}) => {
  const pageNum = useMemo(() => Math.ceil(maxData / limit), [maxData, limit])
  const pageList = useMemo(() => {
    const result: (number | undefined)[] = []
    if (pageNum === 0) return result
    const normalizedPage = Math.min(pageNum, Math.max(0, page))
    if (pageNum < 8)
      for (let i = 1; i <= pageNum; i++) {
        result.push(i)
      }
    else {
      if (normalizedPage > 4) result.push(1, undefined, Math.min(normalizedPage, pageNum - 3) - 1)
      else result.push(1, 2, 3, 4)
      if (normalizedPage + 3 < pageNum) {
        if (normalizedPage > 4) result.push(normalizedPage)
        result.push(Math.max(normalizedPage, 4) + 1, undefined, pageNum)
      } else result.push(pageNum - 3, pageNum - 2, pageNum - 1, pageNum)
    }
    return result
  }, [pageNum, page])
  return (
    <div className='d-flex flex-wrap'>
      <div className='mb-4 w-md-auto w-100 d-flex align-items-center'>
        <div className='position-relative'>
          <InlineSVG
            src={'/media/icons/efood/IconChevronDown.svg'}
            className='position-absolute translate-middle-y top-50 me-4 end-0 pe-none'
          />
          <select
            className='form-control form-control-sm form-control-solid pe-13'
            autoComplete='off'
            value={limit}
            onChange={(e) => setPerPage(Number(e.currentTarget.value))}
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        {loading || maxData === 0 ? null : (
          <span className='ms-5 flex-shrink-0'>
            Menampilkan {(page - 1) * limit + 1}-{Math.min(maxData, (page - 1) * limit + limit)}{' '}
            dari {maxData} entri
          </span>
        )}
      </div>
      {pageList.length > 0 ? (
        <ul className='pagination flex-nowrap flex-fill justify-content-md-end'>
          <li className={`page-item previous ${page === 1 ? 'disabled' : ''}`}>
            <button onClick={() => setPage(page - 1)} className='page-link'>
              <i className='previous'></i>
            </button>
          </li>
          {pageList.map((x, i) =>
            x === undefined ? (
              <li className='page-item disabled' key={`${i}-dot`}>
                <button className='page-link'>...</button>
              </li>
            ) : (
              <li className={`page-item ${page === x ? 'active' : ''}`} key={x}>
                <button onClick={() => setPage(x)} className='page-link'>
                  {x}
                </button>
              </li>
            )
          )}
          <li className={`page-item next ${page === pageNum ? 'disabled' : ''}`}>
            <button onClick={() => setPage(page + 1)} className='page-link'>
              <i className='next'></i>
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  )
}

export default Pagination
