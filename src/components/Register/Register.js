import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import '../Login/Login.scss';
import Input from '../common/Input/Input';
import Form from '../common/Form/Form';
import { AppContext } from '../../contexts/AppContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Login({ handleRegister }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const app = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleRegister(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main>
      <section className="login">
        <Link className="logo" to="/" />
        <h1 className="login__title">Добро пожаловать!</h1>
        <Form
          name="register"
          buttonText="Зарегистрироваться"
          loadingText="Регистрация..."
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
          <Input
            name="email"
            title="E-mail"
            type="email"
            placeholder="Email"
            errors={errors}
            values={values}
            handleChange={handleChange}
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
        Уже зарегистрированы? <Link to="/signin">Войти</Link>
        </p>
      </section>
    </main>

  );
}

export default Login;
