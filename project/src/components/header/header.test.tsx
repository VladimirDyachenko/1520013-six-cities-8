import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Header } from './header';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { datatype, internet } from 'faker';
import { AppRoute } from '../../utils/const';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});
describe('Component: Header', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render Header correctly when authorized', () => {
    const fakeUserData = {
      avatarUrl: internet.avatar(),
      id: datatype.number(),
      isPro: datatype.boolean(),
      name: internet.userName(),
      email: internet.email(),
      token: datatype.uuid(),
    };

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header isAuthorized userData={fakeUserData} onLogOut={jest.fn()}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(fakeUserData.email)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render Header correctly when not authorized', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header isAuthorized={false} userData={undefined} onLogOut={jest.fn()}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it(`should redirect to "${AppRoute.SignIn}" after "Sign in" click`, () => {
    render(
      <Router history={history}>
        <Header isAuthorized={false} userData={undefined} onLogOut={jest.fn()}/>
      </Router>,
    );

    userEvent.click(screen.getByTestId('sign-in-link'));
    expect(history.location.pathname).toBe(AppRoute.SignIn);
  });

  it(`should redirect to "${AppRoute.Main}" after logo click`, () => {
    render(
      <Router history={history}>
        <Header isAuthorized={false} userData={undefined} onLogOut={jest.fn()}/>
      </Router>,
    );

    userEvent.click(screen.getByTestId('logo'));
    expect(history.location.pathname).toBe(AppRoute.Main);
  });

  it('should call "onLogOut" callback after "Sign out" click', () => {
    const onLogOut = jest.fn();
    const fakeUserData = {
      avatarUrl: internet.avatar(),
      id: datatype.number(),
      isPro: datatype.boolean(),
      name: internet.userName(),
      email: internet.email(),
      token: datatype.uuid(),
    };

    render(
      <Router history={history}>
        <Header isAuthorized userData={fakeUserData} onLogOut={onLogOut}/>
      </Router>,
    );

    userEvent.click(screen.getByTestId('sign-out-link'));
    expect(onLogOut).toBeCalledTimes(1);
    expect(history.location.hash).toBe('');
  });
});
