import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  // Получаем данные из localStorage
  const usersJson = localStorage.getItem('user');
  
  // Проверяем, есть ли данные в localStorage
  if (!usersJson) {
    return <Navigate to='/login' replace />;
  }
  
  try {
    // Парсим JSON из localStorage
    const users = JSON.parse(usersJson);
    
    // Проверяем, что это массив
    if (!Array.isArray(users)) {
      return <Navigate to='/login' replace />;
    }
    
    // Ищем хотя бы одного пользователя с isLogined: true
    const isAnyUserLoggedIn = users.some(user =>
      user.isLogined === true
    );
    
    // Если есть хотя бы один авторизованный пользователь — показываем контент
    if (isAnyUserLoggedIn) {
      return children;
    }
    
    // Иначе перенаправляем на страницу входа
    return <Navigate to='/login' replace />;
  } catch (error) {
    console.error('Ошибка при проверке авторизации:', error);
    // При ошибке парсинга тоже перенаправляем на вход
    return <Navigate to='/login' replace />;
  }
};
