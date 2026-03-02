import { createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Favorites from './pages/Favorites/Favorites';
import Movie from './pages/Movie/Movie';
import { HeaderLayouts } from './layouts/HeaderLayouts/HeaderLayouts';
import { Suspense } from 'react';
import axios from 'axios';
import { API_KEY, PREFIX } from './helpers/API';
import { RequireAuth } from './helpers/RequireAuth';

const movieLoader = async ({ params }: { params: { id?: string } }) => {
  try {
    if (!params.id) return { error: 'Требуется указать ID фильма' };

    const movieId = parseInt(params.id, 10);

    if (isNaN(movieId)) return { error: 'Некорректный ID фильма' };

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
    console.error('Ошибка при загрузке фильма:', error.message);
    return {
      error: error.response?.status === 404
        ? 'Фильм не найден'
        : 'Не удалось загрузить информацию о фильме'
    };
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayouts />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/',
        element: (
          <RequireAuth>
            <Main />
          </RequireAuth>
        )
      },

      {
        path: '/favorites',
        element: (
          <RequireAuth>
            <Favorites />
          </RequireAuth>
        )
      },
      {
        path: '/movie/:id',
        element: (
          <RequireAuth>
            <Suspense fallback={<div className="loading">Загрузка фильма...</div>}>
              <Movie />
            </Suspense>
          </RequireAuth>
        ),
        errorElement: <div className="error">Ошибка загрузки фильма</div>,
        loader: movieLoader
      }
    ]
  },
  {
    path: '*',
    element: (
      <RequireAuth>
        <NotFound />
      </RequireAuth>
    )
  }
]);

export default router;
