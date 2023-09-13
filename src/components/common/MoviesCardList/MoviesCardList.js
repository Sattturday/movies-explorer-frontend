import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.scss';

function MoviesCardList({
  movies,
  moviesMessage,
  onSaveMovie,
  onDeleteMovie,
}) {
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
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;

