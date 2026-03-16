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

  useEffect(() => {
    if (!searchQuery) {
      setFilms([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    axios.get(`${PREFIX}search?query=${encodeURIComponent(searchQuery)}`, {
      headers: { 'X-API-Key': API_KEY }
    })
      .then(res => {
        if (res.data.docs?.length) {
          setFilms(res.data.docs.map((item: any) => ({
            id: item.id || '',
            name: item.name || item.title || 'Без названия',
            previewUrl: item.poster?.previewUrl || item.posterUrl || '/public/no-image.gif',
            rating: item.rating?.imdb || item.rating?.kp || undefined
          })));
        } else {
          setError('Фильмы не найдены');
        }
      })
      .catch(() => setError('Ошибка при загрузке фильмов'))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <>
      <UniversalTitle title="Поиск" />
      <Paragraph text="Введите название фильма, сериала или мультфильма для поиска и добавления в избранное." />
      <Search onSearch={setSearchQuery} />
      {loading && <div>Загрузка...</div>}
      {error && <div>{error}</div>}
      <FilmList>
        {films.map(film => (
          <FilmCard key={film.id} {...film} />
        ))}
      </FilmList>
      {!loading && !error && films.length === 0 && searchQuery && (
        <div className='t-ac'>
          <UniversalTitle title="Упс... Ничего не найдено" />
          <Paragraph text="Попробуйте изменить запрос или ввести более точное название фильма" />
        </div>
      )}
    </>
  );
};

export default Main;
