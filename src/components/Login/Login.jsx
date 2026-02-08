import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Login.module.css';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(''); // Для отображения ошибок

  // Валидация имени пользователя
  const isValidUsername = (name) => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return false;
    // Разрешаем: буквы (англ./рус.), цифры, пробелы, дефисы
    return /^[a-zA-Za-яА-Я0-9\s-]+$/.test(trimmed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Сброс ошибки перед проверкой

    if (!isValidUsername(username)) {
      setError('Имя короче 2 символов и содержать не допустимые символы');
      return;
    }

    const trimmedName = username.trim();

    try {
      // Чтение пользователей из localStorage
      const storedUsers = JSON.parse(localStorage.getItem('user')) || [];

      // Поиск пользователя по имени
      const userIndex = storedUsers.findIndex(user => user.name === trimmedName);

      let updatedUsers;

      if (userIndex !== -1) {
        // Если пользователь найден — обновляем isLogined
        updatedUsers = storedUsers.map(user =>
          user.name === trimmedName
            ? { ...user, isLogined: true }
            : user
        );
      } else {
        // Если пользователя нет — добавляем нового
        updatedUsers = [
          ...storedUsers,
          { name: trimmedName, isLogined: true }
        ];
      }

      // Запись в localStorage
      localStorage.setItem('user', JSON.stringify(updatedUsers));

      // Устанавливаем username в контекст
      setUsername(trimmedName);

      // Сигнализируем другим компонентам об изменении (опционально)
      window.dispatchEvent(new Event('storage'));

      // Очистка поля ввода
      setUsername('');

    } catch (err) {
      console.error('Ошибка работы с localStorage:', err);
      setError('Произошла ошибка при сохранении данных');
    }
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Input
        placeholder="Ваше имя"
        name="login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      {/* Вывод ошибки, если есть */}
      {error && <p className={styles.error}>{error}</p>}
      
      <Button name="Войти в профиль" type="submit" />
    </form>
  );
}

export default Login;
