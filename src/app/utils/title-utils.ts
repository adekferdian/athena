export const AppName = process.env.REACT_APP_THEME_NAME

export function getTitle(name?: string) {
  if (!name) return process.env.REACT_APP_THEME_NAME ?? ''
  return `${process.env.REACT_APP_THEME_NAME} | ${name}`
}
