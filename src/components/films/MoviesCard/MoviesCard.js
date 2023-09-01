import './MoviesCard.scss';

function MoviesCard({ card, isSaved }) {
  return (
    <li className="card">

      {!card.saved ? (
        <button
          className="card__button card__button_type_saved"
          type="button"
        >Сохранить</button>
      ) : (
        <button
          className={`card__button card__button_type_unsaved${
            (isSaved && ' card__button_type_delete') || ''
          }`}
          type="button"
        ></button>
      )}

      <img
        className="card__image"
        src={card.img}
        alt={`Обложка фильма ${card.nameRU}`}
      />

      <div className="card__info">
        <h2 className="card__title">{card.nameRU}</h2>
        <span className="card__duration">{card.duration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
