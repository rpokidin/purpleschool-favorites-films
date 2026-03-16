import { useSelector, useDispatch } from 'react-redux';
import FilmList from '../../components/FilmList/FilmList';
import FilmCard from '../../components/FilmCard/FilmCard';
import { FilmCardProps } from '../../components/FilmCard/FilmCard.props';
import UniversalTitle from '../../components/UniversalTitle/UniversalTitle';
import Paragraph from '../../components/Paragraph/Paragraph';
import { addToFavorites, clearFavorites } from '../../store/favorites.slice';
import { useEffect, useState } from 'react';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.films);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    try {
      const users = JSON.parse(localStorage.getItem('user') || '[]');
      const user = users.find((u: any) => u.isLogined);
      const films: FilmCardProps[] = user?.favorites || [];

      dispatch(clearFavorites());
      
      const unique = [...new Map(films.map((f: FilmCardProps) => [f.id, f])).values()];
      unique.forEach((f: FilmCardProps) => dispatch(addToFavorites(f)));
    } catch (e) {
      console.error('Sync error:', e);
      dispatch(clearFavorites());
    } finally {
      setInitialized(true);
    }
  }, [dispatch, initialized]);

  return (
    <div>
      <UniversalTitle title="Избранное" />
      {favorites.length ? (
        <FilmList>
          {favorites.map((film: FilmCardProps) => (
            <FilmCard
              key={film.id}
              id={film.id}
              name={film.name}
              previewUrl={film.previewUrl}
              rating={film.rating}
              link={film.link}
            />
          ))}
        </FilmList>
      ) : (
        <Paragraph text="Добавьте фильмы в избранное, чтобы они появились здесь" />
      )}
    </div>
  );
};

export default Favorites;
