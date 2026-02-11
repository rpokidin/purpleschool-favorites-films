import styles from './FilmCard.module.css'

function FilmCard({ imgUrl, title, rating = 0 }) {

  return (
    <div className={styles['film-card']}>
      <div 
        className={styles['film-card__pic']} 
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
        >
        <div className={styles['film-card__rating']}>{rating}</div>
      </div>
      <div className={styles['film-card__content']}>
        <div className={styles['film-card__title']}>{title}</div>
        <button className={styles['film-card__btn']}>
          <img src="/public/like-ico.svg" alt="В избранное" />
          В избранное
        </button>
      </div>
    </div>
  )
}

export default FilmCard
