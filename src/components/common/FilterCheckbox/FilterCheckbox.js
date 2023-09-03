import './FilterCheckbox.scss';

function FilterCheckbox() {
  return (
    <label className="filter  underline">
      <input
        className="filter__input"
        type="checkbox"
        form="search"
        value="off"
      />
      <span className="filter__input-new"></span>
      <span className="filter__title">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;