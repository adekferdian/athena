import {useEffect} from 'react'

export const forceFocusError = (selector = '.fv-plugins-message-container.text-danger') => {
  const errorElement = document.querySelector(selector) as HTMLElement
  if (errorElement) {
    errorElement.parentElement?.scrollIntoView({behavior: 'smooth', block: 'center'})
    errorElement.parentElement?.querySelector('input')?.focus({preventScroll: true})
  }
}

export const forceFocusErrorTimed = (
  delay = 500,
  selector = '.fv-plugins-message-container.text-danger'
) => {
  return new Promise<void>((r) =>
    setTimeout(() => {
      forceFocusError(selector)
      r()
    }, delay)
  )
}

export const useFormikFocus = (
  formik: {
    isSubmitting: boolean
    isValidating: boolean
    errors: Record<any, any>
  },
  selector = '.fv-plugins-message-container.text-danger'
) => {
  useEffect(() => {
    if (formik.isSubmitting && !formik.isValidating && Object.keys(formik.errors).length > 0) {
      forceFocusError(selector)
    }
  }, [formik.errors, formik.isSubmitting, formik.isValidating])
}
