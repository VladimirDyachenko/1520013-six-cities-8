import { render, screen } from '@testing-library/react';
import { datatype } from 'faker/locale/zh_TW';
import { offersSortOptions } from '../../utils/const';
import SortForm from './sort-form';
import userEvent from '@testing-library/user-event';

describe('Component: SortForm', () => {
  it('should render SortForm correctly', () => {
    const selectedSortOption = offersSortOptions[datatype.number({max: offersSortOptions.length - 1})];
    render(
      <SortForm
        sortOptions={offersSortOptions}
        selectedOption={selectedSortOption}
        handleChange={jest.fn()}
      />,
    );

    expect(screen.getByTestId('current-sort')).toHaveTextContent(`${selectedSortOption.name}`);
    expect(screen.queryAllByRole('listitem').length).toBe(offersSortOptions.length);
  });

  it('should open options list after click', () => {
    const selectedSortOption = offersSortOptions[datatype.number({max: offersSortOptions.length - 1})];
    const { baseElement } = render(
      <SortForm
        sortOptions={offersSortOptions}
        selectedOption={selectedSortOption}
        handleChange={jest.fn()}
      />,
    );

    userEvent.click(screen.getByTestId('current-sort'));
    expect(baseElement.querySelector('.places__options')).toHaveClass('places__options--opened');
  });

  it('should call "handleChange" callback', () => {
    const selectedSortOption = offersSortOptions[datatype.number({max: offersSortOptions.length - 1})];
    const handleChange = jest.fn();

    render(
      <SortForm
        sortOptions={offersSortOptions}
        selectedOption={selectedSortOption}
        handleChange={handleChange}
      />,
    );

    userEvent.click(screen.getAllByRole('listitem')[0]);
    expect(handleChange).toBeCalledWith(offersSortOptions[0]);
  });

});
