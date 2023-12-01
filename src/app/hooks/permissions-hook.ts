import {useCallback, useMemo} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from 'src/setup'

export interface PermissionQuery {
  code?: string
  access?: string
}

export function usePermissions(pageQuery?: PermissionQuery) {
  const permissions = useSelector<RootState>(
    ({auth}) => auth.permissions ?? {},
    shallowEqual
  ) as Record<string, string[]>
  const hasAccess = useCallback(
    (q?: PermissionQuery) => {
      const code = q?.code ?? pageQuery?.code
      if (!code) return true
      return Boolean(
        permissions[code]?.find((data) => data === (q?.access ?? pageQuery?.access ?? 'read'))
      )
    },
    [pageQuery?.access, pageQuery?.code, permissions]
  )
  const canAccessPage = useMemo(() => hasAccess(), [hasAccess])
  return {hasAccess, canAccessPage}
}
