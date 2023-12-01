import {FC, useRef, useEffect, useState} from 'react'
import {shallowEqual, useSelector, connect, useDispatch, ConnectedProps} from 'react-redux'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
// import {getUserByToken} from './AuthCRUD'
import {RootState} from '../../../../setup'
import AuthRedux from './AuthRedux'

const mapState = (state: RootState) => ({auth: state.auth})
const connector = connect(mapState, AuthRedux.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const didRequest = useRef(false)
  const dispatch = useDispatch()
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const accessToken = useSelector<RootState>(({auth}) => Boolean(auth.accessToken), shallowEqual)

  // We should request user by authToken before rendering the application
  useEffect(() => {
    // const requestUser = async () => {
    //   try {
    //     if (!didRequest.current) {
    //       const {data: user} = await getUserByToken()
    //       dispatch(props.fulfillUser(user))
    //     }
    //   } catch (error) {
    //     console.error(error)
    //     if (!didRequest.current) {
    //       dispatch(props.logout())
    //     }
    //   } finally {
    //     setShowSplashScreen(false)
    //   }

    //   return () => (didRequest.current = true)
    // }

    if (accessToken) {
      // requestUser()
      didRequest.current = true
      setShowSplashScreen(false)
    } else {
      dispatch(props.logout())
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default connector(AuthInit)
