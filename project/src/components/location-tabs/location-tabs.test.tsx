import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { LocationTabs } from './location-tabs';
import { AvailableCity } from '../../utils/const';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
describe('Component: LocationTabs', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render LocationTabs correctly when authorized', () => {
    const cityNames = Object.values(AvailableCity);

    render(
      <Router history={history}>
        <LocationTabs selectedCity={AvailableCity.Amsterdam} onSetCity={jest.fn()}/>
      </Router>,
    );

    expect(screen.getByText(AvailableCity.Amsterdam)).toBeInTheDocument();
    expect(screen.getByText(AvailableCity.Brussels)).toBeInTheDocument();
    expect(screen.getByText(AvailableCity.Cologne)).toBeInTheDocument();
    expect(screen.getByText(AvailableCity.Dusseldorf)).toBeInTheDocument();
    expect(screen.getByText(AvailableCity.Hamburg)).toBeInTheDocument();
    expect(screen.getByText(AvailableCity.Paris)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(cityNames.length);
  });

  it('should call "onSetCity" with city name and set anchor', () => {
    const cityNames = Object.values(AvailableCity);
    const onSetCity = jest.fn();

    render(
      <Router history={history}>
        <LocationTabs selectedCity={AvailableCity.Amsterdam} onSetCity={onSetCity}/>
      </Router>,
    );

    expect(screen.getByText(AvailableCity.Amsterdam)).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    userEvent.click(links[1]);
    expect(onSetCity).toBeCalledWith(cityNames[1]);
    expect(history.location.hash).toBe(`#${cityNames[1]}`);
  });

});
