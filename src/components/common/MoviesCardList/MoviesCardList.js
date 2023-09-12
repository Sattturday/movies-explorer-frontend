import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import { getDataLocal } from '../../../utils/utils';
import { errors } from '../../../utils/data';

function MoviesCardList({moviesMessage, setMoviesMessage, onSaveMovie}) {
  const location = useLocation();

  const [isSaved, setIsSaved] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      const movies = getDataLocal('searchedMovies');
      setMovies(movies);

      if (movies.length === 0) {
        setMoviesMessage(errors.films.SEARCH_NOT_FOUND_MESSAGE);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <section className="movies" aria-label="Список фильмов">
      <div className="wrapper">
        {moviesMessage ? (
          <p className="movies__message">{moviesMessage}</p>
        ) : (
          <ul className="movies__list">
            { movies.map((movie) => (
              <MoviesCard
                key={movie.cardId}
                card={movie}
                isSaved={isSaved}
                onSaveMovie={onSaveMovie}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;