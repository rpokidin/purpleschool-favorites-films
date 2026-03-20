import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Интерфейс пользователя
interface User {
  name: string;
  isLogined: boolean;
}

// Состояние пользователя
interface UserState {
  username: string;
}

// Вспомогательные функции для работы с localStorage
const canUseLocalStorage = (): boolean => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

const loadUsers = (): User[] => {
  if (!canUseLocalStorage()) return [];
  try {
    const stored = localStorage.getItem('user');
    if (stored === null) return [];
    return JSON.parse(stored);
  } catch (err) {
    console.error('Ошибка чтения из localStorage:', err);
    return [];
  }
};

const saveUsers = (users: User[]): boolean => {
  if (!canUseLocalStorage()) {
    console.warn('localStorage недоступен');
    return false;
  }
  try {
    localStorage.setItem('user', JSON.stringify(users));
    return true;
  } catch (err) {
    console.error('Ошибка записи в localStorage:', err);
    return false;
  }
};

const getLoggedInUser = (): string => {
  const storedUsers = loadUsers();
  const loggedInUser = storedUsers.find((user) => user.isLogined === true);
  return loggedInUser?.name || '';
};

// Начальное состояние
const initialState: UserState = {
  username: getLoggedInUser()
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;

      // Сохраняем в localStorage
      if (action.payload) {
        const storedUsers = loadUsers();
        const userIndex = storedUsers.findIndex((u) => u.name === action.payload);

        let updatedUsers: User[];

        if (userIndex !== -1) {
          updatedUsers = storedUsers.map((u) =>
            u.name === action.payload ? { ...u, isLogined: true } : u
          );
        } else {
          updatedUsers = [...storedUsers, { name: action.payload, isLogined: true }];
        }

        saveUsers(updatedUsers);
      }
    },
    clearUsername: (state) => {
  const currentUsername = state.username;
  state.username = '';

  // Обновляем localStorage через вспомогательные функции
  try {
    const users = loadUsers(); // используем loadUsers вместо прямого чтения localStorage
    const updatedUsers = users.map((user: User) =>
      user.name === currentUsername ? { ...user, isLogined: false } : user
    );
    saveUsers(updatedUsers); // используем saveUsers вместо прямой записи в localStorage
  } catch (err) {
    console.error('Ошибка при очистке username:', err);
  }
}
  }
});

// Экспортируем действия и селектор
export const { setUsername, clearUsername } = userSlice.actions;
export const selectUsername = (state: RootState) => state.user.username;

export default userSlice.reducer;
