import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListMasterConditionType} from './page/ListMasterConditionType'
import {AddMasterConditionType} from './page/AddMasterConditionType'
import {EditMasterConditionType} from './page/EditMasterConditionType'
import MasterConditionTypeScreen from './Screens'

const MasterConditionTypeRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={MasterConditionTypeScreen.LIST_MASTER_CONDITION_TYPE.PATH} component={ListMasterConditionType} />
      <Route path={MasterConditionTypeScreen.ADD_MASTER_CONDITION_TYPE.PATH} component={AddMasterConditionType} />
      <Route path={MasterConditionTypeScreen.EDIT_MASTER_CONDITION_TYPE.PATH} component={EditMasterConditionType} />
      <Redirect from='/master-type-condition' exact={true} to={MasterConditionTypeScreen.LIST_MASTER_CONDITION_TYPE.PATH} />
      <Redirect to={MasterConditionTypeScreen.LIST_MASTER_CONDITION_TYPE.PATH} />
    </Switch>
  )
}

export default MasterConditionTypeRoutes
