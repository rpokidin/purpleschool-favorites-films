import { Link } from 'react-router-dom';
import styles from './FilmCard.module.css';
import { FilmCardProps } from './FilmCard.props';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../store/favorites.slice';

export const FilmCard = ({ id, name, previewUrl, rating }: FilmCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '[]')
      .find((u: any) => u.isLogined);
    setIsFavorite(user?.favorites?.some((f: any) => f.id === id) || false);
  }, [id]);


  const toggleFavorite = () => {
    const filmId = Number(id);
    const film: FilmCardProps & { link: string } = {
      id: filmId,
      name,
      previewUrl,
      rating: rating ?? 0,
      link: `/movie/${id}` // Сохраняем link вместе с фильмом
    };

    dispatch(isFavorite ? removeFromFavorites({ id: filmId }) : addToFavorites(film));

    const users = JSON.parse(localStorage.getItem('user') || '[]');
    const userIndex = users.findIndex((u: any) => u.isLogined);

    if (userIndex !== -1) {
      const favorites = users[userIndex].favorites || [];
      users[userIndex].favorites = isFavorite
        ? favorites.filter((f: any) => f.id !== filmId)
        : [...favorites, film]; // film уже содержит link
      localStorage.setItem('user', JSON.stringify(users));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles['film-card']}>
      <Link to={`/movie/${id}`} className={styles['film-card__previewUrl']} style={{ backgroundImage: `url(${previewUrl})` }}>
        <div className={styles['film-card__rating']}>{rating}</div>
      </Link>
      <div className={styles['film-card__content']}>
        <Link to={`/movie/${id}`} className={styles['film-card__name']}>{name}</Link>
        <button
          className={`${styles['film-card__to-favorites']} ${isFavorite ? styles['film-card__to-favorites--active'] : ''}`}
          onClick={toggleFavorite}
        >
          <img src={isFavorite ? '/public/like-ico-filled.svg' : '/public/like-ico.svg'} alt={isFavorite ? 'В избранном' : 'В избранное'} />
          {isFavorite ? 'В избранном' : 'В избранное'}
        </button>
      </div>
    </div>
  );
};

export default FilmCard;
