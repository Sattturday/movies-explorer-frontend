import { useEffect, useState } from 'react';

import { useFormAndValidation } from '../../../hooks/useFormAndValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.scss';
import { errors } from '../../../utils/data';

function SearchForm({ onSearch, searchText, isShorts, setIsShorts, hasSubmitted }) {
  const { values, setValues, handleChange } = useFormAndValidation();
  const [errorSearch, setErrorSearch] = useState('');

  useEffect(() => {
    if (searchText) {
      setValues({search: searchText});
    }
  }, [searchText, setValues]);

  useEffect(() => {
    if (hasSubmitted ) {
      onSearch(values);
    }
  }, [isShorts, hasSubmitted]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!values['search']) {
      setErrorSearch(errors.films.ERROR_SEARCH_SUBMIT);
    } else {
      setErrorSearch('');
      onSearch(values);
    }
  }

  function handleShorts() {
    setIsShorts(!isShorts);
    if (hasSubmitted) {
      if (values['search']?.length !== 0) {
        onSearch(values);
        setErrorSearch('');
      } else {
        setIsShorts(isShorts);
        setErrorSearch(errors.films.ERROR_SEARCH_SUBMIT);
      }
    }
  }

  return (
    <section className="search" aria-label="Поиск фильмов">
      <div className="wrapper">
        <form
          className="search__form"
          name="search"
          id="search"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className="search__input"
            name="search"
            type="text"
            minLength="2"
            placeholder="Фильм"
            value={values['search'] || '' }
            onChange={handleChange}
            required
          />
          <button
            className="search__submit"
            type="submit"
          ></button>
        </form>
        <span className="search__error">{errorSearch}</span>
        <FilterCheckbox isShorts={isShorts} toggleShorts={handleShorts} />
      </div>
    </section>
  );
}

export default SearchForm;
