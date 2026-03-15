import styles from './Login.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useState, useContext, useCallback, SyntheticEvent, ChangeEvent } from 'react';
import { UserContext } from '../../context/user.context';
import type { LoginProps } from './Login.props';
import TitleH1 from '../../components/UniversalTitle/UniversalTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFavorites, addToFavorites } from '../../store/favorites.slice';

type FormSubmitEvent = SyntheticEvent<HTMLFormElement>;
type InputChangeEvent = ChangeEvent<HTMLInputElement>;

const Login = ({}: LoginProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsernameLocal] = useState('');
  const [error, setError] = useState('');
  const { setUsername } = useContext(UserContext);

  const loadUsers = (): LoginProps[] => {
    try {
      return JSON.parse(localStorage.getItem('user') || '[]');
    } catch {
      return [];
    }
  };

  const saveUsers = (users: LoginProps[]) => {
    try {
      localStorage.setItem('user', JSON.stringify(users));
    } catch {}
  };

  const isValidUsername = (name: string) =>
    name.trim().length >= 2 &&
    /^[a-zA-Za-яА-Я0-9\s-]+$/.test(name.trim());

  const handleSubmit = useCallback((e: FormSubmitEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = username.trim();

    if (!trimmed) return setError('Введите имя');
    if (trimmed.length < 2) return setError('Имя должно быть не короче 2 символов');
    if (!isValidUsername(trimmed)) return setError('Имя содержит недопустимые символы');

    try {
      const users = loadUsers();
      const idx = users.findIndex(u => u.name === trimmed);
      const updated = [...users];

      if (idx !== -1) {
        updated[idx] = { ...users[idx], isLogined: true };
      } else {
        updated.push({ name: trimmed, isLogined: true });
      }

      saveUsers(updated);

      // Синхронизация избранного с Redux
      const user = updated.find(u => u.name === trimmed);
      if (user?.favorites) {
        dispatch(clearFavorites());
        user.favorites.forEach((film: any) => dispatch(addToFavorites(film)));
      }

      setUsername(trimmed);
      setUsernameLocal('');
      navigate('/');
    } catch {
      setError('Произошла ошибка при сохранении данных');
    }
  }, [username, setUsername, dispatch]);

  return (
    <>
      <TitleH1 title="Вход"/>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Ваше имя"
          name="login"
          value={username}
          onChange={(e: InputChangeEvent) => setUsernameLocal(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" disabled={!!error}>Войти в профиль</Button>
      </form>
    </>
  );
};

export default Login;
