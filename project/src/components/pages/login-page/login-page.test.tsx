import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoute, AvailableCity } from '../../../utils/const';
import { LoginPage } from './login-page';
import userEvent from '@testing-library/user-event';
import { internet } from 'faker';

const history = createMemoryHistory();
describe('Component: LoginPage', () => {
  beforeEach(() => {
    history.push('/login-page');
  });
  it('should render LoginPage correctly', () => {

    render(
      <Router history={history}>
        <LoginPage onSetCity={jest.fn()} onSubmit={jest.fn()}/>
      </Router>,
    );

    expect(screen.getByTestId('logo-link')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('link-to-main-page')).toBeInTheDocument();
  });


  it('should test LoginPage logic', () => {
    const onSubmit = jest.fn();

    render(
      <Router history={history}>
        <LoginPage onSetCity={jest.fn()} onSubmit={onSubmit}/>
      </Router>,
    );

    const email = internet.email();
    const password = internet.password();

    expect(screen.getByTestId('sign-in-button')).toHaveAttribute('disabled');
    userEvent.type(screen.getByTestId('email-input'), email);
    expect(screen.getByTestId('sign-in-button')).toHaveAttribute('disabled');
    userEvent.type(screen.getByTestId('password-input'), password);
    expect(screen.getByTestId('sign-in-button')).not.toHaveAttribute('disabled');
    userEvent.click(screen.getByTestId('sign-in-button'));
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith({ email, password });
  });

  it(`should navigate to "${AppRoute.Main}" on logo click`, () => {
    const onSubmit = jest.fn();

    render(
      <Router history={history}>
        <LoginPage onSetCity={jest.fn()} onSubmit={onSubmit}/>
      </Router>,
    );

    userEvent.click(screen.getByTestId('logo-link'));
    expect(history.location.pathname).toBe(AppRoute.Main);
  });

  it(`should navigate to "${AppRoute.Main}#${AvailableCity.Amsterdam}" and call onSetCity callback`, () => {
    const onSetCity = jest.fn();

    render(
      <Router history={history}>
        <LoginPage onSetCity={onSetCity} onSubmit={jest.fn()}/>
      </Router>,
    );

    userEvent.click(screen.getByTestId('link-to-main-page'));
    expect(onSetCity).toBeCalledTimes(1);
    expect(onSetCity).toHaveBeenCalledWith(AvailableCity.Amsterdam);
    expect(history.location.pathname).toBe(AppRoute.Main);
    expect(history.location.hash).toBe(`#${AvailableCity.Amsterdam}`);
  });
});
