import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {PasswordPage} from './page/PasswordPage'
import {ProfilePage} from './page/ProfilePage'
import ProfileScreens from './Screens'

const ProfileRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={ProfileScreens.PASSWORD.PATH} component={PasswordPage} />
      <Route path={ProfileScreens.PROFILE.PATH} component={ProfilePage} />
    </Switch>
  )
}

export default ProfileRoutes
