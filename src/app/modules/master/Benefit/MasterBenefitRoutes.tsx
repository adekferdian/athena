import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListMasterBenefit} from './page/ListMasterBenefit'
import {AddMasterBenefit} from './page/AddMasterBenefit'
import {EditMasterBenefit} from './page/EditMasterBenefit'
import MasterBenefitScreen from './Screens'

const MasterBenefitRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={MasterBenefitScreen.LIST_MASTER_BENEFIT.PATH} component={ListMasterBenefit} />
      <Route path={MasterBenefitScreen.ADD_MASTER_BENEFIT.PATH} component={AddMasterBenefit} />
      <Route path={MasterBenefitScreen.EDIT_MASTER_BENEFIT.PATH} component={EditMasterBenefit} />
      <Redirect
        from='/master-benefit'
        exact={true}
        to={MasterBenefitScreen.LIST_MASTER_BENEFIT.PATH}
      />
      <Redirect to={MasterBenefitScreen.LIST_MASTER_BENEFIT.PATH} />
    </Switch>
  )
}

export default MasterBenefitRoutes
