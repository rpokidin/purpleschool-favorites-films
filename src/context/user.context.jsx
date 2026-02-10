import { createContext, useState, useEffect, useMemo } from 'react';

// Создание контекста пользователя
export const UserContext = createContext({
  username: '',
  setUsername: () => {},
});

// Проверка доступности localStorage
const canUseLocalStorage = () => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

// Загрузка пользователей из localStorage
const loadUsers = () => {
  if (!canUseLocalStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem('user')) || [];
  } catch (err) {
    console.error('Ошибка чтения из localStorage:', err);
    return [];
  }
};

// Сохранение пользователей в localStorage
const saveUsers = (users) => {
  if (!canUseLocalStorage()) return;
  try {
    localStorage.setItem('user', JSON.stringify(users));
  } catch (err) {
    console.error('Ошибка записи в localStorage:', err);
  }
};

// Основной провайдер контекста
export const UserContextProvider = ({ children }) => {
  // Локальное состояние username
  const [username, setUsername] = useState('');

  // Эффект: инициализация при первом рендере
  useEffect(() => {
    const storedUsers = loadUsers();
    const loggedInUser = storedUsers.find((user) => user.isLogined === true);
    if (loggedInUser) {
      setUsername(loggedInUser.name);
    }
  }, []);

  // Эффект: обновление localStorage при изменении username
  useEffect(() => {
    if (!username) return;

    const storedUsers = loadUsers();
    const user = storedUsers.find((u) => u.name === username);

    // Пропускаем, если пользователь уже залогинен
    if (user && user.isLogined) return;

    const updatedUsers = storedUsers.map((u) =>
      u.name === username ? { ...u, isLogined: true } : u
    );
    saveUsers(updatedUsers);
  }, [username]);

  // Эффект: синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUsers = loadUsers();
      const loggedInUser = storedUsers.find((user) => user.isLogined === true);
      if (loggedInUser) {
        setUsername(loggedInUser.name);
      } else {
        setUsername('');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Мемоизация значения контекста
  const value = useMemo(() => ({ username, setUsername }), [username]);

  // Возвращает провайдер с мемоизированным значением
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Установка displayName для отладки
UserContextProvider.displayName = 'UserContextProvider';
