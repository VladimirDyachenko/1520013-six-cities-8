import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../utils/const';
import { State } from '../../../types/store/state';
import { connect, ConnectedProps } from 'react-redux';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
};

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const { exact, path, render, authorizationStatus } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export { PrivateRoute };
export default connector(PrivateRoute);
