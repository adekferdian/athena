/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ForgotPassword} from './components/ForgotPassword'
import GuestWrapper from './components/GuestWrapper'
import {LoginEmail} from './components/LoginEmail'
import AuthScreens from './screens'

export function AuthPage() {
  return (
    <GuestWrapper>
      <Switch>
        <Route path={AuthScreens.LOGIN_EMAIL.PATH} component={LoginEmail} />
        <Route path={AuthScreens.FORGOT.PATH} component={ForgotPassword} />
        <Redirect from='/auth' exact={true} to='/auth/login' />
        <Redirect to='/auth/login' />
      </Switch>
    </GuestWrapper>
  )
}
