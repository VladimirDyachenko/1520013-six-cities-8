import { render, screen } from '@testing-library/react';
import { generateFakeComment } from '../../utils/mocks';
import ReviewItem from './review-item';


describe('Component: ReviewItem', () => {
  it('should render component "ReviewItem"', () => {
    const review = generateFakeComment();
    const localTimeString = new Date(review.date).toLocaleString('en-us', {month: 'long', year: 'numeric'});

    render(
      <ReviewItem review={review}/>,
    );

    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByTestId('avatar-img')).toHaveAttribute('src', review.user.avatarUrl);
    expect(screen.getByTestId('review-time')).toHaveAttribute('dateTime', review.date);
    expect(screen.getByTestId('review-time')).toHaveTextContent(localTimeString);
  });
});
