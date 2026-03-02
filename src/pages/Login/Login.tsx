
import styles from './Login.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useState, useContext, useCallback, SyntheticEvent, ChangeEvent } from 'react';
import { UserContext } from '../../context/user.context';
import type { LoginProps } from './Login.props';
import TitleH1 from '../../components/UniversalTitle/UniversalTitle';
import { useNavigate } from 'react-router-dom';

// Интерфейс для типа пользователя
interface User {
  name: string;
  isLogined: boolean;
}

// Алиас для события формы
export type FormSubmitEvent = SyntheticEvent<HTMLFormElement>;
// Алиас для событий изменения поля ввода (правильный тип для onChange)
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

const Login = ({}: LoginProps) => {
  const navigate = useNavigate()
  const [username, setLocalUsername] = useState('');
  const [error, setError] = useState('');
  
  const { setUsername } = useContext(UserContext);

  // Проверяет доступность localStorage в текущем окружении
  const canUseLocalStorage = (): boolean => {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };

  // Загружает массив пользователей из localStorage
  const loadUsers = (): User[] => {
    try {
      const stored = localStorage.getItem('user');
      // Проверка на null перед парсингом
      if (stored === null) {
        return [];
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error('Ошибка чтения из localStorage:', err);
      return [];
    }
  };

  // Сохраняет массив пользователей в localStorage
  const saveUsers = (users: User[]): void => {
    try {
      localStorage.setItem('user', JSON.stringify(users));
    } catch (err) {
      console.error('Ошибка записи в localStorage:', err);
      throw err;
    }
  };

  // Валидирует имя пользователя:
  const isValidUsername = (name: string): boolean => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return false;
    return /^[a-zA-Za-яА-Я0-9\s-]+$/.test(trimmed);
  };

  // Обработчик отправки формы с мемоизацией через useCallback
  const handleSubmit = useCallback((e: FormSubmitEvent) => {
    e.preventDefault();
    setError('');

    // Проверка на пустое значение или пробелы
    if (!username || !username.trim()) {
      setError('Введите имя');
      return;
    }

    const trimmedName = username.trim();

    // Проверка длины имени
    if (trimmedName.length < 2) {
      setError('Имя должно быть не короче 2 символов');
      return;
    }

    // Проверка допустимых символов
    if (!isValidUsername(trimmedName)) {
      setError('Имя содержит недопустимые символы');
      return;
    }

    // Проверка доступности localStorage
    if (!canUseLocalStorage()) {
      setError('localStorage недоступен. Попробуйте другой браузер.');
      return;
    }

    try {
      // Загружаем текущих пользователей
      const storedUsers = loadUsers();
      // Ищем индекс пользователя с таким именем
      const userIndex = storedUsers.findIndex(user => user.name === trimmedName);

      // Создаем новый массив пользователей
      const updatedUsers = [...storedUsers];
      
      if (userIndex !== -1) {
        // Если пользователь найден - обновляем его статус isLogined
        updatedUsers[userIndex] = { ...storedUsers[userIndex], isLogined: true };
      } else {
        // Если пользователя нет - добавляем нового
        updatedUsers.push({ name: trimmedName, isLogined: true });
      }

      // Сохраняем обновленный массив в localStorage
      saveUsers(updatedUsers);
      // Обновляем глобальное состояние username
      setUsername(trimmedName);
      // Очищаем поле ввода
      setLocalUsername('');
      navigate('/')
      
    } catch (err) {
      // Обработка ошибок работы с localStorage
      console.error('Ошибка работы с localStorage:', err);
      setError('Произошла ошибка при сохранении данных');
    }
  }, [username, setUsername, setError]);

  return (
    <>
    <TitleH1 title="Вход"/>
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Input
        placeholder="Ваше имя"
        name="login"
        value={username}
         onChange={(e: InputChangeEvent) => setLocalUsername(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button
        type="submit"
        disabled={!!error}
      >Войти в профиль</Button>
    </form>
    </>
  );
}

export default Login;
