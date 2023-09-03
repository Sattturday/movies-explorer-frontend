import './Portfolio.scss';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="wrapper wrapper_student">
        <h2 className="portfolio__title">Портфолио</h2>
        <nav className="portfolio__nav">
          <ul className="portfolio__list">
            <li className="portfolio__item underline">
              <a
                className="portfolio__link"
                href="https://sattturday.github.io/rsschool-cv/"
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="portfolio__item-name">Статичный сайт</h3>
              </a>
            </li>
            <li className="portfolio__item underline">
              <a
                className="portfolio__link"
                href="https://sattturday.github.io/shelter/main.html"
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="portfolio__item-name">Адаптивный сайт</h3>
              </a>
            </li>
            <li className="portfolio__item">
              <a
                className="portfolio__link"
                href="https://sattturday.github.io/react-mesto-auth"
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="portfolio__item-name">Одностраничное приложение</h3>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Portfolio;