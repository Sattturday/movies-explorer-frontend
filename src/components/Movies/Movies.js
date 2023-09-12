import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import { useContext, useEffect, useState } from 'react';
import { getMovies } from '../../utils/MoviesApi';
import {toggleFlagsAndId, getDataLocal, performSearch, postDataLocal, processMovies } from '../../utils/utils';
import Preloader from '../common/Preloader/Preloader';
import { errors } from '../../utils/data';
import { AppContext } from '../../contexts/AppContext';

function Movies({onSaveMovie, onDeleteMovie}) {
  const [sourceMovies, setSourceMovies] = useState([]); // храним сотню для поиска
  const [isShorts, setIsShorts] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [moviesMessage, setMoviesMessage] = useState('');
  const [movies, setMovies] = useState([]); // рез-т поиска из лс

  const {savedMovies} = useContext(AppContext);

  // проверяем и устанавливаем состояние поиска
  useEffect(() => {
    const savedValues = getDataLocal('searchedValues');
    setSearchText(savedValues?.keywords || '');
    setIsShorts(savedValues?.isShorts || false);

    const beatMovies = getDataLocal('beatMovies');
    if (beatMovies && beatMovies.length > 0) {
      setSourceMovies(beatMovies);
    }
  }, []);

  // обновляем 100 при изменении savedMovies
  useEffect(() => {
    const beatMovies = getDataLocal('beatMovies');
    if (beatMovies && beatMovies.length > 0) {
      const updatedMovies = toggleFlagsAndId(beatMovies, savedMovies);
      postDataLocal('beatMovies', updatedMovies);
      setSourceMovies(updatedMovies);
    }
  }, [savedMovies]);

  // поиск при изменении searchText и isShorts
  useEffect(() => {
    if (searchText && sourceMovies.length === 0) {
      setIsContentLoading(true);
      Promise.all([getMovies()])
        .then(([beatMovies]) => {
          const enrichedMovies = processMovies(beatMovies, savedMovies);
          setSourceMovies(enrichedMovies);
          postDataLocal('beatMovies', enrichedMovies);
          performSearch(searchText, isShorts, enrichedMovies);
        })
        .catch((err) => {
          console.log(err);
          setMoviesMessage(errors.films.ERROR_MESSAGE);
        })
        .finally(() => setIsContentLoading(false));
    } else if (searchText) {
      performSearch(searchText, isShorts, sourceMovies);
    }
  }, [searchText, isShorts, sourceMovies, savedMovies]);

  // запуск поиска
  const handleSearch = (values) => {
    setSearchText(values.search);
    setMoviesMessage('');
  };

  // обработка изменений локал 'searchedMovies'
  const handleStorageChange = () => {
    const movies = getDataLocal('searchedMovies');
    setMovies(movies);

    if (movies.length === 0) {
      setMoviesMessage(errors.films.SEARCH_NOT_FOUND_MESSAGE);
    }
  };

  return (
    <main>
      <SearchForm
        onSearch={handleSearch}
        searchText={searchText}
        isShorts={isShorts}
        setIsShorts={setIsShorts}
      />
      {isContentLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            movies={movies}
            moviesMessage={moviesMessage}
            handleStorageChange={handleStorageChange}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
          />
          <button className="movies__more" type="button">Ещё</button>
        </>
      )}
    </main>
  );
}

export default Movies;

