import axios from 'axios'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {extractState} from '../utils/hook-utils'

// eslint-disable-next-line import/prefer-default-export
export function useDebounceEffect<T>(
  callback: (props: T, isActive: () => boolean, token: any) => any,
  time: number
) {
  const [data, setData] = useState({
    timestamp: 0,
    props: {} as T,
  })
  const trigger = useMemo(() => {
    return (props: T) =>
      setData({
        timestamp: Date.now(),
        props,
      })
  }, [])
  const effectCb = useCallback(() => {
    let isActive = true
    const source = axios.CancelToken.source()
    let timeout: any | undefined
    const runner = async () => {
      const localData = await extractState(setData)
      if (localData.timestamp > 0) {
        timeout = setTimeout(() => {
          callback(localData.props, () => isActive, source.token)
        }, time)
      }
    }
    runner()
    return () => {
      isActive = false
      source.cancel()
      if (timeout) clearTimeout(timeout)
    }
  }, [callback, time])
  useEffect(effectCb, [data.timestamp])
  return trigger
}

export function useDebounceEffectMulti<T>(callback: (props: T, token: any) => any, time: number) {
  const [runner, setRunner] = useState<Record<any, {timeout: any; source: any}>>({})
  const trigger = useMemo(() => {
    const localRunner: typeof runner = {}
    return (props: T, index: number) => {
      const source = axios.CancelToken.source()
      const doAction = async () => {
        if (localRunner[index]) {
          clearTimeout(localRunner[index].timeout)
          localRunner[index].source.cancel()
        }
        localRunner[index] = {
          source,
          timeout: setTimeout(() => {
            callback(props, source.token)
          }, time),
        }
        setRunner(localRunner)
      }
      doAction()
    }
  }, [callback])

  useEffect(() => {
    return () => {
      const task = async () => {
        const localRunner = await extractState(setRunner)
        Object.keys(localRunner)?.forEach((i) => {
          if (localRunner[i]) {
            clearTimeout(localRunner[i].timeout)
            localRunner[i].source.cancel()
          }
        })
        setRunner({})
      }
      task()
    }
  }, [callback])
  return trigger
}
