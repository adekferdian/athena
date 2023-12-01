/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {KTSVG} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import InlineSVG from 'react-inlinesvg/esm'

const AsideDefault: FC = () => {
  const {config, classes} = useLayout()
  const {aside} = config

  return (
    <div
      id='kt_aside'
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto align-items-start' id='kt_aside_logo'>
        {/* begin::Logo */}
        {aside.theme === 'dark' && (
          <span className='fs-2 text-white flex-fill d-flex justify-content-center fw-bolder text-center'>
            <InlineSVG
              src={'/media/icons/mingle/IconZeusSidemenu.svg'}
              className='pt-2 logo-big'
              style={{marginRight: 16}}
            />
            {/* <img
              alt='Logo'
              src={toAbsoluteUrl('/media/icons/efood/IconEfood.png')}
              className='h-30px logo-small'
            /> */}
          </span>
        )}
        {aside.theme === 'light' && (
          <span className='fs-2 text-white flex-fill d-flex justify-content-center fw-bolder text-center'>
            <InlineSVG
              src={'/media/icons/mingle/IconZeusSidemenu.svg'}
              className='pt-2 logo-big'
              style={{marginRight: 16}}
            />
            {/* <img
              alt='Logo'
              src={toAbsoluteUrl('/media/icons/efood/IconEfood.png')}
              className='h-30px logo-small'
            /> */}
          </span>
        )}
        {/* end::Logo */}

        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <KTSVG
              path={'/media/icons/duotune/arrows/arr080.svg'}
              className={'svg-icon-1 rotate-180'}
            />
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}
    </div>
  )
}

export {AsideDefault}
