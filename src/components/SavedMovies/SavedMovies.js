import { useEffect, useState } from 'react';

import { performSearch, getDataLocal, isShortDuration } from '../../utils/utils';
import { errors } from '../../utils/data';
import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import Preloader from '../common/Preloader/Preloader';

function SavedMovies({savedMovies, onDeleteMovie}) {
  const [isShorts, setIsShorts] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [moviesMessage, setMoviesMessage] = useState('');

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (savedMovies.length !== 0) {
      setMovies(savedMovies);
    } else {
      setMovies(getDataLocal('savedMovies'));
    }
    setIsContentLoading(false);
  }, [savedMovies]);

  const handleSearch = (values) => {
    setSearchText(values.search);
    setMoviesMessage('');

    if (values.search) {
      const searchedMovies = performSearch(values.search, isShorts, savedMovies);
      setMovies(searchedMovies);

      if (searchedMovies.length === 0) {
        setMoviesMessage(errors.films.SEARCH_NOT_FOUND_MESSAGE);
      } else {
        setMoviesMessage('');
      }
    }

    if (!values.search ) {
      if (isShorts) {
        const shortMovies = movies.filter((movie) => isShortDuration(movie));
        setMovies(shortMovies);
      } else {
        setMovies(savedMovies);
      }

    }
  };

  return (
    <main>
      <SearchForm
        onSearch={handleSearch}
        searchText={searchText}
        isShorts={isShorts}
        setIsShorts={setIsShorts}
        hasSubmitted="true"
      />
      {isContentLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          moviesMessage={moviesMessage}
          onDeleteMovie={onDeleteMovie}
        />
      )}
    </main>
  );
}

export default SavedMovies;