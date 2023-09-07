import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';
import Header from '../common/Header/Header';
import Preloader from '../common/Preloader/Preloader';
import Footer from '../common/Footer/Footer';

function Layout({ onBurgerClick }) {
  const app = useContext(AppContext);
  return (
    <>
      {app.showHeader && <Header onBurgerClick={onBurgerClick} />}
      {!app.isLoading ? <Outlet /> : <Preloader />}
      {app.showFooter && <Footer /> }
    </>
  );
}

export default Layout;
