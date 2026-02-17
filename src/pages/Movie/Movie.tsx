import { useLoaderData, useParams } from "react-router-dom"
import UniversalTitle from "../../components/UniversalTitle/UniversalTitle";
import styles from './Movie.module.css'
import { textCapitalize, formatDateOnly, formatArray } from "../../helpers/movieHelpers";
import { MovieData } from "./Movie.props";

const Movie = () => {

  const data = useLoaderData() as MovieData;

  if (!data) {
    return <div>Загрузка...</div>;
  }
  
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
              <button className={styles['movie__to-favorites']}>
                <img src="/public/like-ico.svg" alt="В избранное" />
                В избранное
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