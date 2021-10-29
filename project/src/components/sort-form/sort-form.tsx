import { useState } from 'react';
import { IOfferSortOption } from '../../types/offer';

//TODO Сделать этот компонент универсальным
type SortFormProps = {
  sortOptions: IOfferSortOption[],
  selectedOption: IOfferSortOption,
  handleChange: (a: IOfferSortOption) => void,
}

function SortForm({sortOptions, selectedOption, handleChange}: SortFormProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const openListClassName = isOpen ? 'places__options--opened' : '';

  const onOptionClick = (selected: IOfferSortOption) => {
    handleChange(selected);
    setIsOpen(false);
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by&nbsp;</span>
      <span className='places__sorting-type' tabIndex={0} onClick={() => setIsOpen((state) =>!state)}>
        {selectedOption.name}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${openListClassName}`}>
        {
          sortOptions.map((option) => (
            <li
              key={option.name}
              className={`places__option ${option.name === selectedOption.name ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => onOptionClick(option)}
            >
              {option.name}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default SortForm;
