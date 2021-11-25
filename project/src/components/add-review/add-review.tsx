import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { CommentPost } from '../../types/api-request';
import RatingStarInput from '../rating-star-input/rating-star-input';

type AddReviewProps = {
  onAddComment: (comment: CommentPost, onSuccess: () => void, onError: () => void) => void;
}

function AddReview({onAddComment}: AddReviewProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isFormInvalid = Boolean(rating === undefined || comment.length < 50 || comment.length > 300);
  const handleRatingInput = useCallback((newRating) => {
    setRating(newRating);
  }, []);

  const onSubmitSuccess = useCallback(() => {
    setComment('');
    setRating(undefined);
    setIsSubmitting(false);
  }, []);

  const onSubmitError = useCallback(() => {
    setIsSubmitting(false);
  }, []);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if(!isFormInvalid) {
      onAddComment(
        {
          comment: comment,
          rating: rating as number,
        },
        onSubmitSuccess,
        onSubmitError,
      );
      setIsSubmitting(true);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className='reviews__form form' action='#' method='post'>
      <fieldset disabled={isSubmitting} style={{border: 'none', padding: '0', margin: '0'}}>
        <label className='reviews__label form__label' htmlFor='review'>
          Your review
        </label>
        <div className='reviews__rating-form form__rating'>
          <RatingStarInput value={5} selectedValue={rating} onChange={handleRatingInput} label='perfect'/>
          <RatingStarInput value={4} selectedValue={rating} onChange={handleRatingInput} label='good'/>
          <RatingStarInput value={3} selectedValue={rating} onChange={handleRatingInput} label='not bad'/>
          <RatingStarInput value={2} selectedValue={rating} onChange={handleRatingInput} label='badly'/>
          <RatingStarInput value={1} selectedValue={rating} onChange={handleRatingInput} label='terribly'/>
        </div>
        <textarea
          className='reviews__textarea form__textarea'
          id='review'
          name='review'
          placeholder='Tell how was your stay, what you like and what can be improved'
          value={comment}
          data-testid='review-textarea'
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)}
        >
        </textarea>
        <div className='reviews__button-wrapper'>
          <p className='reviews__help'>
            To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
          </p>
          <button
            className='reviews__submit form__submit button'
            type='submit'
            disabled={isFormInvalid}
            data-testid="submit-button"
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default AddReview;
