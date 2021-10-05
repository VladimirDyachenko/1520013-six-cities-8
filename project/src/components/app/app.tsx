import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PropertyPage from '../pages/property-page/property-page';

type AppPageProps = {
  offersCount: number;
};

function App({offersCount}: AppPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainPage offersCount={offersCount}/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <LoginPage/>
        </Route>
        <Route path={AppRoute.Favorites} exact>
          <FavoritesPage/>
        </Route>
        <Route path={AppRoute.Room} exact>
          <PropertyPage/>
        </Route>
        <Route path="">
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
