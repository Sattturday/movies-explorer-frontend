import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';
import Main from '../landing/Main/Main';
import Movies from '../films/Movies/Movies';
import SavedMovies from '../films/SavedMovies/SavedMovies';
import Profile from '../user/Profile/Profile';
import Login from '../user/Login/Login';
import Register from '../user/Register/Register';
import NotFound from '../NotFound/NotFound';
import Header from '../common/Header/Header';
import movies from '../../utils/data';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const userName = 'Виталий';
  const userMail = 'pochta@yandex.ru';

  const navigate = useNavigate();

  function handleBurgerClick() {
    setMenuOpen(!menuOpen);
  }

  function handleLogin() {
    setLoggedIn(true);
    navigate('/');
  }

  function handleRegister() {
    navigate('/signin');
  }

  function handleUpdateUser() {
    setIsEdit(false);
  }

  function handleEditProfile() {
    setIsEdit(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <AppContext.Provider value={{loggedIn, menuOpen, isEdit, userName, userMail, movies}}>
      <Routes>
        <Route path="/" element={<Main onBurgerClick={handleBurgerClick} />} />
        <Route path="/movies" element={<Movies />} />
        {/*  <Route path="/saved-movies" element={<SavedMovies />} />*/}
        <Route path="/profile"
          element={<Profile
            onUpdateUser={handleUpdateUser}
            onEditProfile={handleEditProfile}
            onBurgerClick={handleBurgerClick}
            onLogout={handleLogout} />}
        />
        <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
