import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { PropertyPage } from './property-page';
import { generateFakeOffer } from '../../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../utils/const';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: PropertyPage', () => {
  beforeEach(() => {
    history.push('/test');
  });
  it('should render PropertyPage correctly when currentOffer is not loaded', () => {
    const fakeOffer = undefined;

    const propertyPageElement = (
      <Router history={history}>
        <Provider store={store}>
          <PropertyPage
            isAuthorized
            addPropertyComment={jest.fn()}
            currentOffer={fakeOffer}
            loadData={jest.fn()}
            nearBy={[]}
            onToggleFavorite={jest.fn}
            propertyComments={[]}
            resetData={jest.fn}
          />
        </Provider>
      </Router>
    );

    render(propertyPageElement);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });


  it('should render PropertyPage correctly when currentOffer loaded', () => {
    const fakeOffer = generateFakeOffer();

    const propertyPageElement = (
      <Router history={history}>
        <Provider store={store}>
          <PropertyPage
            isAuthorized
            addPropertyComment={jest.fn()}
            currentOffer={fakeOffer}
            loadData={jest.fn()}
            nearBy={[]}
            onToggleFavorite={jest.fn}
            propertyComments={[]}
            resetData={jest.fn}
          />
        </Provider>
      </Router>
    );

    render(propertyPageElement);
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });

});
