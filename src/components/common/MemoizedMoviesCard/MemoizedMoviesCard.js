import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MemoizedMoviesCard({ card, onSaveMovie, onDeleteMovie }) {
  const handleCardSave = useCallback((e) => {
    e.preventDefault();
    onSaveMovie(card);
  }, [card, onSaveMovie]);

  const handleCardDelete = useCallback((e) => {
    e.preventDefault();
    onDeleteMovie(card._id);
  }, [card, onDeleteMovie]);

  return useMemo(() => (
    <MoviesCard
      card={card}
      onSaveMovie={handleCardSave}
      onDeleteMovie={handleCardDelete}
    />
  ), [card, handleCardSave, handleCardDelete]);
}

export default MemoizedMoviesCard;