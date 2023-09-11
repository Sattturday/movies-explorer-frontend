import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { getMovies } from '../../utils/MoviesApi';
import { getDataLocal, performSearch } from '../../utils/utils';

function Movies() {
  const [sourceMovies, setSourceMovies] = useState([]);
  const [isShorts, setIsShorts] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText && sourceMovies.length === 0) {
      Promise.all([getMovies()])
        .then(([beatMovies]) => {
          setSourceMovies(beatMovies);
          performSearch(searchText, isShorts, beatMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (searchText) {
      performSearch(searchText, isShorts, sourceMovies);
    }
  }, [searchText, isShorts]);

  const handleSearch = (values) => {
    setSearchText(values);
    if(sourceMovies.length === 0) {
      Promise.all([
        getMovies(),
      ])
        .then(([beatMovies]) => {
          setSourceMovies(beatMovies);
          performSearch(values, isShorts, beatMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      performSearch(values, isShorts, sourceMovies);
    }
  };

  return (
    <main>
      <SearchForm
        onSearch={handleSearch}
        isShorts={isShorts}
        setIsShorts={setIsShorts}
      />
      <MoviesCardList />
    </main>
  );
}

export default Movies;