import React, { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// configs
import { PATH_NAME, USER_ROLE } from 'configs';

// types
import { IRoutes } from 'models/IRoutes';

// layouts
import MainLayout from 'layouts/MainLayout';

// containers
import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';

// route
import RoleRoute from './RoleRoute';

// modules
const Error404View = lazy(() => import('features/Error404View'));
const DenyView = lazy(() => import('features/DenyView'));
const ProductAdd = lazy(() => import('features/Product/ProductAdd'));
const ProductList = lazy(() => import('features/Product/ProductList'));
const Users = lazy(() => import('features/Users'));
const Dashboard = lazy(() => import('features/Dashboard'));
const Playbackground = lazy(() => import('features/Playbackground'));
const Login = lazy(() => import('features/Login'));
const Kanban = lazy(() => import('features/Kanban'));
const BisnisUnitList = lazy(() => import('features/BisnisUnit/BisnisUnitList'));
const BisnisUnitAdd = lazy(() => import('features/BisnisUnit/BisnisUnitAdd'));
const MasterList = lazy(() => import('features/Master/MasterList'));
const MasterAdd = lazy(() => import('features/Master/MasterAdd'));
const ConditionList = lazy(() => import('features/Condition/ConditionList'));
const ConditionAdd = lazy(() => import('features/Condition/ConditionAdd'));
const VoucherList = lazy(() => import('features/Voucher/VoucherList'));
const VoucherAdd = lazy(() => import('features/Voucher/VoucherAdd'));
const routesConfig: IRoutes[] = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to={PATH_NAME.DASHBOARD} />,
  },
  {
    exact: true,
    path: PATH_NAME.ERROR_404,
    component: Error404View,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: PATH_NAME.LOGIN,
    component: Login,
  },
  {
    exact: true,
    path: PATH_NAME.ERROR_403,
    component: DenyView,
  },
  {
    path: '/',
    guard: AuthGuard,
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: PATH_NAME.DASHBOARD,
        component: Dashboard,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.PLAY_BACKGROUND,
        component: Playbackground,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.BISNISUNIT_LIST,
        component: BisnisUnitList,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.BISNISUNIT_ADD,
        component: BisnisUnitAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.CONDITION_LIST,
        component: ConditionList,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.CONDITION_ADD,
        component: ConditionAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.VOUCHER_LIST,
        component: VoucherList,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.VOUCHER_ADD,
        component: VoucherAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.PRODUCT_LIST,
        component: MasterList,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.PRODUCT_ADD,
        component: MasterAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.MASTER_LIST,
        component: MasterList,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.MASTER_ADD,
        component: ProductAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.KANBAN,
        component: Kanban,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.USERS,
        component: Users,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        component: () => <Redirect to={PATH_NAME.ERROR_404} />,
      },
    ],
  },
  {
    path: '*',
    routes: [
      {
        exact: true,
        path: '/app',
        component: MainLayout,
      },
      {
        component: () => <Redirect to={PATH_NAME.ERROR_404} />,
      },
    ],
  },
];

const renderRoutes = (routes: IRoutes[]) => {
  return (
    <>
      {routes ? (
        <Suspense fallback={<div />}>
          <Switch>
            {routes.map((route: IRoutes, idx: number) => {
              const Guard = route.guard || Fragment;
              const Layout = route.layout || Fragment;
              const Component = route.component;
              const requireRoles = route.requireRoles || [];

              return (
                <Route
                  key={`routes-${idx}`}
                  path={route.path}
                  exact={route.exact}
                  render={(props: any) => (
                    <Guard>
                      <Layout>
                        {route.routes ? (
                          renderRoutes(route.routes)
                        ) : (
                          <RoleRoute requireRoles={requireRoles}>
                            <Component {...props} />
                          </RoleRoute>
                        )}
                      </Layout>
                    </Guard>
                  )}
                />
              );
            })}
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
};

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
