import React from 'react'
import { Route, Switch} from 'react-router-dom'
import {ListHowTo} from './page/ListHowTo'
import {ListTypeVoucher} from './page/ListTypeVoucher'
import {ListTypeTransaction} from './page/ListTypeTransaction'
import VoucherUsageScreen from './Screens'

const VoucherUsageRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact={true} path={VoucherUsageScreen.LIST_MASTER_VOUCHER_USAGE_HOW.PATH} component={ListHowTo} />
      <Route exact={true} path={VoucherUsageScreen.LIST_MASTER_VOUCHER_TYPE_USAGE.PATH} component={ListTypeVoucher} />
      <Route exact={true} path={VoucherUsageScreen.LIST_MASTER_VOUCHER_TRANSACTION_USAGE.PATH} component={ListTypeTransaction} />
    </Switch>
  )
}

export default VoucherUsageRoutes
