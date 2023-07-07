import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListMasterCampaignType} from './page/ListMasterCampaignType'
import {AddMasterCampaignType} from './page/AddMasterCampaignType'
import {EditMasterCampaignType} from './page/EditMasterCampaignType'
import MasterCampaignTypeScreen from './Screens'

const MasterCampaignTypeRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={MasterCampaignTypeScreen.LIST_MASTER_CAMPAIGN_TYPE.PATH} component={ListMasterCampaignType} />
      <Route path={MasterCampaignTypeScreen.ADD_MASTER_CAMPAIGN_TYPE.PATH} component={AddMasterCampaignType} />
      <Route path={MasterCampaignTypeScreen.EDIT_MASTER_CAMPAIGN_TYPE.PATH} component={EditMasterCampaignType} />
      <Redirect from='/master-type-campaign' exact={true} to={MasterCampaignTypeScreen.LIST_MASTER_CAMPAIGN_TYPE.PATH} />
      <Redirect to={MasterCampaignTypeScreen.LIST_MASTER_CAMPAIGN_TYPE.PATH} />
    </Switch>
  )
}

export default MasterCampaignTypeRoutes
