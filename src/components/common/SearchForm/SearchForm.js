import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.scss';

function SearchForm() {
  return (
    <section className="search" aria-label="Поиск фильмов">
      <div className="wrapper">
        <form
          className="search__form"
          id="search"
        >
          <input
            className="search__input"
            name="search"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="search__submit"></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;