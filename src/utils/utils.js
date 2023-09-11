import { BASE_URL_MOVIES } from './config';

export const performSearch = (searchValue, isShorts, movies) => {
  const keywords = searchValue.toLowerCase().split(' ');

  const searchedMovies = movies.filter((movie) => {
    const keywordsFound = keywords.some((keyword) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();
      return nameRU.includes(keyword) || nameEN.includes(keyword);
    });

    if (isShorts) {
      return keywordsFound && movie.duration <= 40;
    }

    return keywordsFound;
  });

  postDataLocal('searchedValues', { keywords: searchValue, isShorts: isShorts });
  postDataLocal('searchedMovies', parseMovies(searchedMovies));
  const storageEvent = new Event('storage');
  window.dispatchEvent(storageEvent);
};

export const parseMovies = (movies) =>
  movies.map((movie) => {
    const parsedMovie = {
      ...movie,
      movieId: movie.id,
      saved: false,
      image: movie.image ? BASE_URL_MOVIES + movie.image.url : '',
    };
    delete parsedMovie.id;
    delete parsedMovie.updated_at;
    return parsedMovie;
  });

export const postDataLocal = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export const getDataLocal = (key) => {
  const resultData = localStorage.getItem(key);
  return  JSON.parse(resultData);
};

export const convertDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  const resultDuration = hours ? `${hours}ч ${minutes}м` : `${minutes}мин`;

  return resultDuration;
};