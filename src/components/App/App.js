import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import movies from '../../utils/data';
import { AppContext } from '../../contexts/AppContext';
import Main from '../Main/Main';
import Movies from '../films/Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

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
    setLoggedIn(true);
    navigate('/');
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
        <Route path="/movies" element={<Movies onBurgerClick={handleBurgerClick} />} />
        <Route path="/saved-movies" element={<SavedMovies onBurgerClick={handleBurgerClick} />} />
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
