import { BASE_URL_MOVIES } from './config';

export const parseMovies = (movies) =>
  movies.map((movie) => {
    const parsedMovie = {
      ...movie,
      movieId: movie.id,
      saved: false,
      img: movie.image ? BASE_URL_MOVIES + movie.image.url : '',
    };

    return parsedMovie;
  });