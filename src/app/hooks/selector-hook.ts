import {Mutex} from 'async-mutex'
import React, {useEffect, useMemo, useState} from 'react'

type Listener<T, R> = (data: T | undefined) => R | undefined
type CachedListener<T, R> = {
  forceUpdate: React.Dispatch<React.SetStateAction<number>>
  value: R
  listener: Listener<T, R>
}

function createSelectorContext<T>(initial: T, saveData?: boolean) {
  const mutex = new Mutex()
  const data = {
    data: initial,
    listeners: [] as CachedListener<T, any>[],
  }
  const setListener = <R>(
    listener: Listener<T, R>,
    forceUpdate: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const cached = {
      forceUpdate,
      value: listener(data.data),
      listener,
    } as CachedListener<T, R>
    data.listeners.push(cached)
    return () => {
      mutex.runExclusive(() => {
        data.listeners = data.listeners.filter((l) => l !== cached)
      })
    }
  }
  const useHook = <R>(listener: Listener<T, R>): R | undefined => {
    const [current, forceUpdate] = useState(0)
    useEffect(() => setListener(listener, forceUpdate), [listener])
    return saveData || current > 0 ? listener(data.data) : undefined
  }
  const updateDispatcher = (newData: T) => {
    data.data = newData
    data.listeners.forEach((l) => {
      const res = l.listener(data.data)
      if (res !== l.value) {
        l.value = res
        l.forceUpdate((v) => v + 1)
      }
    })
  }
  const update = (newData: React.SetStateAction<T>) => {
    mutex.runExclusive(() => {
      if (typeof newData !== 'function') {
        updateDispatcher(newData)
      } else {
        const newDataCall = newData as (prevState: T) => T
        const newVal = newDataCall(data.data)
        if (data.data !== newVal) updateDispatcher(newVal)
      }
    })
  }

  return {data, useHook, update}
}

export function useSelectorContext<T>(
  initial: T,
  saveData: boolean = true
): [T, <R>(listener: Listener<T, R>) => R | undefined, React.Dispatch<React.SetStateAction<T>>] {
  const {data, useHook, update} = useMemo(() => createSelectorContext<T>(initial, saveData), [])
  return [data.data, useHook, update]
}
