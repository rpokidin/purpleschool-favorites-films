import { configureStore, Middleware } from '@reduxjs/toolkit';
import favoritesReducer from './favorites.slice';

const loadInitialStateFromStorage = () => {
  try {
    const usersData = localStorage.getItem('user');
    if (!usersData) return { favorites: { films: [], count: 0 } };

    const users = JSON.parse(usersData);
    const loggedInUser = users.find((user: any) => user.isLogined);

    return loggedInUser && Array.isArray(loggedInUser.favorites)
      ? { favorites: { films: loggedInUser.favorites, count: loggedInUser.favorites.length } }
      : { favorites: { films: [], count: 0 } };
  } catch (error) {
    console.error('Error loading initial state:', error);
    return { favorites: { films: [], count: 0 } };
  }
};

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
      const { favorites } = store.getState();
      const usersData = localStorage.getItem('user');
      if (usersData) {
        const users = JSON.parse(usersData);
        const updatedUsers = users.map((user: any) =>
          user.isLogined ? { ...user, favorites: favorites.films } : user
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
  reducer: { favorites: favoritesReducer },
  preloadedState: loadInitialStateFromStorage(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});
