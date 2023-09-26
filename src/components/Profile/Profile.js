import { Link } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';

import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { emailRegex, nameRegex } from '../../utils/data';
import ProfileForm from '../common/ProfileForm/ProfileForm';
import Input from '../common/Input/Input';
import './Profile.scss';

function Profile({ onEditProfile, onUpdateUser, onLogout }) {
  const [isEdit, setIsEdit] = useState(false);

  const { values, setValues, handleChange, errors, isValid, setIsValid, resetForm } =
    useFormAndValidation();
  const app = useContext(AppContext);
  const currentUser = useContext(CurrentUserContext);

  function handleEditProfile() {
    setIsEdit(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }

  useEffect(() => {
    resetForm(false);
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, resetForm, currentUser]);

  useEffect(() => {
    if(currentUser.name !== values.name || currentUser.email !== values.email){
      return setIsValid(true);
    }
    return setIsValid(false);
  }, [values, setIsValid, currentUser]);

  return (
    <>
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          {!isEdit ? (
            <div className="profile__container">
              <ul className="profile__info-list">
                <li className="profile__info-item underline">
                  <p className="profile__subtitle">Имя</p>
                  <p className="profile__name">{currentUser.name}</p>
                </li>
                <li className="profile__info-item">
                  <p className="profile__subtitle">E-mail</p>
                  <p className="profile__mail">{currentUser.email}</p>
                </li>
              </ul>
              <nav className="profile__nav">
                <ul className="profile__nav-list">
                  <li className="profile__nav-item">
                    <button
                      className="profile__button"
                      type="button"
                      onClick={handleEditProfile}
                    >
                    Редактировать
                    </button>
                  </li>
                  <li className="profile__item">
                    <Link
                      className="profile__link"
                      to="/"
                      onClick={onLogout}
                    >
                    Выйти из аккаунта
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            <ProfileForm
              name="profile"
              buttonText="Сохранить"
              loadingText="Сохранение..."
              onSubmit={handleSubmit}
              isLoading={app.isLoading}
              isValid={isValid}
            >
              <Input
                name="name"
                title="Имя"
                type="text"
                minLength="2"
                maxLength="40"
                placeholder="Имя"
                errors={errors}
                values={values}
                handleChange={handleChange}
                pattern={nameRegex.source}
              />
              <Input
                name="email"
                title="E-mail"
                type="text"
                placeholder="Email"
                errors={errors}
                values={values}
                handleChange={handleChange}
                pattern={emailRegex.source}
              />
            </ProfileForm>
          )}
        </section>
      </main>
    </>
  );
}

export default Profile;
