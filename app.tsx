import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Index } from './pages'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  )
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('Container was not found.')
}

const root = ReactDOM.createRoot(container)
root.render(<App />)
