import React from 'react'
import {Route, Switch} from 'react-router-dom'
import DashboardPage from './page/Dashboard'
import DashboardScreen from './Screen'

const VoucherRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={DashboardScreen.dashboard.PATH} component={DashboardPage} />
    </Switch>
  )
}

export default VoucherRoutes
