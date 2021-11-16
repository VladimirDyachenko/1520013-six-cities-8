import { render, screen } from '@testing-library/react';
import { datatype } from 'faker/locale/zh_TW';
import { offersSortOptions } from '../../utils/const';
import SortForm from './sort-form';

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

});
