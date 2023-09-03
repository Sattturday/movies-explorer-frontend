import './Input.scss';

const Input = ({ name, title, errors, values, handleChange, ...props }) => {
  return (
    <label className="input">
      <span className="input__name">{title}</span>
      <input
        className={`input__field${(errors[name] && ' input__field_type_error') || ''}`}
        name={name}
        value={values[name] || ''}
        onChange={handleChange}
        required
        {...props}
      />
      <span className="input__error">{errors[name]}</span>
    </label>
  );
};

export default Input;
