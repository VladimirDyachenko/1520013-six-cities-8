
type RatingStarInputProps = {
  value: number;
  selectedValue?: number,
  label: string,
  onChange: (value: number) => void;
};

function RatingStarInput({value, selectedValue, label, onChange}: RatingStarInputProps): JSX.Element {
  return (
    <>
      <input
        className='form__rating-input visually-hidden'
        name='rating'
        value={value}
        id={`${value}-stars`}
        type='radio'
        checked={selectedValue === value}
        onChange={() => onChange(value)}
        data-testid={`star-input-${value}`}
      />
      <label
        htmlFor={`${value}-stars`}
        className='reviews__rating-label form__rating-label'
        title={label}
      >
        <svg className='form__star-image' width='37' height='33'>
          <use xlinkHref='#icon-star'></use>
        </svg>
      </label>
    </>
  );
}

export default RatingStarInput;
