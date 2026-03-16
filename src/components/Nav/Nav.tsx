import styles from './Nav.module.css';
import { useContext, useCallback, useState } from 'react';
import { UserContext } from '../../context/user.context';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearFavorites } from '../../store/favorites.slice'; // Импортируем действие сброса

const Nav = () => {
  const favoritesValue = useSelector((state: any) => state.favorites.count);
  const dispatch = useDispatch(); // Получаем dispatch
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(() => {
    if (!username) return;

    setIsLoggingOut(true);

    try {
      const users = JSON.parse(localStorage.getItem('user') || '[]');
      const updatedUsers = users.map((user: any) =>
        user.name === username ? { ...user, isLogined: false } : user
      );
      localStorage.setItem('user', JSON.stringify(updatedUsers));
      setUsername('');
      dispatch(clearFavorites()); // Сбрасываем состояние favorites в Redux
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    } finally {
      setIsLoggingOut(false);
      navigate('/login');
    }
  }, [username, setUsername, navigate, dispatch]); // Добавляем dispatch в зависимости

  return (
    <nav className={styles.nav}>
      <ul>
        <li><NavLink to="/">Поиск фильмов</NavLink></li>
        <li>
          <NavLink to="/favorites">
            Мои фильмы
            {favoritesValue > 0 && <span className={styles.nav__count}>{favoritesValue}</span>}
          </NavLink>
        </li>
        {username && (
          <li>
            <div>
              {username}
              <img src="/user-ico.svg" alt="Профиль пользователя" />
            </div>
          </li>
        )}
        {username ? (
          <li>
            <button onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Выход...' : 'Выйти'}
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/login">
              Войти
              <img src="/login-ico.svg" alt="" />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
