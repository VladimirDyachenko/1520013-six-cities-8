import { address } from 'faker';
import { setCity, setOfferSort } from '../action';
import { offersList } from './offers-list';
import { INITIAL_CITY_NAME, INITIAL_OFFERS_SORT_NAME } from '../../utils/const';
import { OfferSortOptionName } from '../../types/offer';

describe('Reducer: offersList', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersList(void 0, { type: ('UNKNOWN_ACTION') }))
      .toEqual({
        cityName: INITIAL_CITY_NAME,
        selectedSort: INITIAL_OFFERS_SORT_NAME,
      });
  });

  it('should set cityName', () => {
    const state = {
      cityName: INITIAL_CITY_NAME,
      selectedSort: INITIAL_OFFERS_SORT_NAME,
    };
    const fakeCityName = address.cityName();

    expect(offersList(state, setCity(fakeCityName)))
      .toEqual({
        cityName: fakeCityName,
        selectedSort: INITIAL_OFFERS_SORT_NAME,
      });
  });

  it('should set selectedSort', () => {
    const state = {
      cityName: INITIAL_CITY_NAME,
      selectedSort: INITIAL_OFFERS_SORT_NAME,
    };
    const fakeSortName = 'Fake sort';

    expect(offersList(state, setOfferSort(fakeSortName as OfferSortOptionName)))
      .toEqual({
        cityName: INITIAL_CITY_NAME,
        selectedSort: fakeSortName,
      });
  });

});
