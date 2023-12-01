const sumFn = (accumulator: number, a: number) => {
  return accumulator + a
}

export const sumArray = (arr?: number[]) => {
  return arr && arr.length > 0 ? arr.reduce(sumFn) : 0
}
