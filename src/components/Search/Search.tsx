import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from './Search.module.css'
import { useState, ChangeEvent } from 'react';
import type { SearchProps } from './Search.props';

// Тип для события формы
type FormSubmitEvent = React.SyntheticEvent<HTMLFormElement>;

const Search = ({ onSearch, initialValue = '' }: SearchProps) => {

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: FormSubmitEvent) => {

    e.preventDefault()

    const query = searchValue.trim();

    if (!query) {
      console.log('Поле поиска пустое');
      return;
    }
    
    // Вызываем callback, если он передан
    if (onSearch) {
      onSearch(query);
    } else {
      // Поведение по умолчанию, если callback не передан
      console.log('Поиск:', query);
    }

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Input 
        ico="/public/search-ico.svg" 
        placeholder="Введите название"
        name="query"
        value={searchValue}
        onChange={handleChange}
      />
      <Button type="submit">Искать</Button>
    </form>
  )
}

export default Search
