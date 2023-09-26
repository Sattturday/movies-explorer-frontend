import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../../contexts/AppContext';
import Navigation from '../Navigation/Navigation';
import './Header.scss';

function Header({onBurgerClick}) {
  const app = useContext(AppContext);

  useEffect(() => {
    if (app.menuOpen) {
      document.body.classList.add('page_lock');
    } else {
      document.body.classList.remove('page_lock');
    }
  }, [app.menuOpen]);

  return (
    <header className="header">
      <div className={`background ${(app.menuOpen && ' background_active') || ''}`}
        onClick={onBurgerClick} />
      <div className="wrapper">
        <div className="header__container">
          <Link className="logo" to="/" />
          <Navigation onBurgerClick={onBurgerClick} />
        </div>
      </div>
    </header>
  );
}

export default Header;