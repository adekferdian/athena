import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListLimit} from './page/ListLimit'
import {AddLimit} from './page/AddLimit'
import {EditLimit} from './page/EditLimit'
import LimitScreen from './Screens'

const LimitRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={LimitScreen.LIST_MASTER_LIMIT.PATH} component={ListLimit} />
      <Route path={LimitScreen.ADD_MASTER_LIMIT.PATH} component={AddLimit} />
      <Route path={LimitScreen.EDIT_MASTER_LIMIT.PATH} component={EditLimit} />
      <Redirect from='/master-limit' exact={true} to={LimitScreen.LIST_MASTER_LIMIT.PATH} />
      <Redirect to={LimitScreen.LIST_MASTER_LIMIT.PATH} />
    </Switch>
  )
}

export default LimitRoutes
