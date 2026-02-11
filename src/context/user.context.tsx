import { createContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';

// Интерфейс для типа пользователя
interface User {
  name: string;
  isLogined: boolean;
}

// Создание контекста пользователя с типизацией
export const UserContext = createContext<{
  username: string;
  setUsername: (name: string) => void;
}>({
  username: '',
  setUsername: () => {
    console.warn('setUsername called outside of UserContextProvider');
  },
});

// Проверка доступности localStorage
const canUseLocalStorage = (): boolean => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

// Загрузка пользователей из localStorage
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

// Сохранение пользователей в localStorage
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

// Вспомогательная функция для поиска залогиненного пользователя
const getLoggedInUser = (): string => {
  const storedUsers = loadUsers();
  const loggedInUser = storedUsers.find((user) => user.isLogined === true);
  return loggedInUser?.name || '';
};

// Основной провайдер контекста
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  // Локальное состояние username
  const [username, setLocalUsername] = useState<string>(getLoggedInUser());

  // Мемоизированная функция установки username
  const setUsername = useCallback((name: string) => {
    setLocalUsername(name);

    // Обновляем localStorage при установке нового username
    if (!name) return;

    const storedUsers = loadUsers();
    const userIndex = storedUsers.findIndex((u) => u.name === name);

    let updatedUsers: User[];

    if (userIndex !== -1) {
      // Пользователь существует — обновляем флаг isLogined
      if (storedUsers[userIndex].isLogined) return; // Пропускаем, если уже залогинен

      updatedUsers = storedUsers.map((u) =>
        u.name === name ? { ...u, isLogined: true } : u
      );
    } else {
      // Пользователь не существует — добавляем его
      updatedUsers = [...storedUsers, { name, isLogined: true }];
    }

    saveUsers(updatedUsers);
  }, []);

  // Эффект: синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Игнорируем изменения, не относящиеся к нашему ключу
      if (event.key !== 'user') return;

      const currentLoggedInUser = getLoggedInUser();
      if (currentLoggedInUser !== username) {
        setLocalUsername(currentLoggedInUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [username]);

  // Мемоизация значения контекста
  const value = useMemo(() => ({ username, setUsername }), [username, setUsername]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Установка displayName для отладки
UserContextProvider.displayName = 'UserContextProvider';
