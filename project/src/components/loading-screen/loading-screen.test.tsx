import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render LoadingScreen correctly', () => {

    render(<LoadingScreen />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
