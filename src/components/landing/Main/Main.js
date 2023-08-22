import './Main.scss';
import Promo from '../Promo/Promo';
import Footer from '../../common/Footer/Footer';
import Header from '../../common/Header/Header';
import AboutProject from '../AboutProject/AboutProject';

function Main({onBurgerClick}) {
  return (
    <>
      <Header onBurgerClick={onBurgerClick} />
      <main>
        <Promo />
        <AboutProject />
      </main>
      <Footer />
    </>
  );
}

export default Main;