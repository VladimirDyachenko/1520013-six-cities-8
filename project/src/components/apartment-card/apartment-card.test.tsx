import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { generateFakeOffer } from '../../utils/mocks';
import { ApartmentCard } from './apartment-card';

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
});
