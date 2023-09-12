import { BASE_URL_MAIN } from './config';

const _checkAnswer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const _request = (url, options) => {
  return fetch(`${BASE_URL_MAIN}${url}`, options).then(_checkAnswer);
};

// users
export const register = ({ name, email, password }) => {
  return _request('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = ({ email, password }) => {
  return _request('/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const logout = () => {
  return _request('/signout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const getUserInfo = () => {
  return _request('/users/me', {
    credentials: 'include',
  });
};

export const setUserInfo = ({ name, email }) => {
  return _request('/users/me', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  });
};

// cards
export const getSavedMovies = () => {
  return _request('/movies', {
    credentials: 'include',
  });
};

export const addMovie = (data) => {
  return _request('/movies', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      isSaved: true,
    }),
  });
};

export const deleteMovie = (movieId) => {
  return _request(`/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
};

// ...
const _addLikeCard = (id) => {
  return _request(`/cards/${id}/likes`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const _deleteLikeCard = (id) => {
  return _request(`/cards/${id}/likes`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const toggleLikeCard = (cardId, isLiked) => {
  if (isLiked) {
    return _deleteLikeCard(cardId);
  } else {
    return _addLikeCard(cardId);
  }
};

