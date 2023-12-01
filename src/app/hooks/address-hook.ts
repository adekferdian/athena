/* eslint-disable unused-imports/no-unused-imports */
import {useCallback, useEffect, useState} from 'react'
import {LabelValueProps} from '../components/CustomReactSelect'
import {cityList, provinceList} from '../modules/queries/redux/QueriesCRUD'
import {useCancelableEffect} from './cancelable-hook'

interface AddressHookProps {
  country?: LabelValueProps | null
  province?: LabelValueProps | null
  city?: LabelValueProps | null
}

interface StateModel {
  country: LabelValueProps | null
  province: LabelValueProps | null
  city: LabelValueProps | null
  loading: {
    country: boolean
    province: boolean
    city: boolean
  }
  countries: LabelValueProps[]
  provinces: LabelValueProps[]
  cities: LabelValueProps[]
}

interface HandleChange {
  name: 'country' | 'province' | 'city' | 'countries' | 'provinces' | 'cities'
  value: LabelValueProps | LabelValueProps[] | null
}

interface HandleLoading {
  name: 'country' | 'province' | 'city'
  value: boolean
}

interface OnChange {
  name: 'country' | 'province' | 'city'
  value: LabelValueProps | null
}

interface OnChangeBatch {
  country: LabelValueProps | null
  province: LabelValueProps | null
  city: LabelValueProps | null
}

export const useAddressHook = (query?: AddressHookProps) => {
  const [addrState, setState] = useState<StateModel>({
    country: null,
    province: null,
    city: null,
    loading: {
      country: false,
      province: false,
      city: false,
    },
    countries: [],
    provinces: [],
    cities: [],
  })

  const handleChange = ({name, value}: HandleChange) =>
    setState((prev) => ({...prev, [name]: value}))

  const handleLoading = ({name, value}: HandleLoading) => {
    const loading = addrState.loading
    loading[name] = value
    setState((prev) => ({...prev, loading}))
  }

  const onChangeAddrBatch = useCallback((data: OnChangeBatch) => {
    setState((prev) => ({...prev, ...data}))
  }, [])

  const onChangeAddr = useCallback(({name, value}: OnChange) => {
    switch (name) {
      case 'country': {
        handleChange({name, value})
        handleChange({name: 'province', value: null})
        handleChange({name: 'city', value: null})
        break
      }
      case 'province': {
        handleChange({name, value})
        handleChange({name: 'city', value: null})
        break
      }
      default: {
        handleChange({name, value})
        break
      }
    }
  }, [])

  // useCancelableEffect(
  //   useCallback((isActive, cancelToken) => {
  //     handleLoading({name: 'country', value: true})
  //     getCountries(1, 999999, undefined, cancelToken)
  //       .then((res) => {
  //         const value = res.data.data?.items.map((it) => ({value: it.id, label: it.name})) || []
  //         if (isActive()) {
  //           handleChange({name: 'countries', value})
  //           handleLoading({name: 'country', value: false})
  //         }
  //       })
  //       .catch((e) => {
  //         if (isActive()) handleLoading({name: 'country', value: false})
  //       })
  //   }, []),
  //   []
  // )

  useEffect(() => {
    if (query?.country) {
      handleChange({name: 'country', value: query?.country})
    }
  }, [query?.country])

  useEffect(() => {
    if (query?.province) {
      handleChange({name: 'province', value: query?.province})
    }
  }, [query?.province])

  useEffect(() => {
    if (query?.city) {
      handleChange({name: 'city', value: query?.city})
    }
  }, [query?.city])

  useCancelableEffect(
    useCallback(
      (isActive, cancelToken) => {
        if (addrState.country?.value) {
          handleLoading({name: 'province', value: true})
          provinceList(addrState.country?.value, {page: 1, limit: 999999}, cancelToken)
            .then((res) => {
              const value =
                res.data.data?.items.map((it: any) => ({value: it?.id, label: it?.name})) || []
              if (isActive()) {
                handleChange({name: 'provinces', value})
                handleLoading({name: 'province', value: false})
              }
            })
            .catch((e) => {
              if (isActive()) handleLoading({name: 'province', value: false})
            })
        }
      },
      [addrState.country?.value]
    ),
    [addrState.country?.value]
  )

  useCancelableEffect(
    useCallback(
      (isActive, cancelToken) => {
        if (addrState.province?.value) {
          handleLoading({name: 'city', value: true})
          cityList(addrState.province?.value, {page: 1, limit: 999999}, cancelToken)
            .then((res) => {
              const value =
                res.data.data?.items.map((it: any) => ({value: it.id, label: it.name})) || []
              if (isActive()) {
                handleChange({name: 'cities', value})
                handleLoading({name: 'city', value: false})
              }
            })
            .catch((e) => {
              if (isActive()) handleLoading({name: 'city', value: false})
            })
        }
      },
      [addrState.province?.value]
    ),
    [addrState.province?.value]
  )

  return {onChangeAddr, onChangeAddrBatch, addrState}
}
