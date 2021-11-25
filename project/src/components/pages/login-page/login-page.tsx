import { FormEvent, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCity } from '../../../store/action';
import { loginAction } from '../../../store/api-action';
import { UserLogin } from '../../../types/api-response';
import { ThunkAppDispatch } from '../../../types/store/actions';
import { AppRoute, AvailableCity, emailRegExp, passwordRegExp } from '../../../utils/const';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: UserLogin) {
    dispatch(loginAction(authData));
  },
  onSetCity(city: AvailableCity) {
    dispatch(setCity(city));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function LoginPage(props: PropsFromRedux): JSX.Element {
  const { onSubmit, onSetCity } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  const [randomCity, setRandomCity] = useState<AvailableCity>(AvailableCity.Amsterdam);

  useEffect(() => {
    const cities = Object.values(AvailableCity);

    setRandomCity(cities[Math.floor(Math.random() * cities.length)]);
  }, []);

  useEffect(() => {
    const isEmailValid = emailRegExp.test(email);
    const isPasswordValid = passwordRegExp.test(password);
    const isFormValid = !isPasswordValid || !isEmailValid;

    setIsFormInvalid(isFormValid);
  }, [password, email]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                to={AppRoute.Main}
                className="header__logo-link"
                data-testid="logo-link"
              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleFormSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  data-testid="email-input"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  data-testid="password-input"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isFormInvalid}
                data-testid="sign-in-button"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to={`${AppRoute.Main}#${randomCity}`}
                onClick={() => onSetCity(randomCity)} className="locations__item-link"
                data-testid="link-to-main-page"
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { LoginPage };
export default connector(LoginPage);
