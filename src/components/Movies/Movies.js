import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <main>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;