import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.scss';

function SearchForm() {
  return (
    <section className="search">
      <div className="wrapper">
        <h1 className="sr-only">Фильмы</h1>
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
        <span className="underline"></span>
      </div>
    </section>
  );
}

export default SearchForm;