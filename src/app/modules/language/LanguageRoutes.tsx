import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {LanguageList} from './page/LanguageList'
import LanguageScreens from './Screens'
import {AddLanguage} from './page/AddLanguage'

const LanguageRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={LanguageScreens.LANGUAGE_LIST.PATH} component={LanguageList} />
      <Route path={LanguageScreens.ADD_LANGUAGE.PATH} component={AddLanguage} />
      <Redirect from='/language' exact={true} to={LanguageScreens.LANGUAGE_LIST.PATH} />
      <Redirect to={LanguageScreens.LANGUAGE_LIST.PATH} />
    </Switch>
  )
}

export default LanguageRoutes
