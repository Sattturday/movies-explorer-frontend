import './AboutMe.scss';
import photo from '../../../images/AllaM.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="wrapper wrapper_student">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__column">
            <h3 className="about-me__subtitle">Алла Магина</h3>
            <p className="about-me__description about-me__description_about">Фронтенд-разработчик</p>
            <p className="about-me__description">Я родилась и живу в Чебоксарах.
            Занималась 3D-визуализацией интерьеров.
            Сейчас я вижу свое будущее в фронтенд-разработке. Она позволяет мне сочетать
            творческий дизайн с логикой кодирования. Каждый день в этой области - это новый вызов и
            возможность учиться чему-то новому, что меня вдохновляет.
            </p>
            <a
              className="about-me__link"
              href="https://github.com/Sattturday"
              target="_blank"
              rel="noreferrer"
            >
              <h3>Github</h3>
            </a>
          </div>
          <img className="about-me__image" src={photo} alt="Портретное фото студента" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;