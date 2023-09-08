import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';

function Movies({onSearch}) {
  return (
    <main>
      <SearchForm onSearch={onSearch} />
      {/* <MoviesCardList /> */}
    </main>
  );
}

export default Movies;