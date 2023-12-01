import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect, Switch} from 'react-router-dom'
import AuthRedux from './redux/AuthRedux'

export function Logout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(AuthRedux.actions.logout())
    // document.location.reload()
  }, [dispatch])

  return (
    <Switch>
      <Redirect to='/auth/login' />
    </Switch>
  )
}
