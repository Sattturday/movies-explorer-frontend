import { useContext, useEffect, useState } from 'react';
import { getMovies } from '../../utils/MoviesApi';
import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import Preloader from '../common/Preloader/Preloader';
import { errors } from '../../utils/data';
import { AppContext } from '../../contexts/AppContext';
import {
  toggleFlagsAndId,
  getDataLocal,
  performSearch,
  postDataLocal,
  processMovies,
  saveSearchDataLocal,
} from '../../utils/utils';

function Movies({onSaveMovie, onDeleteMovie}) {
  const [isShorts, setIsShorts] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [moviesMessage, setMoviesMessage] = useState('');
  const [movies, setMovies] = useState([]); // результат поиска из лс

  const {savedMovies} = useContext(AppContext);

  // проверяем и устанавливаем состояние поиска
  useEffect(() => {
    const savedValues = getDataLocal('searchedValues');
    setSearchText(savedValues?.keywords || '');
    setIsShorts(savedValues?.isShorts || false);
  }, []);

  // обновляем 100 при изменении savedMovies
  useEffect(() => {
    const beatMovies = getDataLocal('beatMovies');
    if (beatMovies && beatMovies.length > 0) {
      const updatedMovies = toggleFlagsAndId(beatMovies, savedMovies);
      postDataLocal('beatMovies', updatedMovies);
    }
  }, [savedMovies]);

  // поиск при изменении searchText и isShorts
  useEffect(() => {
    const beatMovies = getDataLocal('beatMovies');

    if (searchText && !beatMovies) {
      setIsContentLoading(true);
      Promise.all([getMovies()])
        .then(([movies]) => {
          const enrichedMovies = processMovies(movies, savedMovies);
          postDataLocal('beatMovies', enrichedMovies);
          const searchedMovies = performSearch(searchText, isShorts, enrichedMovies);
          saveSearchDataLocal(searchedMovies, searchText, isShorts);
          setMovies(searchedMovies);
          setHasSubmitted(true);
        })
        .catch((err) => {
          console.log(err);
          setMoviesMessage(errors.films.ERROR_MESSAGE);
        })
        .finally(() => setIsContentLoading(false));
    } else if (searchText) {
      const searchedMovies = performSearch(searchText, isShorts, beatMovies);
      saveSearchDataLocal(searchedMovies, searchText, isShorts);
      setMovies(searchedMovies);
      setHasSubmitted(true);
    }
  }, [searchText, isShorts, savedMovies]);

  // запуск поиска
  const handleSearch = (values) => {
    setSearchText(values.search);
    setMoviesMessage('');
  };

  return (
    <main>
      <SearchForm
        onSearch={handleSearch}
        searchText={searchText}
        isShorts={isShorts}
        setIsShorts={setIsShorts}
        hasSubmitted={hasSubmitted}
      />
      {isContentLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            movies={movies}
            moviesMessage={moviesMessage}
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

