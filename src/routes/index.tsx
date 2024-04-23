import { createHashRouter } from 'react-router-dom'
import DeckBuilder from './DeckBuilder'
import DeckRoster from './DeckRoster'
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
  {
    path: '/:id',
    element: <DeckRoster />
  }
])
