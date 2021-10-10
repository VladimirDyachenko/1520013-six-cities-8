import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PropertyPage from '../pages/property-page/property-page';
import NoAuthOnlyRoute from '../route-components/no-auth-only-route/no-auth-only-route';
import PrivateRoute from '../route-components/private-route/private-route';

type AppPageProps = {
  offers: Offer[];
};

function App({offers}: AppPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainPage offers={offers}/>
        </Route>
        <Route path={AppRoute.Room} exact>
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
          render={() => <FavoritesPage offers={offers}/>}
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

export default App;
