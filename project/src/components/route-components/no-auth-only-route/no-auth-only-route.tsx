import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../utils/const';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
};

function NoAuthOnlyRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, render, authorizationStatus } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus !== AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.Main} />
      )}
    />
  );
}

export default NoAuthOnlyRoute;
