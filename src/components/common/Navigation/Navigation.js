import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Navigation.scss';
import { AppContext } from '../../../contexts/AppContext';

function Navigation({onBurgerClick}) {
  const app = useContext(AppContext);

  return (
    app.loggedIn ? (
      <>
        <span
          className={`burger ${(app.menuOpen && ' burger_active') || ''}`}
          onClick={onBurgerClick}
        >
          <span className="burger__line"></span>
        </span>

        <div className={`navigation__menu ${(app.menuOpen && ' navigation__menu_open') || ''}`}>

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
      <div className="navigation__info">
        <Link className="navigation__link" to="/signup">Регистрация</Link>
        <Link className="navigation__link navigation__link_button" to="/signin">Войти</Link>
      </div>
    )
  );
}

export default Navigation;