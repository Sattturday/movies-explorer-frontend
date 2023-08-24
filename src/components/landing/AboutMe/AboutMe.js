import './AboutMe.scss';
import photo from '../../../images/AllaM.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="wrapper wrapper_student">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__column">
            <p className="about-me__subtitle">Виталий</p>
            <p className="about-me__description about-me__description_about">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">Я родился и живу в Саратове,
            закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю
            слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015
            года работал в компании «СКБ Контур». После того, как прошёл курс по
            веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной
            работы.</p>
            <a className="about-me__link" href="https://github.com/Sattturday"
              target="_blank" rel="noreferrer">Github</a>
          </div>
          <img src={photo} alt="Портретное фото студента" className="about-me__image" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;