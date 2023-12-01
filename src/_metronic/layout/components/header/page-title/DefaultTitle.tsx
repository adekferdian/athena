import clsx from 'clsx'
import React, {FC} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useLayout} from '../../../core/LayoutProvider'
import {usePageData} from '../../../core/PageData'

const trimBreadcrumbs = (text?: string) => {
  if (!text) return text
  if (text.length > 40) return `${text.substring(0, 38)}…`
  return text
}

const DefaultTitle: FC = () => {
  const {pageTitle, pageDescription, pageBreadcrumbs} = usePageData()
  const {config, attributes, classes} = useLayout()
  const history = useHistory()
  return (
    <div
      {...attributes.pageTitle}
      className={clsx('page-title d-flex', classes.pageTitle.join(' '))}
    >
      {/* begin::Title */}
      {pageTitle && (
        <h1
          className='align-items-center text-dark fw-bolder my-1 fs-3 ellipsis text-break'
          style={{
            WebkitLineClamp: 1,
          }}
        >
          {pageTitle}
        </h1>
      )}
      {/* end::Title */}

      {(pageDescription || (pageBreadcrumbs && pageBreadcrumbs.length > 0)) &&
        config.pageTitle &&
        config.pageTitle.breadCrumbs && (
          <>
            {config.pageTitle.direction === 'row' && (
              <span className='h-20px border-gray-200 border-start mx-4'></span>
            )}
            <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
              {Array.from(pageBreadcrumbs ?? []).map((item, index) => (
                <li
                  className={clsx('breadcrumb-item', {
                    'text-dark': !item.isSeparator && item.isActive,
                    'text-muted': !item.isSeparator && !item.isActive,
                  })}
                  key={`${item.path}${index}`}
                >
                  {!item.isSeparator ? (
                    item?.tab ? (
                      <span
                        className='text-muted text-hover-primary'
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                          history.push(item.path, {tab: item?.tab})
                        }}
                      >
                        {trimBreadcrumbs(item.title)}
                      </span>
                    ) : (
                      <Link className='text-muted text-hover-primary' to={item.path}>
                        {trimBreadcrumbs(item.title)}
                      </Link>
                    )
                  ) : (
                    <span className='bullet bg-gray-200 w-5px h-2px'></span>
                  )}
                </li>
              ))}
              <li className='breadcrumb-item text-dark'>
                {trimBreadcrumbs(pageDescription ? pageDescription : pageTitle)}
              </li>
            </ul>
          </>
        )}
    </div>
  )
}

export {DefaultTitle}
