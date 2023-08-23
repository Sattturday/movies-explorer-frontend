import './Techs.scss';

function Techs() {
  return (
    <section className="techs">
      <div className="wrapper wrapper_main">
        <h2 className="techs__title">Технологии</h2>
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__paragraph">На курсе веб-разработки мы освоили
        технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__item">
            <p className="techs__tech">HTML</p>
          </li>
          <li className="techs__item">
            <p className="techs__tech">CSS</p>
          </li>
          <li className="techs__item">
            <p className="techs__tech">JS</p>
          </li>
          <li className="techs__item">
            <p className="techs__tech">React</p>
          </li>
          <li className="techs__item">
            <p className="techs__tech">Git</p>
          </li>
          <li className="techs__item">
            <p className="techs__tech">Express.js</p>
          </li>
          <li className="techs__item">
            <p className="techs__tech">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;