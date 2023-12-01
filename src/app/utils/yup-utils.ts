import {ref, TestContext} from 'yup'

export const testRequiredIfNot = (condition: boolean, v: any) => {
  return condition || Boolean(v)
}

export const testRequiredIf = (condition: boolean, v: any) => {
  return testRequiredIfNot(!condition, v)
}

export const testIsEqualWith = (yup: TestContext<Record<string, any>>, field: string, v: any) => {
  return v === yup.resolve(ref(field))
}
