import Footer from '../common/Footer/Footer';
import Header from '../common/Header/Header';
import Promo from '../common/Promo/Promo';
import AboutProject from '../common/AboutProject/AboutProject';
import Techs from '../common/Techs/Techs';
import AboutMe from '../common/AboutMe/AboutMe';
import Portfolio from '../common/Portfolio/Portfolio';

function Main({onBurgerClick}) {
  return (
    <>
      <Header onBurgerClick={onBurgerClick} />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;