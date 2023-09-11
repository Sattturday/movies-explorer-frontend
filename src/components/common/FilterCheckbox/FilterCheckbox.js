import './FilterCheckbox.scss';

function FilterCheckbox({isShorts, toggleShorts}) {
  return (
    <label className="filter  underline">
      <input
        className="filter__input"
        type="checkbox"
        form="search"
        checked={isShorts}
        onChange={toggleShorts}
      />
      <span className="filter__input-new"></span>
      <span className="filter__title">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;