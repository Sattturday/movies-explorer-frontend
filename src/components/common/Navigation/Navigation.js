import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AppContext } from '../../../contexts/AppContext';
import './Navigation.scss';

function Navigation({onBurgerClick}) {
  const app = useContext(AppContext);

  return (
    app.loggedIn ? (
      <div className="navigation">
        <span
          className={`burger${(app.menuOpen && ' burger_active') || ''}`}
          onClick={onBurgerClick}
        >
          <span className="burger__line"></span>
        </span>
        <div className={`navigation__menu ${(app.menuOpen && ' navigation__menu_open') || ''}`}>
          <nav className="nav-menu">
            <ul className="nav-menu__list">
              <li
                className="nav-menu__item nav-menu__item_main"
                onClick={app.menuOpen ? onBurgerClick : undefined}
              >
                <NavLink
                  to="/"
                  className={({isActive}) =>
                    `nav-menu__link ${isActive ? 'nav-menu__link_active' : ''}`
                  }
                >
                  Главная
                </NavLink>
              </li>
              <li
                className="nav-menu__item"
                onClick={app.menuOpen ? onBurgerClick : undefined}
              >
                <NavLink
                  to="/movies"
                  className={({isActive}) =>
                    `nav-menu__link ${isActive ? 'nav-menu__link_active' : ''}`
                  }
                >
                  Фильмы
                </NavLink>
              </li>
              <li
                className="nav-menu__item"
                onClick={app.menuOpen ? onBurgerClick : undefined}
              >
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
          <Link
            className="account"
            to="/profile"
            onClick={app.menuOpen ? onBurgerClick : undefined}
          >
              Аккаунт
          </Link>
        </div>
      </div>
    ) : (
      <nav className="navigation navigation_out">
        <ul className="navigation__info">
          <li>
            <Link className="navigation__link" to="/signup">Регистрация</Link>
          </li>
          <li>
            <Link className="navigation__link navigation__link_button" to="/signin">Войти</Link>
          </li>
        </ul>
      </nav>
    )
  );
}

export default Navigation;