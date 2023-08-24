import './Main.scss';
import Promo from '../Promo/Promo';
import Footer from '../../common/Footer/Footer';
import Header from '../../common/Header/Header';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main({onBurgerClick}) {
  return (
    <>
      <Header onBurgerClick={onBurgerClick} />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;