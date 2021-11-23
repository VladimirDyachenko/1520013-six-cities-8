import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { AppRoute } from '../../utils/const';
import { generateFakeOffer } from '../../utils/mocks';
import { FavoriteCard } from './favorite-card';

const history = createMemoryHistory();

describe('Component: FavoriteCard', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render FavoriteCard correctly', () => {
    const fakeOffer = generateFakeOffer();

    render(
      <Router history={history}>
        <FavoriteCard offer={fakeOffer} onToggleFavorite={jest.fn()}/>
      </Router>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByAltText('Place')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('In bookmarks');
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });

  it(`should redirect to ${AppRoute.Room}/:id`, () => {
    const fakeOffer = generateFakeOffer();

    render(
      <Router history={history}>
        <FavoriteCard offer={fakeOffer} onToggleFavorite={jest.fn()}/>
      </Router>,
    );

    userEvent.click(screen.getByTestId('link-to-offer-image'));
    expect(history.location.pathname).toBe(`${AppRoute.Room}/${fakeOffer.id}`);

    history.push('/test-page');
    expect(history.location.pathname).toBe('/test-page');

    userEvent.click(screen.getByTestId('link-to-offer-image-title'));
    expect(history.location.pathname).toBe(`${AppRoute.Room}/${fakeOffer.id}`);
  });

  it('should call onToggleFavorite callback', () => {
    const fakeOffer = generateFakeOffer();
    const onToggleFavorite = jest.fn();
    render(
      <Router history={history}>
        <FavoriteCard offer={fakeOffer} onToggleFavorite={onToggleFavorite}/>
      </Router>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(onToggleFavorite).toBeCalledTimes(1);
    expect(onToggleFavorite).toBeCalledWith(fakeOffer.id, !fakeOffer.isFavorite);
  });
});
