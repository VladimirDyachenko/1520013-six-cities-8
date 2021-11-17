import { render, screen } from '@testing-library/react';
import RatingStarInput from './rating-star-input';

describe('Component: RatingStarInput', () => {
  it('should render checked RatingStarInput', () => {
    const value = 1;
    const labelText = 'good';
    render(
      <RatingStarInput
        value={value}
        selectedValue={value}
        label={labelText}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByDisplayValue(1)).toBeInTheDocument();
    expect(screen.getByTitle(labelText)).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('should render not checked RatingStarInput', () => {
    const value = 1;
    const labelText = 'bad';
    render(
      <RatingStarInput
        value={value}
        selectedValue={value + 1}
        label={labelText}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByDisplayValue(1)).toBeInTheDocument();
    expect(screen.getByTitle(labelText)).toBeInTheDocument();
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

});
