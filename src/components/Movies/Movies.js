import SearchForm from '../../common/SearchForm/SearchForm';
import MoviesCardList from '../../common/MoviesCardList/MoviesCardList';
import Header from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';

function Movies({onBurgerClick}) {
  return (
    <>
      <Header onBurgerClick={onBurgerClick} />
      <main>
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default Movies;