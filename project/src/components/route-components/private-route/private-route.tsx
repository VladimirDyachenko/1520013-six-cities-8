import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppRoute } from '../../../utils/const';
import { State } from '../../../types/store/state';
import { connect, ConnectedProps } from 'react-redux';
import { getIsAuthorized } from '../../../store/user-data/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
};

const mapStateToProps = (state: State) => ({
  isAuthorized: getIsAuthorized(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const { exact, path, render, isAuthorized } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        isAuthorized ? render() : <Redirect to={AppRoute.SignIn}/>
      )}
    />
  );
}

export { PrivateRoute };
export default connector(PrivateRoute);
