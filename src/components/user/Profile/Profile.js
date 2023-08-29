import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import { AppContext } from '../../../contexts/AppContext';
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';
import Form from '../../common/Form/Form';
import Input from '../../common/Input/Input';
import Header from '../../common/Header/Header';

function Profile({ onEditProfile, handleUpdateUser, onBurgerClick, onLogout }) {

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const app = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateUser(values);
  }

  useEffect(() => {
    resetForm(true);
  }, [resetForm]);

  console.log(app);
  return (
    <main>
      <Header onBurgerClick={onBurgerClick} />
      <section className="profile">
        <p className="profile__title">Привет, {app.userName}!</p>
        {!app.isEdit ? (
          <div className="profile__container">
            <nav>
              <ul className="profile__list">
                <li className="profile__item">
                  <button className="profile__button" type="button" onClick={onEditProfile}>Редактировать</button>
                </li>
                <li className="profile__item">
                  <Link className="profile__link" to="/" onClick={onLogout}>Выйти из аккаунта</Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <Form ></Form>
        )}

      </section>
    </main>

  );
}

export default Profile;
