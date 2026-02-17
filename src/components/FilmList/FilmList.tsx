import styles from './FilmList.module.css'

interface FilmListProps {
  children?: React.ReactNode;
}

function FilmList({ children }: FilmListProps) {

  return (
    <div className={styles['film-list']}>{children}</div>
  )
}

export default FilmList
