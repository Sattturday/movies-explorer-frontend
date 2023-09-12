import { BASE_URL_MOVIES } from './config';

// поиск по ключевым словам и переключателю короткометражек
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
  postDataLocal('searchedMovies', searchedMovies);
  const storageEvent = new Event('storage');
  window.dispatchEvent(storageEvent);
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
    console.log(parsedMovie.cardId);
    return parsedMovie;
  });
  return parsedMovies;
};

// Функция для добавления флага isSaved и movieId

// export const addFlagsAndIds = (movies, savedMovies) => {
//   return movies.map((movie) => {
//     const isSaved = savedMovies.some((savedMovie) => savedMovie.nameRU === movie.nameRU);

//     if (isSaved) {
//       const savedMovie = savedMovies.find((savedMovie) => movie.nameRU === savedMovie.nameRU);
//       movie.movieId = savedMovie._id;
//     }

//     return { ...movie, isSaved };
//   });
// };

export const toggleFlagsAndId = (movies, savedMovies) => {
  return movies.map((movie) => {
    const savedMovie = savedMovies.find((savedMovie) => movie.nameRU === savedMovie.nameRU);

    if (savedMovie) {
      // Если найдена соответствующая карточка в savedMovies, устанавливаем флаг isSaved в true
      movie._id = savedMovie._id;
      movie.isSaved = true;
    } else {
      // Если карточка не найдена в savedMovies, устанавливаем флаг isSaved в false
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
