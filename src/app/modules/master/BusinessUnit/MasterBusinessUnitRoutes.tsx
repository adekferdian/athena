import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListBusinessUnit} from './page/ListBusinessUnit'
import {AddBusinessUnit} from './page/AddBusinessUnit'
import {EditBusinessUnit} from './page/EditBusinessUnit'
import BusinessUnitScreen from './Screens'

const BusinessUnit: React.FC = () => {
  return (
    <Switch>
      <Route path={BusinessUnitScreen.LIST_MASTER_BUSINESS_UNIT.PATH} component={ListBusinessUnit} />
      <Route path={BusinessUnitScreen.ADD_MASTER_BUSINESS_UNIT.PATH} component={AddBusinessUnit} />
      <Route path={BusinessUnitScreen.EDIT_MASTER_BUSINESS_UNIT.PATH} component={EditBusinessUnit} />
      <Redirect from='/master-bu' exact={true} to={BusinessUnitScreen.LIST_MASTER_BUSINESS_UNIT.PATH} />
      <Redirect to={BusinessUnitScreen.LIST_MASTER_BUSINESS_UNIT.PATH} />
    </Switch>
  )
}

export default BusinessUnit
