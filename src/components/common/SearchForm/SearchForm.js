import { useEffect, useState } from 'react';

import { useFormAndValidation } from '../../../hooks/useFormAndValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.scss';
import { errors } from '../../../utils/data';
import { getDataLocal } from '../../../utils/utils';

function SearchForm({ onSearch, isShorts, setIsShorts }) {
  const { values, handleChange } = useFormAndValidation();
  const [errorSearch, setErrorSearch] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      onSearch(values);
    }
  }, [isShorts, hasSubmitted]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!values['search']) {
      setErrorSearch(errors.films.ERROR_SEARCH_SUBMIT);
    } else {
      setErrorSearch('');
      setHasSubmitted(true);
      onSearch(values);
    }
  }

  function handleShorts() {
    setIsShorts(!isShorts);
    if (hasSubmitted) {
      onSearch(values);
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
            value={values['search'] || ''}
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
