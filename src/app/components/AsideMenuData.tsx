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
      // {
      //   title: 'USER',
      //   children: [
          // {
          //   to: '#',
          //   title: 'Admin',
          //   fontIcon: 'bi-archive',
          //   icon: '/media/icons/efood/IconShieldUser.svg',
          //   children: [
          //     {
          //       to: AdminScreens.ADMIN_LIST.PATH,
          //       title: AdminScreens.ADMIN_LIST.TITLE,
          //       hasBullet: true,
          //       permissions: {code: 'user_list_admin'},
          //     },
          //   ],
          // },
          // {
          //   to: '/user-hermes/',
          //   title: 'User eFOOD Partner',
          //   fontIcon: 'bi-archive',
          //   icon: '/media/icons/efood/IconUser.svg',
          //   children: [
          //     {
          //       to: AppUserScreens.USER_CORPORATE.PATH,
          //       title: AppUserScreens.USER_CORPORATE.TITLE,
          //       hasBullet: true,
          //       permissions: {code: 'user_list_user_corporate'},
          //     },
          //     {
          //       to: AppUserScreens.USER_CORPORATE_VERIFICATION.PATH,
          //       title: AppUserScreens.USER_CORPORATE_VERIFICATION.TITLE,
          //       hasBullet: true,
          //       permissions: {code: 'user_list_verifikasi_user_corporate'},
          //     },
          //     {
          //       to: AppUserScreens.USER_BRAND.PATH,
          //       title: AppUserScreens.USER_BRAND.TITLE,
          //       hasBullet: true,
          //       permissions: {code: 'user_list_user_brand'},
          //     },
          //     {
          //       to: AppUserScreens.USER_LIST.PATH,
          //       title: AppUserScreens.USER_LIST.TITLE,
          //       hasBullet: true,
          //       permissions: {code: 'user_list_user_store'},
          //     },
          //   ],
          // },
          // {
          //   to: CustomerEFoodScreens.CUSTOMER_LIST.PATH,
          //   title: 'Customer eFOOD',
          //   fontIcon: 'bi-archive',
          //   icon: '/media/icons/efood/IconUsers.svg',
          //   permissions: {code: 'user_customer_efood'},
          // },
          // {
          //   to: '/role-management',
          //   title: 'Role Management',
          //   fontIcon: 'bi-archive',
          //   icon: '/media/icons/efood/IconFlower.svg',
          //   children: [
      //         {
      //           to: RoleManagementScreens.ROLE_ADMIN.PATH,
      //           title: 'Role Admin',
      //           hasBullet: true,
      //           permissions: {code: 'user_role_admin'},
      //         },
      //         {
      //           to: RoleManagementScreens.ROLE_USER_CORPORATE.PATH,
      //           title: 'Role User Corporate',
      //           hasBullet: true,
      //           permissions: {code: 'user_role_user_corporate'},
      //         },
      //         {
      //           to: RoleManagementScreens.ROLE_USER_BRAND.PATH,
      //           title: 'Role User Brand',
      //           hasBullet: true,
      //           permissions: {code: 'user_role_user_brand'},
      //         },
      //         {
      //           to: RoleManagementScreens.ROLE_USER_STORE.PATH,
      //           title: 'Role User Store',
      //           hasBullet: true,
      //           permissions: {code: 'user_role_user_store'},
      //         },
      //         {
      //           to: RoleManagementScreens.SPECIAL_ROLES.PATH,
      //           title: 'Special Roles',
      //           hasBullet: true,
      //           permissions: {code: 'user_role_special_role'},
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        title: 'CAMPAIGN',
        children: [
          {
            to: '/voucher',
            title: 'Voucher',
            icon: '/media/icons/mingle/IconCampaign.svg',
          },
          // {
          //   to: '/datingPlace',
          //   title: 'Dating Place',
          //   icon: '',
          // },
          // {
          //   to: '/education',
          //   title: 'Education',
          //   icon: '',
          // },
          // {
          //   to: '/school',
          //   title: 'School',
          //   icon: '',
          // },
          // {
          //   to: '/religion',
          //   title: 'Religion',
          //   icon: '',
          // },
          // {
          //   to: '/language',
          //   title: 'Language',
          //   icon: '',
          // },
          // {
          //   to: 'music',
          //   title: 'Music',
          //   icon: '',
          //   children: [
          //     {
          //       to: '/musicGenre',
          //       title: 'Music Genre',
          //     },
          //     {
          //       to: '/musicArtist',
          //       title: 'Music Artist',
          //     },
          //   ],
          // },
          // {
          //   to: 'game',
          //   title: 'Game',
          //   icon: '',
          //   children: [
          //     {
          //       to: '/gameType',
          //       title: 'Game Type',
          //     },
          //     {
          //       to: '/games',
          //       title: 'Games',
          //     },
          //   ],
          // },
          // {
          //   to: '/sport',
          //   title: 'Sport',
          //   icon: '',
          // },
          // {
          //   to: '/pets',
          //   title: 'Pets',
          //   icon: '',
          // },
          //  {
          //   to: 'relationship',
          //   title: 'Relationship',
          //   icon: '',
          //   children: [
          //     {
          //       to: '/preference',
          //       title: 'Preference',
          //     },
          //     {
          //       to: '/relationshipType',
          //       title: 'Type',
          //     },
          //   ],
          // },
          // {
          //   to: '/travellerType',
          //   title: 'Traveler Type',
          //   icon: '',
          // },
          // {
          //   to: '/children',
          //   title: 'Children',
          //   icon: '',
          // },
          // {
          //   to: '/smokingType',
          //   title: 'Smoking Type',
          //   icon: '',
          // },
          // {
          //   to: '/alcoholType',
          //   title: 'Alcohol Type',
          //   icon: '',
          // },

        ],
      },
      {
        title: 'MASTER DATA',
        children: [
          {
            to: '/master-rules',
            title: 'Rules',
            fontIcon: 'bi-archive',
            icon: '/media/icons/efood/IconProfileEFood.svg',
          },
          {
            to: '/master-component',
            title: 'Component',
            fontIcon: 'bi-archive',
            icon: '/media/icons/efood/IconProfileEFood.svg',
          },
          {
            to: '/master-benefit',
            title: 'Benefit',
            fontIcon: 'bi-archive',
            icon: '/media/icons/efood/IconProfileEFood.svg',
          },
          {
            to: '/master-type-benefit',
            title: 'Benefit Type',
            fontIcon: 'bi-archive',
            icon: '/media/icons/efood/IconProfileEFood.svg',
          },
          {
            to: '/master-bu',
            title: 'Business Unit',
            fontIcon: 'bi-archive',
            icon: '/media/icons/efood/IconProfileEFood.svg',
          },
          {
            to: '/master-limit',
            title: 'Limit',
            fontIcon: 'bi-archive',
            icon: '/media/icons/efood/IconProfileEFood.svg',
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
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{menu.title}</span>
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
