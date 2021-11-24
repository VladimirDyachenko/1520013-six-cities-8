import { connect, ConnectedProps } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getIsAuthorized } from '../../../store/user-data/selectors';
import { State } from '../../../types/store/state';
import { AppRoute } from '../../../utils/const';

type NoAuthOnlyRouteProps = RouteProps & {
  render: () => JSX.Element;
};

const mapStateToProps = (state: State) => ({
  isAuthorized: getIsAuthorized(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & NoAuthOnlyRouteProps;

function NoAuthOnlyRoute(props: ConnectedComponentProps): JSX.Element {
  const { exact, path, render, isAuthorized } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        !isAuthorized ? render() : <Redirect to={AppRoute.Main}/>
      )}
    />
  );
}

export { NoAuthOnlyRoute };
export default connector(NoAuthOnlyRoute);
