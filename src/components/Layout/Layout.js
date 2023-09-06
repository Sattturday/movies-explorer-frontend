import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';
import Footer from '../common/Footer/Footer';
import Header from '../common/Header/Header';

function Layout({ onBurgerClick }) {
  const app = useContext(AppContext);
  return (
    <>
      {app.showHeader && <Header onBurgerClick={onBurgerClick} />}
      <Outlet />
      {app.showFooter && <Footer /> }
    </>
  );
}

export default Layout;
