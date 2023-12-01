import React from 'react'

// eslint-disable-next-line import/prefer-default-export
export const extractState = <T>(dispatcher: React.Dispatch<React.SetStateAction<T>>) =>
  new Promise((r: (value: T) => void) => {
    dispatcher((value) => {
      r(value)
      return value
    })
  })
