import { createBrowserRouter } from 'react-router-dom'
import DeckBuilder from './DeckBuilder'
import Home from './Home'
import Root from './Root'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/build',
        element: <DeckBuilder />
      }
    ]
  }
])
