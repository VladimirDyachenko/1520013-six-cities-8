import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { generateFakeOffer } from '../../utils/mocks';
import ApartmentCardsList from './apartment-cards-list';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { datatype } from 'faker';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});
describe('Component: ApartmentCardList', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render ApartmentCardList correctly', () => {
    const fakeOffer = new Array(datatype.number({min: 1, max: 10})).fill(null).map(() => generateFakeOffer());

    render(
      <Provider store={store}>
        <Router history={history}>
          <ApartmentCardsList offers={fakeOffer} setActiveOfferId={jest.fn()}/>
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('article').length).toBe(fakeOffer.length);
  });
});
