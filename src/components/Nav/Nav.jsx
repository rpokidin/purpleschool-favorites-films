import styles from './Nav.module.css'
import { useState, useEffect  } from 'react'

function Nav() {

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {

    const loadUser = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('user')) || []
        const loggedInUser = storedUsers.find(user => user.isLogined === true)
        setCurrentUser(loggedInUser)
      } catch (err) {
        console.error('Ошибка чтения из localStorage:', err)
        setCurrentUser(null)
      }
    }

    loadUser()

    window.addEventListener('storage', loadUser)

    return () => {
      window.removeEventListener('storage', loadUser)
    }
  }, [])

  const handleLogout = (e) => {

    e.preventDefault()
    
    try {
      const storedUsers = JSON.parse(localStorage.getItem('user')) || []
      
      const updatedUsers = storedUsers.map(user => 
        user.name === currentUser.name
          ? { ...user, isLogined: false }
          : user
      )

      localStorage.setItem('user', JSON.stringify(updatedUsers))
      
      setCurrentUser(null)
    } catch (err) {
      console.error('Ошибка при выходе из профиля:', err)
    }
  }

  return (
    <nav className={styles['nav']}>
      <ul>
        <li><a href="#">Поиск фильмов</a></li>
        <li><a href="#">Мои фильмы</a></li>
        {currentUser && (
          <li>
            <a href="#">
              {currentUser.name}
              <img src="/public/user-ico.svg" alt="Профиль пользователя" />
            </a>
          </li>
        )}
        <li>
          <a href="#" onClick={handleLogout}>Выйти</a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav