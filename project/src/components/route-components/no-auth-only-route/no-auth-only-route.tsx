import { connect, ConnectedProps } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getAuthorizationStatus } from '../../../store/user-data/selectors';
import { State } from '../../../types/store/state';
import { AppRoute, AuthorizationStatus } from '../../../utils/const';

type NoAuthOnlyRouteProps = RouteProps & {
  render: () => JSX.Element;
};

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & NoAuthOnlyRouteProps;

function NoAuthOnlyRoute(props: ConnectedComponentProps): JSX.Element {
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

export { NoAuthOnlyRoute };
export default connector(NoAuthOnlyRoute);
