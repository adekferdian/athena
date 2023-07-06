import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ListVoucherRules} from './page/ListVoucherRules'
import {AddVoucherRules} from './page/AddVoucherRules'
import {EditVoucherRules} from './page/EditVoucherRules'
import VoucherRulesScreen from './Screens'

const MasterVoucherRulesRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={VoucherRulesScreen.LIST_VOUCHER_RULES.PATH} component={ListVoucherRules} />
      <Route path={VoucherRulesScreen.ADD_VOUCHER_RULES.PATH} component={AddVoucherRules} />
      <Route path={VoucherRulesScreen.EDIT_VOUCHER_RULES.PATH} component={EditVoucherRules} />
      <Redirect
        from='/master-benefit'
        exact={true}
        to={VoucherRulesScreen.LIST_VOUCHER_RULES.PATH}
      />
      <Redirect to={VoucherRulesScreen.LIST_VOUCHER_RULES.PATH} />
    </Switch>
  )
}

export default MasterVoucherRulesRoutes
