import './Main.scss';
import Promo from '../Promo/Promo';
import Footer from '../../common/Footer/Footer';
import Header from '../../common/Header/Header';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function Main({onBurgerClick}) {
  return (
    <>
      <Header onBurgerClick={onBurgerClick} />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
      </main>
      <Footer />
    </>
  );
}

export default Main;