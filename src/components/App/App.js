import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import movies from '../../utils/data';
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

function App() {
  const [showHeader, setShowHeader] = useState('');
  const [showFooter, setShowFooter] = useState('');
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
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  function handleBurgerClick() {
    setMenuOpen(!menuOpen);
  }

  function handleInfoMessage(message) {
    setInfoMessage(message);
  }

  function handleRegister(values) {
    function makeRequest() {
      return register(values)
        .then(() => {
          console.log('register)');
          handleLogin(values);
        });
    }
    handleSubmit(makeRequest, true);
  }

  function handleLogin(values) {
    function makeRequest() {
      return login(values).then((data) => {
        if (data._id) {
          localStorage.setItem('userId', data._id);
          setLoggedIn(true);
          console.log('hi');
          navigate('/movies');
          return data;
        } else {
          return;
        }
      });
    }
    handleSubmit(makeRequest, false);
  }

  function tokenCheck() {
    const userId = localStorage.getItem('userId');
    console.log('local?');
    function makeRequest() {
      return getUserInfo().then(() => {
        setLoggedIn(true);
        console.log('tokenCheck');
      //  navigate('/movies');
      });
    }

    if (userId) {
      handleSubmit(makeRequest, false);
    }
  }

  function handleUpdateUser(data) {
    function makeRequest() {
      return setUserInfo(data).then((data) => {
        setCurrentUser(data);
        console.log('user', data);
        setIsEdit(false);
      }
      );
    }
    handleSubmit(makeRequest, false);
  }

  function handleEditProfile() {
    setIsEdit(true);
  }

  function handleLogout() {
    function makeRequest() {
      return logout().then((data) => {
        if (data) {
          localStorage.removeItem('userId');
          setLoggedIn(false);
          console.log('by');
          navigate('/');
        } else {
          return;
        }
      });
    }
    handleSubmit(makeRequest, false);
  }

  // отправка запросов
  function handleSubmit(request, showInfo) {
    request()
      .then(() => {
        if (showInfo) {
          handleSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
        handleError();
      });
  }

  // обработка ошибок запросов
  function handleError() {
    return setInfoMessage({
      text: 'Что-то пошло не так! Попробуйте ещё раз.',
      isSuccess: false,
    });
  }

  // обработка успешной регистрации
  function handleSuccess() {
    return setInfoMessage({
      text: 'Вы успешно зарегистрировались!',
      isSuccess: true,
    });
  }

  return (
    <AppContext.Provider
      value={{
        showHeader,
        showFooter,
        loggedIn,
        menuOpen,
        isEdit,
        movies,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Layout  onBurgerClick={handleBurgerClick} /> }>
            <Route path="/" element={<Main />} />
            {/* <Route path="/movies" element={<Movies onBurgerClick={handleBurgerClick} />} />
            <Route path="/saved-movies" element={<SavedMovies onBurgerClick={handleBurgerClick} />} />
            <Route path="/profile"
              element={<Profile
                onUpdateUser={handleUpdateUser}
                onEditProfile={handleEditProfile}
                onBurgerClick={handleBurgerClick}
                onLogout={handleLogout} />}
            /> */}

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
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
