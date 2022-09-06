import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Index } from './index'

import type { ColorScheme } from '@mantine/core'

const queryClient = new QueryClient()

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({ key: 'color-scheme', defaultValue: 'dark' })
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}
      >
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Index />} />
            </Routes>
          </BrowserRouter>
        </ColorSchemeProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('root container was not found.')
}

const root = ReactDOM.createRoot(container)
root.render(<App />)
