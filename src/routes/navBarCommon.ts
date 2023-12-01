// material icon
import AddIcon from '@material-ui/icons/Add';
import ShopIcon from '@material-ui/icons/Shop';
import ViewListIcon from '@material-ui/icons/ViewList';
import PeopleIcon from '@material-ui/icons/People';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';

// configs
import { PATH_NAME, DRAWER_MENU_LABEL } from 'configs';

export const navBarCommon = [
  {
    subheader: 'Application',
    items: [
      {
        title: 'Dashboard',
        href: PATH_NAME.DASHBOARD,
        icon: DashboardIcon,
        label: DRAWER_MENU_LABEL.DASHBOARD,
      },
      {
        title: 'Voucher Master',
        href: PATH_NAME.VOUCHER_LIST,
        icon: ViewListIcon,
        label: DRAWER_MENU_LABEL.VOUCHER_LIST,
      },
      {
        title: 'Bisnis Unit',
        href: PATH_NAME.BISNISUNIT_LIST,
        icon: SportsEsportsIcon,
        label: DRAWER_MENU_LABEL.BISNISUNIT_LIST,
      },
      {
        title: 'Condition',
        href: PATH_NAME.CONDITION_LIST,
        icon: SportsEsportsIcon,
        label: DRAWER_MENU_LABEL.CONDITION_LIST,
      },
      {
        title: 'Master Component',
        href: PATH_NAME.MASTER_LIST,
        icon: ViewListIcon,
        label: DRAWER_MENU_LABEL.MASTER_LIST,
      },
    ],
  },
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Product',
        icon: ShopIcon,
        href: PATH_NAME.PRODUCT,
        label: DRAWER_MENU_LABEL.PRODUCT,
        items: [
          {
            title: 'Add Product',
            icon: AddIcon,
            href: PATH_NAME.PRODUCT_ADD,
            label: DRAWER_MENU_LABEL.PRODUCT_ADD,
          },
          {
            title: 'List Product',
            icon: ViewListIcon,
            href: PATH_NAME.PRODUCT_LIST,
            label: DRAWER_MENU_LABEL.PRODUCT_LIST,
          },
        ],
      },
      {
        title: 'Report',
        href: PATH_NAME.KANBAN,
        icon: AssessmentIcon,
        label: DRAWER_MENU_LABEL.KANBAN,
      },
    ],
  },
  {
    subheader: 'Users',
    items: [
      {
        title: 'Users',
        icon: PeopleIcon,
        href: PATH_NAME.USERS,
        label: DRAWER_MENU_LABEL.USERS,
      },
    ],
  },
];
