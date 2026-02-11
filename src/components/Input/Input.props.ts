import { CSSProperties, ChangeEvent  } from 'react';

// Интерфейс для стиля — расширяет стандартные CSS-свойства React
export interface InputStyle extends CSSProperties {
  backgroundImage?: string,
  className?: string,
}

// Основной интерфейс пропсов компонента
export interface InputProps {
  ico?: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  // любые другие стандартные пропсы input
  [key: string]: any;
}