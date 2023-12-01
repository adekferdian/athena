/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useCallback, useContext, useMemo} from 'react'
import {Toast} from 'react-bootstrap-v5'
import InlineSVG from 'react-inlinesvg/esm'
import {useSelectorContext} from '../hooks/selector-hook'

export interface PageToasts {
  text: string
  scheme: 'info' | 'danger'
  timestamp?: number
  shown?: boolean
  fixed?: boolean
}

export interface HeaderToastContextModel {
  hookPageToasts: <R>(listener: (data: PageToasts[] | undefined) => R | undefined) => R | undefined
  addPageToasts: (toast: PageToasts) => void
  removePageToasts: (toast: PageToasts) => void
}

const HeaderToastContext = createContext<HeaderToastContextModel>({
  hookPageToasts: (() => null) as any,
  addPageToasts: (toast: PageToasts) => {},
  removePageToasts: (toast: PageToasts) => {},
})

export const HeaderToastProvider: React.FC = ({children}) => {
  const [, hookPageToasts, setPageToasts] = useSelectorContext<Array<PageToasts>>([])
  const addPageToasts = useCallback((toast: PageToasts) => {
    const timestamp = Date.now()
    const entry = {
      ...toast,
      timestamp,
      shown: false,
    } as PageToasts
    setPageToasts((old) => [...old, entry])
    setTimeout(() => {
      entry.shown = true
      setPageToasts((old) => [...old])
    }, 50)
  }, [])
  const removePageToasts = useCallback((toast: PageToasts) => {
    toast.shown = false
    setPageToasts((old) => [...old])
    setTimeout(() => setPageToasts((old) => old.filter((data) => data !== toast)), 500)
  }, [])

  const value: HeaderToastContextModel = useMemo(
    () => ({
      hookPageToasts,
      addPageToasts,
      removePageToasts,
    }),
    [hookPageToasts, addPageToasts, removePageToasts]
  )
  return <HeaderToastContext.Provider value={value}>{children}</HeaderToastContext.Provider>
}

export function useHeaderToast() {
  return useContext(HeaderToastContext)
}

export function HeaderToast() {
  const {removePageToasts, hookPageToasts} = useHeaderToast()
  const pageToasts = hookPageToasts(useCallback((data) => data, []))

  return (
    <div className='floating-container'>
      <div className='container'>
        {pageToasts?.map((data) => (
          <ToastData data={data} removePageToasts={removePageToasts} key={data.timestamp} />
        ))}
      </div>
    </div>
  )
}

const ToastData: React.FC<{data: PageToasts; removePageToasts: (toast: PageToasts) => void}> = ({
  data,
  removePageToasts,
}) => {
  return (
    <Toast
      className={`d-block w-100 bg-${data.scheme} text-white`}
      show={data.shown === true}
      onClose={() => removePageToasts(data)}
      style={{zIndex: 9999}}
      delay={3000}
      autohide
    >
      <Toast.Body className='d-flex align-items-center'>
        {data.scheme === 'info' && (
          <InlineSVG className='me-3' src='/media/icons/efood/ButtonSuccess.svg' />
        )}
        {data.scheme === 'danger' && (
          <InlineSVG src={'/media/icons/efood/IconWarningWhite.svg'} className='me-3' />
        )}
        <span className='flex-fill fs-6'>{data.text}</span>
        <button className='btn-transparent' onClick={() => removePageToasts(data)}>
          <InlineSVG className='me-3' src='/media/icons/efood/ButtonClose.svg' />
        </button>
      </Toast.Body>
    </Toast>
  )
}
