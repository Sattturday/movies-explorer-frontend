import { useEffect, useState } from 'react';

import { getMovies } from '../../utils/MoviesApi';
import Preloader from '../common/Preloader/Preloader';
import { errors } from '../../utils/data';
import {
  performSearch,
  toggleFlagsAndId,
  getDataLocal,
  postDataLocal,
  processMovies,
  saveSearchDataLocal,
  getVisibleMoviesCount,
  getLoadMoreCount,
  throttle,
} from '../../utils/utils';
import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';

function Movies({ savedMovies, onSaveMovie, onDeleteMovie }) {
  const [isShorts, setIsShorts] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [moviesMessage, setMoviesMessage] = useState('');

  const [movies, setMovies] = useState([]);

  // for resize
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleMovies, setVisibleMovies] = useState(getVisibleMoviesCount(windowWidth));
  const [loadMoreCount, setLoadMoreCount] = useState(getLoadMoreCount(windowWidth));

  useEffect(() => {
    // проверяем и устанавливаем состояние поиска
    const savedValues = getDataLocal('searchedValues');
    setSearchText(savedValues?.keywords || '');
    setIsShorts(savedValues?.isShorts || false);

    // for resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setVisibleMovies(getVisibleMoviesCount(window.innerWidth));
      setLoadMoreCount(getLoadMoreCount(window.innerWidth));
    };

    const throttleHandleResize = throttle(handleResize, 1000);

    window.addEventListener('resize', throttleHandleResize);

    return () => {
      window.removeEventListener('resize', throttleHandleResize);
    };
  }, []);

  // определяем количество отображаемых фильмов
  const visibleMovieList = movies.slice(0, visibleMovies);

  // при нажатии кнопки Ещё
  const loadMore = () => {
    setVisibleMovies((prev) => prev + loadMoreCount);
  };

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
          searchAndSaveMovies(enrichedMovies);
        })
        .catch((err) => {
          console.log(err);
          setMoviesMessage(errors.films.ERROR_MESSAGE);
        })
        .finally(() => setIsContentLoading(false));
    } else if (searchText) {
      searchAndSaveMovies(beatMovies);
    }
  }, [searchText, isShorts, savedMovies]);

  // функция поиска и сохранения результатов
  function searchAndSaveMovies(processMovies) {
    const searchedMovies = performSearch(searchText, isShorts, processMovies);

    if (searchedMovies.length === 0) {
      setMoviesMessage(errors.films.SEARCH_NOT_FOUND_MESSAGE);
    } else {
      setMoviesMessage('');
    }

    saveSearchDataLocal(searchedMovies, searchText, isShorts);
    setMovies(searchedMovies);
    setHasSubmitted(true);
  }

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
            movies={visibleMovieList}
            moviesMessage={moviesMessage}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
          />
          {visibleMovieList.length < movies.length && (
            <button className="movies__more" type="button" onClick={loadMore}>
              Ещё
            </button>
          )}

        </>
      )}
    </main>
  );
}

export default Movies;

