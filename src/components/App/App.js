import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { errors } from '../../utils/data';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';
import {
  getUserInfo,
  setUserInfo,
  login,
  logout,
  register,
  addMovie,
  getSavedMovies,
  deleteMovie,
} from '../../utils/MainApi';
import { getDataLocal, postDataLocal } from '../../utils/utils';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Layout from '../Layout/Layout';
import InfoTooltip from '../common/InfoToolTip/InfoToolTip';

function App() {
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  const [infoMessage, setInfoMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      getSavedMovies()
        .then((res) => {
          refreshSavedMovies(res);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/profile') {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies') {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  }, [location]);

  function handleBurgerClick() {
    setMenuOpen(!menuOpen);
  }

  function closeAllPopups() {
    setInfoMessage(null);
  }

  // movies
  function refreshSavedMovies(movies) {
    setSavedMovies(movies);
    postDataLocal('savedMovies', movies);
  }

  function handleSaveMovie(data) {
    addMovie(data)
      .then((newMovie) => {
        const updatedSavedMovies = [newMovie, ...savedMovies];
        refreshSavedMovies(updatedSavedMovies);
      })
      .catch((err) => {
        console.log(err);
        handleError(err, 'films');
      });
  }

  function handleDeleteMovie(movieId) {
    deleteMovie(movieId)
      .then(() => {
        const savedMovies = getDataLocal('savedMovies');
        const updatedSavedMovies = savedMovies
          .filter((movie) => movie._id !== movieId);
        refreshSavedMovies(updatedSavedMovies);
      })
      .catch((err) => {
        console.log(err);
        handleError(err, 'films');
      });
  }

  // users
  function handleRegister(values) {
    function makeRequest() {
      return register(values)
        .then(() => {
          handleLogin(values);
        });
    }
    handleSubmit(makeRequest, false, 'register');
  }

  function handleLogin(values) {
    function makeRequest() {
      return login(values).then((data) => {
        if (data._id) {
          localStorage.setItem('userId', data._id);
          tokenCheck();
          navigate('/movies');
          return data;
        } else {
          return;
        }
      });
    }
    handleSubmit(makeRequest, false, 'login');
  }

  function tokenCheck() {
    const userId = localStorage.getItem('userId');
    const path = location.pathname;

    function makeRequest() {
      return getUserInfo()
        .then(setCurrentUser)
        .then(() => {
          setLoggedIn(true);
          if (path === '/signin' || path === '/signup') {
            navigate('/movies');
          } else {
            navigate(path);
          }
        });
    }

    if (userId) {
      handleSubmit(makeRequest, false, 'common');
    }
  }

  function handleUpdateUser(data) {
    function makeRequest() {
      return setUserInfo(data).then((data) => {
        setCurrentUser(data);
      }
      );
    }
    handleSubmit(makeRequest, true, 'profile');
  }

  function handleLogout() {
    function makeRequest() {
      return logout().then((data) => {
        if (data) {
          localStorage.removeItem('userId');
          localStorage.removeItem('beatMovies');
          localStorage.removeItem('searchedMovies');
          localStorage.removeItem('searchedValues');
          localStorage.removeItem('savedMovies');
          setLoggedIn(false);
          navigate('/');
        } else {
          return;
        }
      });
    }
    handleSubmit(makeRequest, false, 'common');
  }

  // отправка запросов
  function handleSubmit(request, showInfo, processName) {
    setIsLoading(true);
    request()
      .then(() => {
        closeAllPopups();
        if (showInfo) {
          handleSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
        handleError(err, processName);
      })
      .finally(() => setIsLoading(false));
  }

  // обработка ошибок запросов
  function handleError(err, processName) {
    if (err === 'Ошибка: 401') {
      return setInfoMessage({
        text: errors[processName].BAD_REQUEST_MESSAGE,
      });
    }
    if (err === 'Ошибка: 409') {
      return setInfoMessage({
        text: errors[processName].BAD_ID_MESSAGE,
      });
    }
    return setInfoMessage({
      text: errors.common.ERROR_MESSAGE,
    });
  }

  // обработка успешной регистрации
  function handleSuccess() {
    return setInfoMessage({
      text: errors.profile.UPDATE_USER_MESSAGE,
    });
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        showHeader,
        showFooter,
        closeAllPopups,
        loggedIn,
        menuOpen,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Layout onBurgerClick={handleBurgerClick} /> }>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
              />
            }
            />
            <Route path="/saved-movies" element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                onDeleteMovie={handleDeleteMovie}
              />
            }
            />
            <Route path="/profile" element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                infoMessage={infoMessage}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
              />
            }
            />
            <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
            <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <InfoTooltip message={infoMessage} />
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
