import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Header } from './header';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { datatype, internet } from 'faker';

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
});
