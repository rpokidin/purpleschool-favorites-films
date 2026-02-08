import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Login.module.css';
import { useState, useContext, useCallback } from 'react';
import { UserContext } from '../../context/user.context';

function Login() {
  // Локальное состояние для значения поля ввода
  const [username, setLocalUsername] = useState('');
  // Локальное состояние для отображения ошибок валидации
  const [error, setError] = useState('');

  // Получаем функцию обновления глобального состояния username из контекста
  const { setUsername } = useContext(UserContext);

  // Проверяет доступность localStorage в текущем окружении
  const canUseLocalStorage = () => {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };

  // Загружает массив пользователей из localStorage
  const loadUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('user')) || [];
    } catch (err) {
      console.error('Ошибка чтения из localStorage:', err);
      return [];
    }
  };

  // Сохраняет массив пользователей в localStorage
  const saveUsers = (users) => {
    try {
      localStorage.setItem('user', JSON.stringify(users));
    } catch (err) {
      console.error('Ошибка записи в localStorage:', err);
      throw err;
    }
  };

  // Валидирует имя пользователя:
  const isValidUsername = (name) => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return false;
    return /^[a-zA-Za-яА-Я0-9\s-]+$/.test(trimmed);
  };

  // Обработчик отправки формы с мемоизацией через useCallback
  const handleSubmit = useCallback((e) => {
    e.preventDefault(); // Отменяем стандартное поведение формы
    setError(''); // Сбрасываем предыдущую ошибку

    // Проверка на пустое значение или пробелы
    if (!username || !username.trim()) {
      setError('Введите имя');
      return;
    }

    const trimmedName = username.trim(); // Обрезаем пробелы

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
      
    } catch (err) {
      // Обработка ошибок работы с localStorage
      console.error('Ошибка работы с localStorage:', err);
      setError('Произошла ошибка при сохранении данных');
    }
  }, [username, setUsername, setError]); // Зависимости хука useCallback

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Input
        placeholder="Ваше имя"
        name="login"
        value={username} // Текущее значение из локального состояния
        onChange={(e) => setLocalUsername(e.target.value)} // Обновляем локальное состояние при вводе
      />
      {/* Отображаем сообщение об ошибке, если оно есть */}
      {error && <p className={styles.error}>{error}</p>}
      <Button
        name="Войти в профиль"
        type="submit"
        disabled={!!error} // Блокируем кнопку при наличии ошибки
      />
    </form>
  );
}

export default Login;
