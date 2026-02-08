import styles from './Nav.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function Nav() {
  const { username, setUsername } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    
    try {
      const storedUsers = JSON.parse(localStorage.getItem('user')) || [];
      
      // Обновляем статус isLogined для текущего пользователя
      const updatedUsers = storedUsers.map(user => 
        user.name === username
          ? { ...user, isLogined: false }
          : user
      );
      
      localStorage.setItem('user', JSON.stringify(updatedUsers));
      setUsername(''); // Сброс в контексте
      
    } catch (err) {
      console.error('Ошибка при выходе из профиля:', err);
    }
  };

  return (
    <nav className={styles['nav']}>
      <ul>
        <li><a href="#">Поиск фильмов</a></li>
        <li><a href="#">Мои фильмы</a></li>
        {username && (
          <li>
            <a href="#">
              {username}
              <img src="/public/user-ico.svg" alt="Профиль пользователя" />
            </a>
          </li>
        )}
        <li>
          <a href="#" onClick={handleLogout}>Выйти</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;