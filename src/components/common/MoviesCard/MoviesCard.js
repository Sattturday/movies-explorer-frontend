import { useLocation } from 'react-router-dom';
import { convertDuration } from '../../../utils/utils';
import './MoviesCard.scss';

function MoviesCard({ card, onSaveMovie, onDeleteMovie }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  function handleCardSave(e) {
    e.preventDefault();

    onSaveMovie(card);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    onDeleteMovie(card._id);
  }

  return (
    <li className="card">
      <a
        className="card__link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        {!card.isSaved ? (
          <button
            className="card__button card__button_type_saved"
            type="button"
            onClick={handleCardSave}
          >Сохранить</button>
        ) : (
          <button
            className={`card__button card__button_type_unsaved${
              (isSavedMoviesPage && ' card__button_type_delete') || ''
            }`}
            type="button"
            onClick={handleCardDelete}
          ></button>
        )}

        <img
          className="card__image"
          src={card.image}
          alt={`Обложка фильма ${card.nameRU}`}
        />

        <div className="card__info">
          <h2 className="card__title">{card.nameRU}</h2>
          <span className="card__duration">{convertDuration(card.duration)}</span>
        </div>
      </a>
    </li>
  );
}

export default MoviesCard;
