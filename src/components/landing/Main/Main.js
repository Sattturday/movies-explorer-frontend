import './Main.scss';
import Promo from '../Promo/Promo';
import Footer from '../../common/Footer/Footer';
import Header from '../../common/Header/Header';

function Main({onBurgerClick}) {
  return (
    <>
      <Header onBurgerClick={onBurgerClick} />
      <main>
        <Promo />
      </main>
      <Footer />
    </>
  );
}

export default Main;