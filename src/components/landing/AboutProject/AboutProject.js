import './AboutProject.scss';

function AboutProject() {
  return (
    <section className="about-project">
      <div className="wrapper wrapper_main">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__container">
          <div className="about-project__column">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__description">Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__column">
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__description">У каждого этапа был мягкий и жёсткий
             дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__timing">
          <p className="about-project__timing-back">1 неделя</p>
          <p className="about-project__timing-front">4 недели</p>
          <p className="about-project__signature">Back-end</p>
          <p className="about-project__signature">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;