// context/user.context.js
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
  username: '',
  setUsername: () => {}
});

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  // Чтение из localStorage при инициализации
  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('user')) || [];
      const loggedInUser = storedUsers.find(user => user.isLogined === true);
      if (loggedInUser) {
        setUsername(loggedInUser.name);
      }
    } catch (err) {
      console.error('Ошибка чтения из localStorage:', err);
    }
  }, []);

  // Обновление localStorage при изменении username
  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('user')) || [];
      const updatedUsers = storedUsers.map(user =>
        user.name === username ? { ...user, isLogined: true } : user
      );
      localStorage.setItem('user', JSON.stringify(updatedUsers));
    } catch (err) {
      console.error('Ошибка записи в localStorage:', err);
    }
  }, [username]);

  // Слушаем изменения localStorage (в других вкладках/компонентах)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('user')) || [];
        const loggedInUser = storedUsers.find(user => user.isLogined === true);
        if (loggedInUser) {
          setUsername(loggedInUser.name);
        } else {
          setUsername(''); // Если никто не залогинен
        }
      } catch (err) {
        console.error('Ошибка при обновлении из localStorage:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
