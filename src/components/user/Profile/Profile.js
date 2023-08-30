import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import { AppContext } from '../../../contexts/AppContext';
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';
import Form from '../../common/Form/Form';
import Input from '../../common/Input/Input';
import Header from '../../common/Header/Header';
import './Profile.scss';

function Profile({ onEditProfile, onUpdateUser, onBurgerClick, onLogout }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const app = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }

  useEffect(() => {
    resetForm(true);
    setValues({
      name: app.userName,
      email: app.userMail,
    });
  }, [setValues, resetForm]);

  return (
    <main>
      <Header onBurgerClick={onBurgerClick} />
      <section className="profile">
        <h1 className="profile__title">Привет, {app.userName}!</h1>
        {!app.isEdit ? (
          <div className="profile__container">
            <ul className="profile__info-list">
              <li className="profile__info-item profile__info-item_underline">
                <p className="profile__subtitle">Имя</p>
                <p className="profile__name">{app.userName}</p>
              </li>
              <li className="profile__info-item">
                <p className="profile__subtitle">E-mail</p>
                <p className="profile__mail">{app.userMail}</p>
              </li>
            </ul>
            <nav className="profile__nav">
              <ul className="profile__nav-list">
                <li className="profile__nav-item">
                  <button
                    className="profile__button"
                    type="button"
                    onClick={onEditProfile}
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
          <Form
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
            />
            <span className="underline"></span>
            <Input
              name="email"
              title="E-mail"
              type="email"
              placeholder="Email"
              errors={errors}
              values={values}
              handleChange={handleChange}
            />
          </Form>
        )}
      </section>
    </main>

  );
}

export default Profile;
