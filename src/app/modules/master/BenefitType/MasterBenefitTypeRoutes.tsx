import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListMasterBenefitType} from './page/ListMasterBenefitType'
import {AddMasterBenefitType} from './page/AddMasterBenefitType'
import {EditMasterBenefitType} from './page/EditMasterBenefitType'
import MasterBenefitTypeScreen from './Screens'

const MasterBenefitTypeRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={MasterBenefitTypeScreen.LIST_MASTER_BENEFIT_TYPE.PATH} component={ListMasterBenefitType} />
      <Route path={MasterBenefitTypeScreen.ADD_MASTER_BENEFIT_TYPE.PATH} component={AddMasterBenefitType} />
      <Route path={MasterBenefitTypeScreen.EDIT_MASTER_BENEFIT_TYPE.PATH} component={EditMasterBenefitType} />
      <Redirect from='/master-type-benefit' exact={true} to={MasterBenefitTypeScreen.LIST_MASTER_BENEFIT_TYPE.PATH} />
      <Redirect to={MasterBenefitTypeScreen.LIST_MASTER_BENEFIT_TYPE.PATH} />
    </Switch>
  )
}

export default MasterBenefitTypeRoutes
