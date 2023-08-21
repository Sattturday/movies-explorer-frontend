import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';
import Main from '../landing/Main/Main';
import Movies from '../films/Movies/Movies';
import SavedMovies from '../films/SavedMovies/SavedMovies';
import Profile from '../user/Profile/Profile';
import Login from '../user/Login/Login';
import Register from '../user/Register/Register';
import NotFound from '../NotFound/NotFound';
import Header from '../common/Header/Header';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleBurgerClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <AppContext.Provider value={{loggedIn, menuOpen}}>
      <Routes>
        <Route path="/" element={<Main onBurgerClick={handleBurgerClick} />} />
        {/* <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
