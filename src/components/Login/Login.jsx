import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from './Login.module.css'
import { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username || username.trim().length < 2) {
      return
    }

    const trimmedName = username.trim()

    if (!/^[a-zA-Za-яА-Я0-9\s-]+$/.test(trimmedName)) {
      return;
    }

    try {
      const storedUsers = JSON.parse(localStorage.getItem('user')) || []

      const userIndex = storedUsers.findIndex(user => user.name === trimmedName)

      let updatedUsers

      if (userIndex !== -1) {
        updatedUsers = storedUsers.map(user =>
          user.name === trimmedName
            ? { ...user, isLogined: true }
            : user
        )
      } else {
        const newUser = {
          name: trimmedName,
          isLogined: true
        }
        updatedUsers = [...storedUsers, newUser]
      }

      localStorage.setItem('user', JSON.stringify(updatedUsers))

      window.dispatchEvent(new Event('storage'))

      setUsername('')
    } catch (err) {
      console.error('Ошибка работы с localStorage:', err);
    }

  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Input
        placeholder="Ваше имя"
        name="login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button name="Войти в профиль" type="submit" />
    </form>
  )
}

export default Login