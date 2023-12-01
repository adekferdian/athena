import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import {extractState} from '../utils/hook-utils'

export type PaginationState<T, Q> = {
  loading: boolean
  refreshing: boolean
  error: boolean
  page: number
  data: T[]
  limit: number
  total: number
  query: Q
}

export function usePagination<T, Q>(
  loadData: (
    state: PaginationState<T, Q>,
    setState: React.Dispatch<React.SetStateAction<PaginationState<T, Q>>>,
    isActive: () => boolean,
    token: any
  ) => any,
  defaultState: PaginationState<T, Q>
) {
  const [state, setState] = useState(defaultState)
  const setPage = useCallback((page: number) => {
    setState((prev) => {
      if (prev.refreshing || (prev.total > 0 && !Math.ceil(prev.total / prev.limit))) return prev
      return {
        ...prev,
        loading: true,
        refreshing: false,
        page,
      }
    })
  }, [])
  const setQuery = useCallback((builder: (query: Q) => Q) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      refreshing: true,
      page: 1,
      total: 0,
      query: builder(prev.query),
    }))
  }, [])
  const setLimit = useCallback((limit: number) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      refreshing: true,
      page: 1,
      total: 0,
      limit,
    }))
  }, [])
  const callback = useCallback(() => {
    let isActive = true
    const source = axios.CancelToken.source()
    const runner = async () => {
      const localState = await extractState(setState)
      if (!localState.loading && !localState.refreshing) return
      loadData(localState, setState, () => isActive, source.token)
    }
    runner()
    return () => {
      isActive = false
      source.cancel()
    }
  }, [loadData])
  useEffect(callback, [state.loading, state.refreshing])
  return {
    state,
    setPage,
    setQuery,
    setLimit,
    setState,
  }
}
