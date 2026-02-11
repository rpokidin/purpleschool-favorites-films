import styles from './Nav.module.css';
import { useContext, useCallback, useState } from 'react';
import { UserContext } from '../../context/user.context';

// Интерфейс для типа пользователя
interface User {
  name: string;
  isLogined: boolean;
}

// Функция для проверки доступности localStorage
const canUseLocalStorage = () => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

// Загружает массив пользователей из localStorage
const loadUsers = (): User[] => {
  if (!canUseLocalStorage()) return [];
  try {
    const stored = localStorage.getItem('user');
    if (stored === null) return []; // Проверка на null
    return JSON.parse(stored);
  } catch (err) {
    console.error('Ошибка чтения из localStorage:', err);
    return [];
  }
};

// Сохраняет массив пользователей в localStorage
const saveUsers = (users: User[]): void => {
  if (!canUseLocalStorage()) return;
  try {
    localStorage.setItem('user', JSON.stringify(users));
  } catch (err) {
    console.error('Ошибка записи в localStorage:', err);
  }
};

const Nav = () => {
  const { username, setUsername } = useContext(UserContext);
  
  // Состояние для отслеживания процесса выхода (чтобы показать индикатор загрузки)
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Обработчик клика по кнопке «Выйти»
  const handleLogout = useCallback(() => {

    if (!username) return;
    
    setIsLoggingOut(true); 

    try {
      const storedUsers = loadUsers();
      
      const updatedUsers = storedUsers.map(user =>
        user.name === username ? { ...user, isLogined: false } : user
      );
      
      saveUsers(updatedUsers);
      
      setUsername();
    } catch (err) {
      console.error('Ошибка при выходе из профиля:', err);
    } finally {
      setIsLoggingOut(false);
    }
  }, [username, setUsername]);

  return (
    <nav className={styles['nav']}>
      <ul>
        <li key="search"><a href="#">Поиск фильмов</a></li>
        <li key="my-movies"><a href="#">Мои фильмы</a></li>
        {username && (
          <li key="profile">
            <a href="#">
              {username}
              <img src="/user-ico.svg" alt="Профиль пользователя" />
            </a>
          </li>
        )}
        <li key="logout">
          <a
            href="#"
            onClick={handleLogout}
            className={isLoggingOut ? styles['logout-disabled'] : ''}
          >
            {isLoggingOut ? 'Выход...' : 'Выйти'}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
