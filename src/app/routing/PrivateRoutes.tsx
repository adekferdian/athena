import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
// import {FaqScreens} from '../modules/faq/Screens'

export function PrivateRoutes() {
  const VoucherRoutes = lazy(() => import('../modules/voucher/VoucherRoutes'))
  const LanguageRoutes = lazy(() => import('../modules/language/LanguageRoutes'))
  const MasterRulesRoutes = lazy(() => import('../modules/master/Rules/MasterRulesRoutes'))
  const MasterBenefitTypeRoutes = lazy(() => import('../modules/master/BenefitType/MasterBenefitTypeRoutes'))
  const MasterBenefitRoutes = lazy(() => import('../modules/master/Benefit/MasterBenefitRoutes'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Redirect from='/auth' to='/' />
        <Redirect exact from='/' to='/' />
        <Route path='/voucher' component={VoucherRoutes} />
        <Route path='/master-rules' component={MasterRulesRoutes} />
        <Route path='/master-benefit' component={MasterBenefitRoutes} />
        <Route path='/master-type-benefit' component={MasterBenefitTypeRoutes} />
        <Route path='/language' component={LanguageRoutes} />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
