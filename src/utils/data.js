/* eslint-disable no-useless-escape */
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';
import img5 from '../images/5.jpg';
import img6 from '../images/6.jpg';
import img7 from '../images/7.jpg';
import img8 from '../images/8.jpg';
import img9 from '../images/9.jpg';
import img10 from '../images/10.jpg';
import img11 from '../images/11.jpg';
import img12 from '../images/12.jpg';

const movies = [
  {
    _id: 1,
    nameRU: '33 слова о дизайне',
    img: img1,
    duration: '1ч 17м',
    saved: true,
  },
  {
    _id: 2,
    nameRU: 'Киноальманах «100 лет дизайна»',
    img: img2,
    duration: '1ч 17м',
    saved: true,
  },
  {
    _id: 3,
    nameRU: 'В погоне за Бенкси',
    img: img3,
    duration: '1ч 17м',
    saved: true,
  },
  {
    _id: 4,
    nameRU: 'Баския: Взрыв реальности',
    img: img4,
    duration: '1ч 17м',
    saved: false,
  },
  {
    _id: 5,
    nameRU: 'Бег это свобода',
    img: img5,
    duration: '1ч 17м',
    saved: false,
  },
  {
    _id: 6,
    nameRU: 'Книготорговцы',
    img: img6,
    duration: '1ч 17м',
    saved: false,
  },
  {
    _id: 7,
    nameRU: 'Когда я думаю о Германии ночью',
    img: img7,
    duration: '1ч 17м',
    saved: false,
  },
  {
    _id: 8,
    nameRU: 'Gimme Danger: История Игги и The Stooges',
    img: img8,
    duration: '1ч 17м',
    saved: false,
  },
  {
    _id: 9,
    nameRU: 'Дженис: Маленькая девочка грустит',
    img: img9,
    duration: '1ч 17м',
    saved: false,
  },
  {
    _id: 10,
    nameRU: 'Соберись перед прыжком',
    img: img10,
    duration: '1ч 17м',
    saved: false,
  },
  {
    _id: 11,
    nameRU: 'Пи Джей Харви: A dog called money',
    img: img11,
    duration: '1ч 17м',
    saved: false,
  },
  {
    _id: 12,
    nameRU: 'По волнам: Искусство звука в кино',
    img: img12,
    duration: '1ч 17м',
    saved: false,
  },
];

export default movies;

export const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]*$/;
export const emailRegex = /^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$/;

export const errors = {
  common: {
    SEARCH_NOT_FOUND_MESSAGE: 'Ничего не найдено',
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
    BAD_EMAIL_MESSAGE: 'Пользователь с таким email уже существует.',
    UPDATE_USER_MESSAGE: 'Данные успешно обновлены.',
    ERROR_MESSAGE: 'При обновлении профиля произошла ошибка.',
  },
};