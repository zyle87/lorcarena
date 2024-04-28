import { createHashRouter } from 'react-router-dom'
import DeckBuilder from './DeckBuilder'
import Home from './Home'

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/build',
    element: <DeckBuilder />
  },
])
