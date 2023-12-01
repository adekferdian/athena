/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'
import LogoutModal from 'src/app/components/LogoutModal'
import {UserModel} from 'src/app/modules/auth/models/UserModel'
import ProfileScreens from 'src/app/modules/profile/Screens'
import {RootState} from '../../../../setup'

const HeaderUserMenu: FC = () => {
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const history = useHistory()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            {/* <img alt='Logo' src={toAbsoluteUrl(`/media/avatar/150-1.jpg`)} /> */}
            <span
              className='py-3 px-5 rounded'
              style={{backgroundColor: 'rgba(39, 192, 205, 0.2)'}}
            >
              <span className='fw-bolder' style={{color: '#27C0CD'}}>
                {user?.name[0]}
              </span>
            </span>
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>{user?.name}</div>
            <div className='fw-normal text-muted d-flex align-items-center fs-6'>{user?.email}</div>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-3 my-1'>
        <Link to={ProfileScreens.PROFILE.PATH} className='menu-link px-5'>
          Profil Saya
        </Link>
      </div>

      <div className='menu-item px-3 my-1'>
        <Link to={ProfileScreens.PASSWORD.PATH} className='menu-link px-5'>
          Ubah Password
        </Link>
      </div>

      <div className='menu-item px-3'>
        <button
          onClick={() => setShowLogoutModal(true)}
          className='px-5 ms-5 btn'
          style={{backgroundColor: 'rgba(240, 66, 108, 0.1)'}}
        >
          <span style={{color: 'rgba(240, 66, 108)'}}>Logout</span>
        </button>
      </div>
      <LogoutModal
        show={showLogoutModal}
        handleClose={() => setShowLogoutModal(false)}
        handleContinue={() => history.push('/logout')}
      />
    </div>
  )
}

export {HeaderUserMenu}
