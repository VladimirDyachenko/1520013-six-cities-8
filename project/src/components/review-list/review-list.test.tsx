import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { Comment } from '../../types/comment';
import { generateFakeComment } from '../../utils/mocks';
import ReviewList from './review-list';

describe('Component: ReviewList', () => {
  it('should render ReviewList correctly when authorized', () => {
    const fakeReviews: Comment[] = new Array(datatype.number(20)).fill(null).map(generateFakeComment);
    const isAuthorized = true;

    render(
      <ReviewList
        reviews={fakeReviews}
        isAuthorized={isAuthorized}
        onAddComment={jest.fn()}
      />,
    );

    expect(screen.getByRole('heading')).toHaveTextContent(`${fakeReviews.length}`);
    expect(screen.queryAllByRole('listitem').length).toBe(fakeReviews.length);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render ReviewList correctly when not authorized', () => {
    const fakeReviews: Comment[] = new Array(datatype.number({min: 1, max: 20})).fill(null).map(generateFakeComment);
    const isAuthorized = false;

    render(
      <ReviewList
        reviews={fakeReviews}
        isAuthorized={isAuthorized}
        onAddComment={jest.fn()}
      />,
    );

    expect(screen.getByRole('heading')).toHaveTextContent(`${fakeReviews.length}`);
    expect(screen.queryAllByRole('listitem').length).toBe(fakeReviews.length);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

});
