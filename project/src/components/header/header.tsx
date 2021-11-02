import { MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutAction } from '../../store/api-action';
import { ThunkAppDispatch } from '../../types/store/actions';
import { State } from '../../types/store/state';
import { AppRoute, AuthorizationStatus } from '../../utils/const';

const mapStateToProps = (state: State) => ({
  authorizationStatus: state.authorizationStatus,
  userData: state.userData,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogOut() {
    dispatch(logOutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Header(props: PropsFromRedux): JSX.Element {
  const { authorizationStatus, userData, onLogOut } = props;

  const handleLogOut = (event: MouseEvent) => {
    event.preventDefault();
    onLogOut();
  };

  const authenticatedUser = (
    <ul className='header__nav-list'>
      <li className='header__nav-item user'>
        <Link to={AppRoute.Favorites} className='header__nav-link header__nav-link--profile'>
          <div
            style={{backgroundImage: `url(${userData?.avatarUrl})`}}
            className='header__avatar-wrapper user__avatar-wrapper'
          >
          </div>
          <span className='header__user-name user__name'>{userData?.email}</span>
        </Link>
      </li>
      <li className='header__nav-item'>
        <a className='header__nav-link' href='#temp' onClick={handleLogOut}>
          <span className='header__signout'>Sign out</span>
        </a>
      </li>
    </ul>
  );

  const notAuthenticatedUser = (
    <ul className='header__nav-list'>
      <li className='header__nav-item user'>
        <Link className='header__nav-link header__nav-link--profile' to={AppRoute.SignIn}>
          <div className='header__avatar-wrapper user__avatar-wrapper'>
          </div>
          <span className='header__login'>Sign in</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Link to={AppRoute.Main} className='header__logo-link header__logo-link--active'>
              <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41'/>
            </Link>
          </div>
          <nav className='header__nav'>
            { authorizationStatus === AuthorizationStatus.Auth ? authenticatedUser : notAuthenticatedUser}
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };
export default connector(Header);
