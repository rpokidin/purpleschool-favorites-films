import Paragraph from '../../components/Paragraph/Paragraph';
import Search from '../../components/Search/Search';
import FilmList from '../../components/FilmList/FilmList';
import FilmCard from '../../components/FilmCard/FilmCard';
import { API_KEY, PREFIX } from '../../helpers/API';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FilmCardProps } from '../../components/FilmCard/FilmCard.props';
import UniversalTitle from '../../components/UniversalTitle/UniversalTitle';

const Main = () => {
  const [films, setFilms] = useState<FilmCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getFilms = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${PREFIX}search?query=${encodeURIComponent(query)}`,
        {
          headers: {
            'X-API-Key': API_KEY
          }
        }
      );

      if (res.data.docs && Array.isArray(res.data.docs)) {
        const transformedFilms: FilmCardProps[] = res.data.docs.map((item: any) => ({
          id: item.id || '',
          name: item.name || item.title || 'Без названия',
          previewUrl: item.poster?.previewUrl || item.posterUrl || '/public/no-image.gif',
          rating: item.rating?.imdb || item.rating?.kp || undefined
        }));
        setFilms(transformedFilms);
      } else {
        setError('Фильмы не найдены');
      }
    } catch (error) {
      setError('Ошибка при загрузке фильмов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getFilms(searchQuery);
    } else {
      setFilms([]);
      setError(null);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <UniversalTitle title="Поиск" />
      <Paragraph
        text="Введите название фильма, сериала или мультфильма для поиска и добавления в избранное."
      />
      <Search onSearch={handleSearch} />

      <FilmList>
        {loading && <div>Загрузка фильмов...</div>}

        {error && <div className="error">Ошибка: {error}</div>}

        {searchQuery && films.length > 0 ? (
          films.map(film => (
            <FilmCard
              key={film.id}
              id={film.id}
              name={film.name}
              previewUrl={film.previewUrl}
              rating={film.rating}
            />
          ))
        ) : (
          searchQuery && !loading && !error && (
            <p>По запросу "{searchQuery}" ничего не найдено</p>
          )
        )}
      </FilmList>
    </>
  );
};

export default Main;
