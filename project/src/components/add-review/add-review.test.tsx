import { render, screen } from '@testing-library/react';
import AddReview from './add-review';

describe('Component: AddReview', () => {
  it('should render AddReview correctly', () => {
    const addCommentHandler = jest.fn();
    render(<AddReview addCommentHandler={addCommentHandler}/>);

    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(5);
  });
});
