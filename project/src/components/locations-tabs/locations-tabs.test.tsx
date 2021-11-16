import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { LocationsTabs } from './locations-tabs';
import { AvailableCity } from '../../utils/const';

const history = createMemoryHistory();
describe('Component: LocationsTabs', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render LocationsTabs correctly when authorized', () => {
    const cityNames = Object.values(AvailableCity);

    render(
      <Router history={history}>
        <LocationsTabs selectedCity={AvailableCity.Amsterdam} onSetCity={jest.fn()}/>
      </Router>,
    );

    expect(screen.getByText(AvailableCity.Amsterdam)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(cityNames.length);
  });

});
