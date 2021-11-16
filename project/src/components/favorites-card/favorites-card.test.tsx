import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { generateFakeOffer } from '../../utils/mocks';
import { FavoritesCard } from './favorites-card';

const history = createMemoryHistory();

describe('Component: FavoritesCard', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render FavoritesCard correctly', () => {
    const fakeOffer = generateFakeOffer();

    render(
      <Router history={history}>
        <FavoritesCard offer={fakeOffer} onToggleFavorite={jest.fn()}/>
      </Router>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByAltText('Place')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('In bookmarks');
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });
});
