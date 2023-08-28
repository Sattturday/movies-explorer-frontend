import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__info">
          <p className="footer__copyright">&copy; 2023</p>
          <nav className="footer__links">
            <ul className="footer__list">
              <li className="footer__item">
                <a
                  className="footer__link"
                  href="https://practicum.yandex.ru/"
                  target="_blanc"
                  rel="noreferrer">Яндекс.Практикум</a>
              </li>
              <li className="footer__item">
                <a
                  className="footer__link"
                  href="https://github.com/Sattturday"
                  target="_blanc"
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