import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';

function SavedMovies({onDeleteMovie}) {
  const [isShorts, setIsShorts] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [moviesMessage, setMoviesMessage] = useState('');

  const {savedMovies} = useContext(AppContext);

  const handleSearch = (values) => {
    setSearchText(values.search);
    setMoviesMessage('');
  };

  return (
    <main>
      <SearchForm
        onSearch={handleSearch}
        searchText={searchText}
        isShorts={isShorts}
        setIsShorts={setIsShorts}
      />
      <MoviesCardList
        movies={savedMovies}
        moviesMessage={moviesMessage}
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  );
}

export default SavedMovies;