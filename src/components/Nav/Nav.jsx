import styles from './Nav.module.css';
import { useContext, useCallback, useState } from 'react';
import { UserContext } from '../../context/user.context';

// Функция для проверки доступности localStorage
const canUseLocalStorage = () => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

// Загружает массив пользователей из localStorage
const loadUsers = () => {
  if (!canUseLocalStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem('user')) || [];
  } catch (err) {
    console.error('Ошибка чтения из localStorage:', err);
    return [];
  }
};

// Сохраняет массив пользователей в localStorage
const saveUsers = (users) => {
  if (!canUseLocalStorage()) return;
  try {
    localStorage.setItem('user', JSON.stringify(users));
  } catch (err) {
    console.error('Ошибка записи в localStorage:', err);
  }
};

function Nav() {
  const { username, setUsername } = useContext(UserContext);
  
  // Состояние для отслеживания процесса выхода (чтобы показать индикатор загрузки)
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Обработчик клика по кнопке «Выйти»
  const handleLogout = useCallback(async (e) => {
    e.preventDefault();
    setIsLoggingOut(true); 

    try {
      const storedUsers = loadUsers();
      
      const updatedUsers = storedUsers.map(user =>
        user.name === username ? { ...user, isLogined: false } : user
      );
      
      saveUsers(updatedUsers);
      
      setUsername('');
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
            disabled={isLoggingOut}
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
