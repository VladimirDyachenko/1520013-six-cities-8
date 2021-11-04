import { FormEvent, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCity } from '../../../store/action';
import { loginAction } from '../../../store/api-action';
import { UserLogin } from '../../../types/api-response';
import { ThunkAppDispatch } from '../../../types/store/actions';
import { AppRoute, AvailableCity } from '../../../utils/const';

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  //TODO сделать нормальную валидацию
  useEffect(() => {
    if ((password.length < 1) || email.length < 1) {
      setIsFormInvalid(true);
    } else {
      setIsFormInvalid(false);
    }
  }, [password, email]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link">
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
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
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
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isFormInvalid}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Main} onClick={() => onSetCity(AvailableCity.Amsterdam)} className="locations__item-link">
                <span>Amsterdam</span>
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
