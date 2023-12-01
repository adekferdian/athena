export const mapData = <T, R>(data: T | undefined, transformer: (data: T) => R): R | undefined =>
  data ? transformer(data) : undefined

export const getArrayNullable = <T>(data: T[] | undefined, idx: number): T | undefined =>
  data ? data[idx] : undefined
