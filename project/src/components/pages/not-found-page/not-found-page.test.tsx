import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { AppRoute } from '../../../utils/const';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render NotFoundPage correctly', () => {
    render(
      <Router history={history}>
        <NotFoundPage/>
      </Router>,
    );

    expect(screen.getByRole('link')).toHaveTextContent(/home/i);
  });

  it(`should navigate to ${AppRoute.Main}`, () => {

    render(
      <Router history={history}>
        <NotFoundPage/>
      </Router>,
    );

    userEvent.click(screen.getByRole('link'));
    expect(history.location.pathname).toBe(AppRoute.Main);
  });
});
