import './Movies.scss';
import Header from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function Movies({onBurgerClick}) {
  return (
    <>
      <Header onBurgerClick={onBurgerClick} />
      <main>
        <SearchForm />
      </main>
      <Footer />
    </>
  );
}

export default Movies;