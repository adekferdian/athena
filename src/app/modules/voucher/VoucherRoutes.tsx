import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {VoucherList} from './page/VoucherList'
import {AddVoucher} from './page/AddVoucher'
import {EditVoucher} from './page/EditVoucher'
import VoucherScreens from './Screens'

const VoucherRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={VoucherScreens.VOUCHER_LIST.PATH} component={VoucherList} />
      <Route path={VoucherScreens.ADD_VOUCHER.PATH} component={AddVoucher} />
      <Route path={VoucherScreens.EDIT_VOUCHER.PATH} component={EditVoucher} />
      <Redirect from='/voucher' exact={true} to={VoucherScreens.VOUCHER_LIST.PATH} />
      <Redirect to={VoucherScreens.VOUCHER_LIST.PATH} />
    </Switch>
  )
}

export default VoucherRoutes
