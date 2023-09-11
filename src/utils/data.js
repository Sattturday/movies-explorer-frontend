export const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]*$/;
export const emailRegex = /^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$/;

export const errors = {
  common: {
    BAD_REQUEST_MESSAGE: 'Необходима авторизация',
    ERROR_MESSAGE: 'Что-то пошло не так! Попробуйте ещё раз.',
  },
  register: {
    BAD_EMAIL_MESSAGE: 'Пользователь с таким email уже существует.',
    BAD_REQUEST_MESSAGE: 'Переданы некорректные данные при регистрации',
    ERROR_MESSAGE: 'При регистрации пользователя произошла ошибка.',
  },
  login: {
    BAD_REQUEST_MESSAGE: 'Вы ввели неправильный логин или пароль.',
    ERROR_MESSAGE: 'При авторизации пользователя произошла ошибка.',
  },
  profile: {
    UPDATE_USER_MESSAGE: 'Данные успешно обновлены.',
    BAD_EMAIL_MESSAGE: 'Пользователь с таким email уже существует.',
    BAD_REQUEST_MESSAGE: 'Необходима авторизация',
    ERROR_MESSAGE: 'При обновлении профиля произошла ошибка.',
  },
  films: {
    ERROR_SEARCH_SUBMIT: 'Нужно ввести ключевое слово',
    SEARCH_NOT_FOUND_MESSAGE: 'Ничего не найдено',
    ERROR_MESSAGE: 'Во время запроса произошла ошибка.' +
    ' Возможно, проблема с соединением или сервер недоступен.' +
    ' Подождите немного и попробуйте ещё раз.',
  },
};