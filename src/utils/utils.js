import { BASE_URL_MOVIES } from './config';
import { moreCards } from './data';

// search
export const performSearch = (searchValue, isShorts, movies) => {
  const keywords = searchValue.toLowerCase().split(' ');

  const searchedMovies = movies.filter((movie) => {
    const keywordsFound = keywords.some((keyword) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();
      return nameRU.includes(keyword) || nameEN.includes(keyword);
    });

    return keywordsFound && (isShorts ? isShortDuration(movie) : true);
  });

  return searchedMovies;
};

// isShort
export const isShortDuration = (movie) => {
  return movie.duration <= 40;
};

// сохранение поисковых данных и результатов в лс
export const saveSearchDataLocal = (searchedMovies, searchValue, isShorts) => {
  postDataLocal('searchedValues', { keywords: searchValue, isShorts: isShorts });
  postDataLocal('searchedMovies', searchedMovies);
};

// генерируем ID
const generateUniqueId = () => {
  const randomValue = Math.random().toString(16).slice(2, 14);;
  return randomValue;
};

// Функция для парсинга 100
const parseMovies = (movies) => {
  const parsedMovies = movies.map((movie) => {
    const parsedMovie = {
      ...movie,
      cardId: generateUniqueId(),
      image: movie.image ? BASE_URL_MOVIES + movie.image.url : '',
    };
    delete parsedMovie.id;
    delete parsedMovie.updated_at;
    return parsedMovie;
  });
  return parsedMovies;
};

export const toggleFlagsAndId = (movies, savedMovies) => {
  return movies.map((movie) => {
    const savedMovie = savedMovies.find((savedMovie) => movie.nameRU === savedMovie.nameRU);

    if (savedMovie) {
      movie._id = savedMovie._id;
      movie.isSaved = true;
    } else {
      movie.isSaved = false;
      delete movie._id;
    }

    return movie;
  });
};

// Для первой обработки 100
export const processMovies = (movies, savedMovies) => {
  const processedMovies = parseMovies(movies);
  return toggleFlagsAndId(processedMovies, savedMovies);
};

// для работы с Local Storage
export const postDataLocal = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export const getDataLocal = (key) => {
  const resultData = localStorage.getItem(key);
  return  JSON.parse(resultData);
};

// Преобразование длительности фильма
export const convertDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  const resultDuration = hours ? `${hours}ч ${minutes}м` : `${minutes}мин`;

  return resultDuration;
};

// decorator
export function throttle(callee, timeout) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

export const getVisibleMoviesCount = (width) => {
  if (width >= moreCards.large.width) {
    return moreCards.large.rows * moreCards.large.cards;
  } else if (width >= moreCards.medium.width) {
    return moreCards.medium.rows * moreCards.medium.cards;
  } else if (width >= moreCards.small.width) {
    return moreCards.small.rows * moreCards.small.cards;
  }
};

export const getLoadMoreCount = (width) => {
  if (width >= moreCards.large.width) {
    return moreCards.large.more * moreCards.large.cards;
  } else if (width >= moreCards.medium.width) {
    return moreCards.medium.more * moreCards.medium.cards;
  } else if (width >= moreCards.small.width) {
    return moreCards.small.more * moreCards.small.cards;
  }
};
