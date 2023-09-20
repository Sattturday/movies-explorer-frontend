import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFound.scss';

function NotFound() {
  const navigate = useNavigate();

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
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
