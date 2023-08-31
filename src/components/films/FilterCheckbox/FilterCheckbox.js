import './FilterCheckbox.scss';

function FilterCheckbox() {
  return (
    <label className="filter">
      <input type="checkbox" className="filter__input" value="off" />
      <span className="filter__input-new"></span>
      <span className="filter__title">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;