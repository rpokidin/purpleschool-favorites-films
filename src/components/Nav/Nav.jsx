import styles from './Nav.module.css'

function Nav() {

  return (
    <nav className={styles['nav']}>
      <ul>
        <li><a href="#">Поиск фильмов</a></li>
        <li><a href="#">Мои фильмы</a></li>
        <li><a href="#">User</a></li>
        <li><a href="#">Выйти</a></li>
      </ul>
    </nav>
  )
}

export default Nav
