import { configureStore, Middleware } from '@reduxjs/toolkit';
import favoritesReducer from './favorites.slice';
import userReducer from './user.slice'; // импортируем новый слайс

// Сохраняем существующий middleware для синхронизации избранного
const localStorageMiddleware: Middleware = store => next => (action: unknown) => {
  const result = next(action);

  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as { type: string }).type === 'string' &&
    (action as { type: string }).type.startsWith('favorites/')
  ) {
    try {
      const { favorites, user } = store.getState() as RootState;
      const usersData = localStorage.getItem('user');
      if (usersData) {
        const users = JSON.parse(usersData);
        const updatedUsers = users.map((userItem: any) =>
          userItem.name === user.username ? { ...userItem, favorites: favorites.films } : userItem
        );
        localStorage.setItem('user', JSON.stringify(updatedUsers));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    user: userReducer // добавляем пользовательский слайс
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});

// Типизация корневого состояния
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
