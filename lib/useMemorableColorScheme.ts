import { useLocalStorage } from '@mantine/hooks'

import type { ColorScheme } from '@mantine/core'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useMemorableColorScheme = () => {
  const [isDark, setIsDark] = useLocalStorage({
    key: 'is-dark-color-scheme',
    defaultValue: false,
  })

  const toggleColorScheme = (value?: ColorScheme) => {
    switch (value) {
      case 'dark':
        setIsDark(false)
        break
      case 'light':
        setIsDark(true)
        break
      default:
        setIsDark((isDark) => !isDark)
    }
  }

  const colorScheme = isDark ? 'dark' : 'light'
  return [colorScheme, toggleColorScheme] as const
}
