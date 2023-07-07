import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
// import {FaqScreens} from '../modules/faq/Screens'

export function PrivateRoutes() {
  const VoucherRoutes = lazy(() => import('../modules/voucher/VoucherRoutes'))
  const LanguageRoutes = lazy(() => import('../modules/language/LanguageRoutes'))
  const MasterRulesRoutes = lazy(() => import('../modules/master/Rules/MasterRulesRoutes'))
  const MasterVoucherRulesRoutes = lazy(() => import('../modules/master/VoucherRules/VoucherRulesRoute'))
  const MasterLimitRoutes = lazy(() => import('../modules/master/Limit/MasterLimitRoutes'))
  const MasterComponentRoutes = lazy(() => import('../modules/master/Component/MasterComponentRoutes'))
  const MasterConditionTypeRoutes = lazy(() => import('../modules/master/ConditionType/MasterConditionTypeRoutes'))
  const MasterCampaignTypeRoutes = lazy(() => import('../modules/master/CampaignType/MasterCampaignTypeRoutes'))
  const MasterBenefitTypeRoutes = lazy(() => import('../modules/master/BenefitType/MasterBenefitTypeRoutes'))
  const MasterBenefitRoutes = lazy(() => import('../modules/master/Benefit/MasterBenefitRoutes'))
  const MasterBusinessUnitRoutes = lazy(() => import('../modules/master/BusinessUnit/MasterBusinessUnitRoutes'))
  const MasterVoucherUsageRoutes = lazy(() => import('../modules/master/VoucherUsage/MasterVoucherUsageRoutes'));

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Redirect from='/auth' to='/' />
        <Redirect exact from='/' to='/' />
        <Route path='/voucher' component={VoucherRoutes} />
        <Route path='/voucher-rules' component={MasterVoucherRulesRoutes} />
        <Route path='/master-limit' component={MasterLimitRoutes} />
        <Route path='/master-bu' component={MasterBusinessUnitRoutes} />
        <Route path='/master-component' component={MasterComponentRoutes} />
        <Route path='/master-rules' component={MasterRulesRoutes} />
        <Route path='/master-benefit' component={MasterBenefitRoutes} />
        <Route path='/master-type-condition' component={MasterConditionTypeRoutes} />
        <Route path='/master-type-benefit' component={MasterBenefitTypeRoutes} />
        <Route path='/master-type-campaign' component={MasterCampaignTypeRoutes} />
        <Route path='/usage-voucher' component={MasterVoucherUsageRoutes} />
        <Route path='/language' component={LanguageRoutes} />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
