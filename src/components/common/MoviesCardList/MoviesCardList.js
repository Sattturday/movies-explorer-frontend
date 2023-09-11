import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import { getDataLocal } from '../../../utils/utils';

function MoviesCardList() {
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
        console.log('пусто');
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
        <ul className="movies__list">
          { movies.map((movie) => (
            <MoviesCard
              key={movie.created_at}
              card={movie}
              isSaved={isSaved}
            />
          ))}
        </ul>
        {/* {!isSaved && (<button className="movies__more" type="button">Ещё</button>)} */}
      </div>
    </section>
  );
}

export default MoviesCardList;