import './ProfileForm.scss';

const ProfileForm = ({
  name,
  buttonText,
  loadingText,
  onSubmit,
  isLoading,
  isValid,
  children,
}) => {
  return (
    <form
      className="profile-form"
      name={name}
      onSubmit={onSubmit}
      noValidate
    >
      {children}
      <button
        className={`profile-form__submit ${
          (!isValid && ' profile-form__submit_disabled') || ''
        }`}
        type="submit"
        disabled={!isValid}
      >
        {isLoading ? loadingText : buttonText}
      </button>
    </form>
  );
};

export default ProfileForm;
