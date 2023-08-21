import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import Navigation from '../Navigation/Navigation';
import { AppContext } from '../../../contexts/AppContext';

function Header({onBurgerClick}) {
  const app = useContext(AppContext);

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