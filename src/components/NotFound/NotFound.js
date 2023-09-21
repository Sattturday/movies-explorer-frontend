import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFound.scss';
import { AppContext } from '../../contexts/AppContext';

function NotFound() {
  const navigate = useNavigate();
  const {loggedIn} = useContext(AppContext);

  const handleGoBack = () => {
    if (loggedIn) {
      navigate(-2);
    } else {
      navigate(-1);
    }
  };

  return (
    <main>
      <section className="not-found">
        <div className="not-found__wrapper">
          <div className="not-found__content">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
          </div>
          <button
            className="not-found__link"
            onClick={handleGoBack}
          >
            Назад
          </button>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
