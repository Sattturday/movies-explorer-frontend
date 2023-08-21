import './Promo.scss';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className="promo">
      <div className="wrapper wrapper_promo">
        <div className="promo__container">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <NavTab />
        </div>
      </div>
    </section>
  );
}

export default Promo;