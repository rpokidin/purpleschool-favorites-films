import styles from './Nav.module.css';
import { useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearFavorites } from '../../store/favorites.slice';
import { selectUsername, clearUsername } from '../../store/user.slice';
import { RootState, AppDispatch } from '../../store/store';

const Nav = () => {
  const favoritesValue = useSelector((state: RootState) => state.favorites.count);
  const username = useSelector(selectUsername); // получаем username из Redux
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(() => {
    if (!username) return;

    setIsLoggingOut(true);

    try {
      dispatch(clearUsername()); // очищаем username в Redux
      dispatch(clearFavorites()); // сбрасываем состояние favorites
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    } finally {
      setIsLoggingOut(false);
      navigate('/login');
    }
  }, [username, dispatch, navigate]);

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
