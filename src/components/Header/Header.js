import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';
import { AppContext } from '../../contexts/AppContext';

function Header() {
  const app = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState('');

  function handleBurgerClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="header">
      <div className={`background ${(menuOpen && ' background_active') || ''}`}
        onClick={handleBurgerClick} />
      <div className="wrapper">
        <div className="header__container">
          <Link className="logo" to="/" />

          {app.loggedIn ? (
            <>
              <span
                className={`burger ${(menuOpen && ' burger_active') || ''}`}
                onClick={handleBurgerClick}
              >
                <span className="burger__line"></span>
              </span>
              <div className={`header__menu ${(menuOpen && ' header__menu_open') || ''}`}>
                <nav className="nav-menu">
                  <ul className="nav-menu__list">
                    <li className="nav-menu__item nav-menu__item_main">
                      <NavLink
                        to="/"
                        className={({isActive}) =>
                          `nav-menu__link ${isActive ? 'nav-menu__link_active' : ''}`
                        }
                      >
                    Главная
                      </NavLink>
                    </li>
                    <li className="nav-menu__item">
                      <NavLink
                        to="/movies"
                        className={({isActive}) =>
                          `nav-menu__link ${isActive ? 'nav-menu__link_active' : ''}`
                        }
                      >
                    Фильмы
                      </NavLink>
                    </li>
                    <li className="nav-menu__item">
                      <NavLink
                        className={({isActive}) =>
                          `nav-menu__link ${isActive ? 'nav-menu__link_active' : ''}`
                        }
                        to="/saved-movies"
                      >
                    Сохранённые фильмы
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <Link className="profile" to="/profile">Аккаунт</Link>
              </div>
            </>
          ) : (
            <div className="header__info">
              <Link className="header__link" to="/signup">Регистрация</Link>
              <Link className="header__link header__link_button" to="/signin">Войти</Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

export default Header;