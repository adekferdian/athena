import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListMasterComponent} from './page/ListMasterComponent'
import {AddMasterComponent} from './page/AddMasterComponent'
import {EditMasterComponent} from './page/EditMasterComponent'
import MasterComponentScreen from './Screens'

const MasterComponentRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={MasterComponentScreen.LIST_MASTER_COMPONENT.PATH} component={ListMasterComponent} />
      <Route path={MasterComponentScreen.ADD_MASTER_COMPONENT.PATH} component={AddMasterComponent} />
      <Route path={MasterComponentScreen.EDIT_MASTER_COMPONENT.PATH} component={EditMasterComponent} />
      <Redirect from='/master-component' exact={true} to={MasterComponentScreen.LIST_MASTER_COMPONENT.PATH} />
      <Redirect to={MasterComponentScreen.LIST_MASTER_COMPONENT.PATH} />
    </Switch>
  )
}

export default MasterComponentRoutes
