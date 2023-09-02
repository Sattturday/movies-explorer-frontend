import { useLocation } from 'react-router-dom';

import './Footer.scss';

function Footer() {
  const location = useLocation();

  return (
    <footer className={`footer${(location.pathname === '/saved-movies') ? ' footer_saved' : ''}`}>
      <div className="wrapper wrapper_footer">
        <h2 className="footer__title underline">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__info">
          <p className="footer__copyright">&copy; 2023</p>
          <nav className="footer__links">
            <ul className="footer__list">
              <li className="footer__item">
                <a
                  className="footer__link"
                  href="https://practicum.yandex.ru/"
                  target="_blank"
                  rel="noreferrer">Яндекс.Практикум</a>
              </li>
              <li className="footer__item">
                <a
                  className="footer__link"
                  href="https://github.com/Sattturday"
                  target="_blank"
                  rel="noreferrer">Github</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;