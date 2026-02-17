import { createBrowserRouter } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Favorites from './pages/Favorites/Favorites'
import Movie from './pages/Movie/Movie'
import { HeaderLayouts } from './layouts/HeaderLayouts/HeaderLayouts'
import { Suspense } from 'react'
import axios from 'axios'
import { API_KEY, PREFIX } from './helpers/API'

const movieLoader = async ({ params }: { params: { id?: string } }) => {
  try {

    if (!params.id) return { error: 'Movie ID is required' }

    const movieId = parseInt(params.id, 10);

    if (isNaN(movieId)) return { error: 'Invalid movie ID' }

    const { data } = await axios.get(
      `${PREFIX}${movieId}`,
      {
        headers: {
          'X-API-Key': API_KEY
        }
      }
    );
    return data;
    
  } catch (error: any) {
    console.error('Movie loader error:', error.message);
    return {
      error: error.response?.status === 404
        ? 'Movie not found'
        : 'Failed to load movie'
    };
  }
};

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
        element: (
          <Suspense fallback={<div className="loading">Загрузка фильма...</div>}>
            <Movie />
          </Suspense>
        ),
        errorElement: <div className="error">Ошибка загрузки продукта</div>,
        loader: movieLoader
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;