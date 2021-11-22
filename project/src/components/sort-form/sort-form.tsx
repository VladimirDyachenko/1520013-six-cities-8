import { useState } from 'react';

type SortFormProps = {
  sortOptions: string[],
  selectedOption: string,
  handleChange: (a: string) => void,
}

function SortForm({sortOptions, selectedOption, handleChange}: SortFormProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const openListClassName = isOpen ? 'places__options--opened' : '';

  const onOptionClick = (selected: string) => {
    handleChange(selected);
    setIsOpen(false);
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by&nbsp;</span>
      <span
        className='places__sorting-type'
        tabIndex={0}
        onClick={() => setIsOpen((state) =>!state)}
        data-testid="current-sort"
      >
        {selectedOption}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${openListClassName}`}>
        {
          sortOptions.map((option) => (
            <li
              key={option}
              className={`places__option ${option === selectedOption ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => onOptionClick(option)}
            >
              {option}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default SortForm;
