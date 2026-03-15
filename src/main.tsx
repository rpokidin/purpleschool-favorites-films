import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store';
import { addToFavorites } from './store/favorites.slice'

// Загружаем избранное из localStorage при старте приложения
const savedFavorites = localStorage.getItem('favorites');
if (savedFavorites) {
  try {
    const parsed = JSON.parse(savedFavorites);
    parsed.forEach((film: any) => {
      store.dispatch(addToFavorites(film));
    });
  } catch (error) {
    console.error('Ошибка загрузки из localStorage:', error);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
