/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {FC} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
// import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
// import {RootState} from '../../setup'
import AuthScreens from '../modules/auth/screens'
import EmailVerification from '../modules/auth/components/EmailVerification'
import EmailCustomerVerification from '../modules/auth/components/EmailCustomerVerification'
import VerificationSuccess from '../modules/auth/components/VerificationSuccess'
import {CreateNewPassword} from '../modules/auth/components/CreateNewPassword'

const Routes: FC = () => {
  const isAuthorized = true
  // useSelector<RootState>(({auth}) => Boolean(auth.accessToken), shallowEqual)

  return (
    <Switch>
      <Route path={AuthScreens.EMAIL_VERIFICATION.PATH} component={EmailVerification} />
      <Route path={AuthScreens.CREATE_NEW_PASSWORD.PATH} component={CreateNewPassword} />
      <Route
        path={AuthScreens.EMAIL_CUSTOMER_VERIFICATION.PATH}
        component={EmailCustomerVerification}
      />
      <Route path={AuthScreens.VERIFICATION_SUCCESS.PATH} component={VerificationSuccess} />
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from='/auth' to='/' />
      )}

      <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />

      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to='/auth/login' />
      ) : (
        <MasterLayout>
          <PrivateRoutes />
        </MasterLayout>
      )}
    </Switch>
  )
}

export {Routes}
