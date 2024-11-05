import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import { ScrollToTop } from './components/scroll-top/scrolll-top.jsx'
import { PokemonCards } from './components/pages/Pokemons.jsx'
import { PokemonPage } from './components/pages/pokemon.jsx'
import { ThemeProvider } from './components/contexts/theme-context.jsx'

const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <App />,
    children: [
      <ScrollToTop/>,
      { path: "/", element: <PokemonCards/> },
      { path: "/pokemon/:name", element: <PokemonPage/> }
    ]
  }
])

const client = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
