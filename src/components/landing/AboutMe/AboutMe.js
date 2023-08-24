import './AboutMe.scss';
import photo from '../../../images/AllaM.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="wrapper wrapper_student">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__column">
            <p className="about-me__subtitle">Алла Магина</p>
            <p className="about-me__description about-me__description_about">Фронтенд-разработчик, 40 лет</p>
            <p className="about-me__description">Я родилась и живу в Чебоксарах.
            Занималась 3D-визуализацией интерьеров.
            Сейчас я вижу свое будущее в фронтенд-разработке. Она позволяет мне сочетать
            творческий дизайн с логикой кодирования. Каждый день в этой области - это новый вызов и
            возможность учиться чему-то новому, что меня вдохновляет.
            </p>
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