import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import { AppContext } from '../../../contexts/AppContext';

function MoviesCardList() {
  const location = useLocation();
  const app = useContext(AppContext);

  const [isSaved, setIsSaved] = useState('');

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [location]);

  return (
    <section className="movies" aria-label="Фильмы">
      <div className="wrapper">
        <ul className="movies__list">
          {isSaved ? (
            app.movies
              .filter((movie) => movie.saved === true)
              .map((movie) => (
                <MoviesCard
                  key={movie._id}
                  card={movie}
                  isSaved={isSaved}
                />
              ))
          ) : (
            app.movies.map((movie) => (
              <MoviesCard
                key={movie._id}
                card={movie}
                isSaved={isSaved}
              />
            ))
          )}
        </ul>
        {!isSaved && (<button className="movies__more" type="button">Ещё</button>)}
      </div>
    </section>
  );
}

export default MoviesCardList;