import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Index } from './index'
import { useMemorableColorScheme } from '../lib/useMemorableColorScheme'

const queryClient = new QueryClient()

export const App: React.FC = () => {
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()

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
              <Route path="/" element={<Index />} />
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
