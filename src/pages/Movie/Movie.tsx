import { useLoaderData, useNavigate } from "react-router-dom";
import UniversalTitle from "../../components/UniversalTitle/UniversalTitle";
import styles from './Movie.module.css';
import { textCapitalize, formatDateOnly, formatArray } from "../../helpers/movieHelpers";
import { MovieData } from "./Movie.props";
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../store/favorites.slice';
import { FilmCardProps } from "../../components/FilmCard/FilmCard.props";

const Movie = () => {
  const data = useLoaderData() as MovieData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем список избранного из Redux
  const favorites = useSelector((state: any) => state.favorites.films);

  // Проверяем, есть ли фильм в избранном (и в Redux, и в localStorage)
  const isInFavorites = () => {
    // Проверка в Redux — приводим id к числу для сравнения
    const inRedux = favorites.some((film: any) => {
      const filmId = typeof film.id === 'string' ? parseInt(film.id, 10) : film.id;
      return filmId === data.id;
    });
    
    // Дополнительная проверка в localStorage
    try {
      const saved = localStorage.getItem('favorites');
      if (saved) {
        const localFavorites = JSON.parse(saved);
        const inLocalStorage = localFavorites.some((film: any) => {
          const filmId = typeof film.id === 'string' ? parseInt(film.id, 10) : film.id;
          return filmId === data.id;
        });
        return inRedux || inLocalStorage;
      }
    } catch (error) {
      console.error('Error checking localStorage favorites:', error);
    }
    
    return inRedux;
  };

  if (!data) {
    return <div>Загрузка...</div>;
  }

  // Обработчик клика
  const handleToggleFavorite = () => {
    if (isInFavorites()) {
      // Удаляем из избранного
      dispatch(removeFromFavorites({ id: data.id }));
      
      // Обновляем localStorage
      try {
        const saved = localStorage.getItem('favorites');
        if (saved) {
          const localFavorites = JSON.parse(saved);
          const updatedFavorites = localFavorites.filter((film: any) => {
            const filmId = typeof film.id === 'string' ? parseInt(film.id, 10) : film.id;
            return filmId !== data.id;
          });
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
        // Редирект на страницу избранного
        navigate('/favorites');
      } catch (error) {
        console.error('Error updating localStorage:', error);
        navigate('/favorites'); // Всё равно делаем редирект
      }
    } else {
      // Добавляем в избранное — создаём объект, полностью соответствующий FilmCardProps
      const favoriteFilm: FilmCardProps = {
        id: data.id,
        previewUrl: data.poster?.previewUrl || '',
        link: `/movie/${data.id}`,
        name: data.name || 'Неизвестно', // обязательное поле
        rating: data.rating?.imdb || 0 // обязательное поле, используем rating.imdb или 0 по умолчанию
      };
      dispatch(addToFavorites(favoriteFilm));

      // Обновляем localStorage
      try {
        const saved = localStorage.getItem('favorites');
        const currentFavorites = saved ? JSON.parse(saved) : [];
        const updatedFavorites = [...currentFavorites, data];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  };

  return (
    <>
      <div className={styles['movie']}>
        {data.poster?.previewUrl && (
          <div
            className={styles['movie__previewUrl']}
            style={{
              backgroundImage: `url(${data.poster.previewUrl})`,
            }}
          ></div>
        )}
        <div className={styles['movie__body']}>
          <UniversalTitle
            title={data.name}
            level={3}
          />
          {data.description && (
            <div className={styles['movie__desc']}>{data.description}</div>
          )}
          <div className="d-flex d-aic">
            {data.rating?.imdb !== undefined && (
              <div className={styles['movie__rating']}>{data.rating.imdb}</div>
            )}
            <div>
              <button
                className={`${styles['movie__to-favorites']} ${isInFavorites() ? styles['movie__to-favorites--active'] : ''}`}
                onClick={handleToggleFavorite}
                aria-pressed={isInFavorites()}
              >
                <img
                  src={isInFavorites() ? "/public/like-ico-filled.svg" : "/public/like-ico.svg"}
                  alt={isInFavorites() ? "Удалить из избранного" : "В избранное"}
                />
                {isInFavorites() ? "В избранном" : "В избранное"}
              </button>
            </div>
          </div>
          <div className={styles['movie__line']}>
            <div className={styles['movie__line-title']}>Тип</div>
            <div className={styles['movie__line-body']}>
              {data.type ? textCapitalize(data.type) : 'Не указан'}
            </div>
          </div>
          <div className={styles['movie__line']}>
            <div className={styles['movie__line-title']}>Дата выхода</div>
            <div className={styles['movie__line-body']}>
              {data.premiere?.world ? formatDateOnly(data.premiere.world) : 'Не указана'}
            </div>
          </div>
          <div className={styles['movie__line']}>
            <div className={styles['movie__line-title']}>Длительность</div>
            <div className={styles['movie__line-body']}>
              {data.movieLength ? `${data.movieLength} мин` : 'Не указана'}
            </div>
          </div>
          <div className={styles['movie__line']}>
            <div className={styles['movie__line-title']}>Жанр</div>
            <div className={styles['movie__line-body']}>{formatArray(data.genres)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
