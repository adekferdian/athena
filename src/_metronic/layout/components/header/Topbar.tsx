import clsx from 'clsx'
import React, {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {UserModel} from 'src/app/modules/auth/models/UserModel'
import {RootState} from 'src/setup'
import {KTSVG} from '../../../helpers'
import {HeaderUserMenu} from '../../../partials'
import {useLayout} from '../../core'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
  const {config} = useLayout()
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel

  return (
    <div className='d-flex align-items-stretch'>
      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx(
            'cursor-pointer symbol',
            toolbarUserAvatarHeightClass,
            'd-flex align-items-center flex-shrink-1'
          )}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <span className='me-3 fw-bold fs-5 text-end'>Hi, {user?.name}</span>
          <span className='py-3 px-5 rounded' style={{backgroundColor: 'rgba(39, 192, 205, 0.2)'}}>
            <span className='fw-bolder' style={{color: '#27C0CD'}}>
              {user?.name[0]}
            </span>
          </span>
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export {Topbar}
