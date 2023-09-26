import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import { AppContext } from '../../contexts/AppContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { emailRegex } from '../../utils/data';
import Form from '../common/Form/Form';
import Input from '../common/Input/Input';
import './Login.scss';

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation('login');
  const app = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main>
      <section className="login">
        <Link className="logo" to="/" />
        <h1 className="login__title">Рады видеть!</h1>
        <Form
          name="login"
          buttonText="Войти"
          loadingText="Вход..."
          onSubmit={handleSubmit}
          isLoading={app.isLoading}
          isValid={isValid}
        >
          <Input
            name="email"
            title="E-mail"
            type="email"
            placeholder="Email"
            errors={errors}
            values={values}
            handleChange={handleChange}
            pattern={emailRegex.source}
          />
          <Input
            name="password"
            title="Пароль"
            type="password"
            minLength="6"
            placeholder="Пароль"
            errors={errors}
            values={values}
            handleChange={handleChange}
          />
        </Form>
        <p className="login__subtitle">
        Ещё не зарегистрированы? <Link to="/signup">Регистрация</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
