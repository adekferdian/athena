import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListMasterRules} from './page/ListMasterRules'
import {AddMasterRules} from './page/AddMasterRules'
import {EditMasterRules} from './page/EditMasterRules'
import MasterRulesScreen from './Screens'

const VoucherRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={MasterRulesScreen.LIST_MASTER_RULES.PATH} component={ListMasterRules} />
      <Route path={MasterRulesScreen.ADD_MASTER_RULES.PATH} component={AddMasterRules} />
      <Route path={MasterRulesScreen.EDIT_MASTER_RULES.PATH} component={EditMasterRules} />
      <Redirect from='/master-rules' exact={true} to={MasterRulesScreen.LIST_MASTER_RULES.PATH} />
      <Redirect to={MasterRulesScreen.LIST_MASTER_RULES.PATH} />
    </Switch>
  )
}

export default VoucherRoutes
