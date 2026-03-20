import styles from './Login.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useState, useCallback, SyntheticEvent, ChangeEvent } from 'react';
import type { LoginProps } from './Login.props';
import TitleH1 from '../../components/UniversalTitle/UniversalTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFavorites, addToFavorites } from '../../store/favorites.slice';
import { setUsername } from '../../store/user.slice';

type FormSubmitEvent = SyntheticEvent<HTMLFormElement>;
type InputChangeEvent = ChangeEvent<HTMLInputElement>;

const Login = ({}: LoginProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsernameLocal] = useState('');
  const [error, setError] = useState('');

  // Вспомогательные функции для работы с localStorage — берём из user.slice.ts
  const canUseLocalStorage = (): boolean => {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };

  const loadUsers = (): LoginProps[] => {
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

  const saveUsers = (users: LoginProps[]): boolean => {
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
    const users = loadUsers(); // используем импортированную функцию
    const userIndex = users.findIndex((u) => u.name === trimmed);

    let updatedUsers: LoginProps[]; // тип User вместо LoginProps

    if (userIndex !== -1) {
      updatedUsers = users.map((u) =>
        u.name === trimmed ? { ...u, isLogined: true } : u
      );
    } else {
      updatedUsers = [...users, { name: trimmed, isLogined: true }];
    }

    saveUsers(updatedUsers); // используем импортированную функцию

    // Синхронизация избранного с Redux
    const currentUser = updatedUsers.find((u) => u.name === trimmed);
    if (currentUser?.favorites) {
      dispatch(clearFavorites());
      currentUser.favorites.forEach((film: any) => dispatch(addToFavorites(film)));
    }

    dispatch(setUsername(trimmed));
    setUsernameLocal('');
    navigate('/');
  } catch (err) {
    console.error('Произошла ошибка при сохранении данных:', err);
    setError('Произошла ошибка при сохранении данных');
  }
}, [username, dispatch]);

  return (
    <>
      <TitleH1 title="Вход" />
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
