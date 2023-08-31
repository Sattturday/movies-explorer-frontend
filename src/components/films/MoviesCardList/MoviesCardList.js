import './MoviesCardList.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import { AppContext } from '../../../contexts/AppContext';
import { useContext } from 'react';

function MoviesCardList() {
  const app = useContext(AppContext);

  return (
    <section className="movies" aria-label="Фильмы">
      <div className="wrapper">
        <ul className="movies__list">
          {app.movies.map((movie) => (
            <MoviesCard
              key={movie._id}
              card={movie}
            />
          ))}
        </ul>
        <button className="movies__more" type="button">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;