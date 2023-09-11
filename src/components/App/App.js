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
} from '../../utils/MainApi';
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
  const [showHeader, setShowHeader] = useState('');
  const [showFooter, setShowFooter] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [infoMessage, setInfoMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tokenCheck();
  }, []);

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

  useEffect(() => {
    if (loggedIn) {
      getUserInfo()
        .then((data) => {
          setCurrentUser(data);})
        .catch(console.error);
    }
  }, [loggedIn]);

  function handleBurgerClick() {
    setMenuOpen(!menuOpen);
  }

  function handleEditProfile() {
    setIsEdit(true);
  }

  function closeAllPopups() {
    setInfoMessage(null);
  }

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
          setLoggedIn(true);
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
      return getUserInfo().then(() => {
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
        setIsEdit(false);
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
          localStorage.removeItem('searchedMovies');
          localStorage.removeItem('searchedValues');
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
        text: errors[processName].BAD_EMAIL_MESSAGE,
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
        isEdit,
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
              />
            }
            />
            <Route path="/saved-movies" element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
              />
            }
            />
            <Route path="/profile" element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                infoMessage={infoMessage}
                onUpdateUser={handleUpdateUser}
                onEditProfile={handleEditProfile}
                onLogout={handleLogout}
              />
            }
            />
            <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
            <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <InfoTooltip message={infoMessage} />
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
