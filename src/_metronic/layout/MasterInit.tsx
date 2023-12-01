import {useEffect, useRef} from 'react'
import {
  MenuComponent,
  DrawerComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from '../assets/ts/components'

import {useLayout} from './core'

export function MasterInit() {
  const {config} = useLayout()
  const isFirstRun = useRef(true)
  const pluginsInitialization = () => {
    isFirstRun.current = false
    let cleanup: Function
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      cleanup = MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
    }, 200)
    return () => {
      if (cleanup) cleanup()
    }
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return pluginsInitialization()
    }
  }, [config])

  return <></>
}
