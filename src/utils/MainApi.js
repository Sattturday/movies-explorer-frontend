import { BASE_URL_MAIN } from './utils';

const _checkAnswer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const _request = (url, options) => {
  return fetch(`${BASE_URL_MAIN}${url}`, options).then(_checkAnswer);
};

export const register = ({ email, password }) => {
  return _request('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
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

export const checkToken = () => {
  return _request('/users/me', {
    method: 'GET',
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

export const setUserInfo = ({ name, about }) => {
  return _request('/users/me', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const getCards = () => {
  return _request('/cards', {
    credentials: 'include',
  });
};

export const addCard = ({ name, link }) => {
  return _request('/cards', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

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

export const deleteCard = (cardId) => {
  return _request(`/cards/${cardId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
};

