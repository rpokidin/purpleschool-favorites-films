import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from './Search.module.css'
import { useState } from 'react';

function Search() {

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault()

    const query = searchValue.trim();

    if (!query) {
      console.log('Поле поиска пустое');
      return;
    }
    
    console.log('Поиск:', query);

  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Input 
        ico="/public/search-ico.svg" 
        placeholder="Введите название"
        name="query"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button name="Искать"/>
    </form>
  )
}

export default Search
