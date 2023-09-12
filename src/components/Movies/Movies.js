import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { getMovies } from '../../utils/MoviesApi';
import { getDataLocal, performSearch, postDataLocal } from '../../utils/utils';
import Preloader from '../common/Preloader/Preloader';
import { errors } from '../../utils/data';

function Movies({onSaveMovie}) {
  const [sourceMovies, setSourceMovies] = useState([]);
  const [isShorts, setIsShorts] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [moviesMessage, setMoviesMessage] = useState('');

  useEffect(() => {
    const savedValues = getDataLocal('searchedValues');
    setSearchText(savedValues?.keywords || '');
    setIsShorts(savedValues?.isShorts || false);

    const beatMovies = getDataLocal('beatMovies');
    if (beatMovies && beatMovies.length > 0) {
      setSourceMovies(beatMovies);
    }
  }, []);

  useEffect(() => {
    if (searchText && sourceMovies.length === 0) {
      setIsContentLoading(true);
      Promise.all([getMovies()])
        .then(([beatMovies]) => {
          setSourceMovies(beatMovies);
          postDataLocal('beatMovies', beatMovies);
          performSearch(searchText, isShorts, beatMovies);
        })
        .catch((err) => {
          console.log(err);
          setMoviesMessage(errors.films.ERROR_MESSAGE);
        })
        .finally(() => setIsContentLoading(false));
    } else if (searchText) {
      performSearch(searchText, isShorts, sourceMovies);
    }
  }, [searchText, isShorts, sourceMovies]);

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
      />
      {isContentLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            moviesMessage={moviesMessage}
            setMoviesMessage={setMoviesMessage}
            onSaveMovie={onSaveMovie}
          />
          <button className="movies__more" type="button">Ещё</button>
        </>
      )}
    </main>
  );
}

export default Movies;
