import styles from './FilmList.module.css'

function FilmList({ children }) {

  return (
    <div className={styles['film-list']}>{children}</div>
  )
}

export default FilmList
