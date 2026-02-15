import { createBrowserRouter } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Favorites from './pages/Favorites/Favorites'
import Movie from './pages/Movie/Movie'
import { HeaderLayouts } from './layouts/HeaderLayouts/HeaderLayouts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayouts />,
    children: [
      {
        path: '/',
        element: <Main />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/movie/:id',
        element: <Movie />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;