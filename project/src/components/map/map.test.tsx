import { render, screen } from '@testing-library/react';
import Map from './map';


describe('Component: Map', () => {
  it('should render component "Map"', () => {
    render(
      <Map
        city={{
          latitude: 0,
          longitude: 0,
          zoom: 0,
        }}
        offers={[]}
      />,
    );

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();
  });
});
