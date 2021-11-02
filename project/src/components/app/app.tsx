import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import { State } from '../../types/store/state';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PropertyPage from '../pages/property-page/property-page';
import NoAuthOnlyRoute from '../route-components/no-auth-only-route/no-auth-only-route';
import PrivateRoute from '../route-components/private-route/private-route';
import { connect, ConnectedProps } from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';

const mapStateToProps = ({ isDataLoaded }:State) => ({
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({isDataLoaded}: PropsFromRedux): JSX.Element {

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainPage/>
        </Route>
        <Route path={`${AppRoute.Room}/:id`} exact>
          <PropertyPage/>
        </Route>
        <NoAuthOnlyRoute
          path={AppRoute.SignIn}
          exact
          render={() => <LoginPage/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </NoAuthOnlyRoute>
        <PrivateRoute
          path={AppRoute.Favorites}
          exact
          render={() => <FavoritesPage offers={[]}/>}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route path="">
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
