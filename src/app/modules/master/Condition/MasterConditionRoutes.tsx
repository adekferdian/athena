import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListMasterCondition} from './page/ListMasterCondition'
import {AddMasterCondition} from './page/AddMasterCondition'
import {EditMasterCondition} from './page/EditMasterCondition'
import MasterConditionScreen from './Screens'

const MasterConditionRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={MasterConditionScreen.LIST_MASTER_CONDITION.PATH} component={ListMasterCondition} />
      <Route path={MasterConditionScreen.ADD_MASTER_CONDITION.PATH} component={AddMasterCondition} />
      <Route path={MasterConditionScreen.EDIT_MASTER_CONDITION.PATH} component={EditMasterCondition} />
      <Redirect from='/master-condition' exact={true} to={MasterConditionScreen.LIST_MASTER_CONDITION.PATH} />
      <Redirect to={MasterConditionScreen.LIST_MASTER_CONDITION.PATH} />
    </Switch>
  )
}

export default MasterConditionRoutes
