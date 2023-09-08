import { BASE_URL_MOVIES } from './config';

const _checkAnswer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const _request = (url, options) => {
  return fetch(`${BASE_URL_MOVIES}${url}`, options).then(_checkAnswer);
};

export const getMovies = () => {
  return _request('/beatfilm-movies', {
    credentials: 'omit',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
