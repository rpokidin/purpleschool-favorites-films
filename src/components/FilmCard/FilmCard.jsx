import './FilmCard.css'

function FilmCard({ imgUrl, title, rating = 0 }) {

  return (
    <div className='film-card'>
      <div 
        className='film-card__pic' 
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
        >
        <div className='film-card__rating'>{rating}</div>
      </div>
      <div className='film-card__content'>
        <div className='film-card__title'>{title}</div>
        <button className='film-card__btn'>
          <img src="/public/like-ico.svg" alt="В избранное" />
          В избранное
        </button>
      </div>
    </div>
  )
}

export default FilmCard
