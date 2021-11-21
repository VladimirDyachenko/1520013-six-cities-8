import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddReview from './add-review';

describe('Component: AddReview', () => {
  it('should render AddReview correctly', () => {
    const addCommentHandler = jest.fn();
    render(<AddReview addCommentHandler={addCommentHandler}/>);

    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(5);
  });

  it('submit button should be disabled becaus rating is not selected', () => {
    const addCommentHandler = jest.fn();

    render(<AddReview addCommentHandler={addCommentHandler}/>);

    expect(screen.getByTestId('submit-button')).toBeDisabled();

    const reviewText = ''.padEnd(50, 'c');
    userEvent.type(screen.getByTestId('review-textarea'), reviewText);
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });

  it('test submit button when rating is selected', () => {
    const addCommentHandler = jest.fn();
    const reviewText = ''.padEnd(49, 'c');

    render(<AddReview addCommentHandler={addCommentHandler}/>);

    userEvent.click(screen.getByTestId(`star-input-${1}`));
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(screen.getByTestId('review-textarea'), reviewText);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(screen.getByTestId('review-textarea'), 'c');
    expect(screen.getByTestId('submit-button')).toBeEnabled();

    userEvent.clear(screen.getByTestId('review-textarea'));
    userEvent.type(screen.getByTestId('review-textarea'), ''.padEnd(300));
    expect(screen.getByTestId('submit-button')).toBeEnabled();

    userEvent.type(screen.getByTestId('review-textarea'), 'c');
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });

  it('should call addCommentHandler callback', () => {
    const addCommentHandler = jest.fn();
    const commentText = ''.padEnd(50);

    render(<AddReview addCommentHandler={addCommentHandler}/>);

    userEvent.click(screen.getByTestId(`star-input-${1}`));
    userEvent.type(screen.getByTestId('review-textarea'), commentText);
    expect(screen.getByTestId('submit-button')).toBeEnabled();

    userEvent.click(screen.getByTestId('submit-button'));
    expect(addCommentHandler).toBeCalledTimes(1);
    expect(addCommentHandler).toBeCalledWith({
      comment: commentText,
      rating: 1,
    });
  });
});
