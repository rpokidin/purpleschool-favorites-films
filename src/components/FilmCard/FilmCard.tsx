import { Link } from 'react-router-dom'
import styles from './FilmCard.module.css'
import { FilmCardProps } from './FilmCard.props'

export const FilmCard = (props: FilmCardProps) => {

  return (
    <Link to={`/movie/${props.id}`} className={styles['film-card']}>
      <div 
        className={styles['film-card__previewUrl']} 
        style={{
          backgroundImage: `url(${props.previewUrl})`,
        }}
        >
        <div className={styles['film-card__rating']}>{props.rating}</div>
      </div>
      <div className={styles['film-card__content']}>
        <div className={styles['film-card__name']}>{props.name}</div>
        <button className={styles['film-card__to-favorites']}>
          <img src="/public/like-ico.svg" alt="В избранное" />
          В избранное
        </button>
      </div>
    </Link>
  )
}

export default FilmCard
