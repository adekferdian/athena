import React, {useEffect} from 'react'
import {useLocation} from 'react-router'
import {useLayout} from '../core'
import {DrawerComponent} from '../../assets/ts/components'

const Content: React.FC = ({children}) => {
  console.log(children, 'children');
  
  const {classes} = useLayout()
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div id='' style={{marginTop: -30,}} className="w-100 h-100">
      {children}
    </div>
  )
}

export {Content}
