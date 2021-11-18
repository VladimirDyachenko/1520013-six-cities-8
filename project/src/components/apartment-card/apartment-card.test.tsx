import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import { generateFakeOffer } from '../../utils/mocks';
import { ApartmentCard } from './apartment-card';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
describe('Component: ApartmentCard', () => {
  beforeEach(() => {
    history.push('');
  });
  it('should render ApartmentCard correctly', () => {
    const fakeOffer = generateFakeOffer();

    render(
      <Router history={history}>
        <ApartmentCard offer={fakeOffer} onToggleFavorite={jest.fn()}/>
      </Router>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByAltText('Place')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('To bookmarks');
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });

  it('should render premium mark', () => {
    const fakeOffer = generateFakeOffer();
    fakeOffer.isPremium = true;

    render(
      <Router history={history}>
        <ApartmentCard offer={fakeOffer} onToggleFavorite={jest.fn()}/>
      </Router>,
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render near by card', () => {
    const fakeOffer = generateFakeOffer();
    fakeOffer.isPremium = true;

    const { baseElement } =render(
      <Router history={history}>
        <ApartmentCard offer={fakeOffer} onToggleFavorite={jest.fn()} isNearByCard/>
      </Router>,
    );

    expect(baseElement.querySelector('.near-places__image-wrapper')).toBeInTheDocument();
    expect(baseElement.querySelector('.cities__image-wrapper')).not.toBeInTheDocument();
  });

  it(`should navigate to "${AppRoute.Room}/:id"`, () => {
    const fakeOffer = generateFakeOffer();

    render(
      <Router history={history}>
        <ApartmentCard offer={fakeOffer} onToggleFavorite={jest.fn()}/>
      </Router>,
    );

    const links = screen.getAllByTestId('to-offer-id-link');

    userEvent.click(links[0]);
    expect(history.location.pathname).toBe(`${AppRoute.Room}/${fakeOffer.id}`);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    userEvent.click(links[1]);
    expect(history.location.pathname).toBe(`${AppRoute.Room}/${fakeOffer.id}`);
  });
  it('should call onToggleFavorite callback', () => {
    const fakeOffer = generateFakeOffer();
    const onToggleFavorite = jest.fn();
    render(
      <Router history={history}>
        <ApartmentCard offer={fakeOffer} onToggleFavorite={onToggleFavorite}/>
      </Router>,
    );

    userEvent.click(screen.getByText('To bookmarks'));
    expect(onToggleFavorite).toBeCalledTimes(1);
    expect(onToggleFavorite).toBeCalledWith(fakeOffer.id, !fakeOffer.isFavorite);
  });

  it('should call onMouseEnter callback', () => {
    const fakeOffer = generateFakeOffer();
    const onMouseEnter = jest.fn();

    render(
      <Router history={history}>
        <ApartmentCard offer={fakeOffer} onToggleFavorite={jest.fn()} onMouseEnter={onMouseEnter}/>
      </Router>,
    );

    userEvent.hover(screen.getByRole('article'));
    expect(onMouseEnter).toBeCalledTimes(1);
    expect(onMouseEnter).toBeCalledWith(fakeOffer.id);
  });
});
