import {useMemo} from 'react'
import {AsideMenuItem} from 'src/_metronic/layout/components/aside/AsideMenuItem'
import {AsideMenuItemWithSub} from 'src/_metronic/layout/components/aside/AsideMenuItemWithSub'
import {PermissionQuery} from '../hooks/permissions-hook'
// import AdminScreens from '../modules/admin/Screens'
// import BalanceScreens from '../modules/balance/Screens'
// import BrandScreens from '../modules/brand/screens'
// import CorporateScreens from '../modules/corporate/screens'
// import CustomerEFoodScreens from '../modules/customer-efood/screens'
// import {FaqScreens} from '../modules/faq/Screens'
// import FeeScreens from '../modules/fee/Screens'
// import {LoyaltyTabs} from '../modules/loyalty/Screens'
// import RoleManagementScreens from '../modules/role-management/Screens'
// import StoreScreens from '../modules/store/Screens'
// import {TicketScreens} from '../modules/ticket/Screens'
// import {TicketSettingScreens} from '../modules/ticket-setting/Screens'
// import AppUserScreens from '../modules/user-hermes/screens'
// import {shallowEqual, useSelector} from 'react-redux'
// import {RootState} from 'src/setup'
// import MemberScreens from '../modules/member-account/Screens'
// import UserScreens from '../modules/user/Screens'
// import RoleScreens from '../modules/role/Screens'
// import UserScreens from '../modules/user/Screens'
interface Menu {
  id?: string
  to?: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  children?: Menu[]
  permissions?: PermissionQuery
  activePath?: string
  badge?: string
  badgeCircle?: boolean
  hidden?: boolean
}

const useMenus = (): Menu[] => {
  return useMemo(
    () => [
      
      {
        title: 'MASTER DATA',
        children: [
          {
            to: '/dashboard',
            title: 'Dashboard',
            fontIcon: 'bi-archive',
            icon: '/media/sidebar/dashboard_ic.svg',
          },
          {
            to: '/performance',
            title: 'Performance',
            fontIcon: 'bi-archive',
            icon: '/media/sidebar/performance_ic.svg',
          },
          {
            to: '/transaction',
            title: 'Transaction',
            fontIcon: 'bi-archive',
            icon: '/media/sidebar/transaction_ic.svg',
          },
          {
            to: '/e-wallet',
            title: 'E-Wallet',
            icon: '/media/sidebar/e_wallet_ic.svg',
            children: [
              {
                to: '/e-wallet/overview',
                title: 'Overview',
              },
              {
                to: '/e-wallet/document',
                title: 'KYC Document',
              },
              {
                to: '/e-wallet/activation',
                title: 'Bank Activation',
              },
              {
                to: '/e-wallet/activity',
                title: 'E-Wallet Activity',
              },
            ],
          },
          {
            to: '/e-wallet',
            title: 'User',
            icon: '/media/sidebar/e_wallet_ic.svg',
            children: [
              {
                to: '/e-wallet/overview',
                title: 'Overview',
              },
            ],
          },
          {
            to: '/setting',
            title: 'Setting',
            icon: '/media/sidebar/setting_ic.svg',
            children: [
              {
                to: '/setting/target-data',
                title: 'Set Target Data',
              },
              {
                to: '/setting/channel-data',
                title: 'Set Channel Data',
              },
            ],
          },
        ],
      },
    ],
    []
  )
}

const GeneratedMenu: React.FC<{menu: Menu}> = ({menu}) => {
  if (!menu.to) {
    if (!menu.children || menu.children.length === 0) return null
    return (
      <>
        <div className='menu-item'>
          <div className='menu-content pt-6 pb-2'>
            {/* <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{menu.title}</span> */}
          </div>
        </div>
        {menu.children?.map((child, index) => {
          return <GeneratedMenu menu={child} key={index} />
        })}
      </>
    )
  }
  if (!menu.children)
    return (
      <AsideMenuItem
        to={menu.to}
        icon={menu.icon}
        title={menu.title}
        fontIcon={menu.fontIcon}
        hasBullet={menu.hasBullet}
        activePath={menu.activePath}
        badge={menu.badge}
        badgeCircle={menu.badgeCircle}
      />
    )

  return (
    <AsideMenuItemWithSub
      to={menu.to}
      title={menu.title}
      fontIcon={menu.fontIcon}
      icon={menu.icon}
      activePath={menu.activePath}
    >
      {menu.children.map((child) => {
        return <GeneratedMenu menu={child} key={child.id} />
      })}
    </AsideMenuItemWithSub>
  )
}

// const filterMenus = (
//   menus: Menu[] | undefined,
//   predicate: (menu: Menu) => boolean
// ): Menu[] | undefined => {
//   const result = menus?.map((menu, index) => ({
//     ...menu,
//     id: String(index),
//     children: filterMenus(menu.children, predicate),
//   }))
//   return result?.filter((menu) => (!menu.children || menu.children.length > 0) && predicate(menu))
// }

const AsideMenuData: React.FC = () => {
  // const {hasAccess} = usePermissions()
  const menus = useMenus()
  // const generated = useMemo(
  //   () => filterMenus(menus, (menu) => hasAccess(menu.permissions) && !menu.hidden),
  //   [hasAccess, menus]
  // )
  return (
    <>
      {menus?.map((child, index) => {
        return <GeneratedMenu menu={child} key={index} />
      })}
    </>
  )
}

export default AsideMenuData
