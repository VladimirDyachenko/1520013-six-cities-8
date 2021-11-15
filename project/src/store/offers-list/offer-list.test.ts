import { address } from 'faker';
import { setCity } from '../action';
import { offersList } from './offers-list';
import { INITIAL_CITY_NAME } from '../../utils/const';

describe('Reducer: offersList', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersList(void 0, { type: ('UNKNOWN_ACTION') }))
      .toEqual({cityName: INITIAL_CITY_NAME});
  });

  it('should set cityName', () => {
    const state = {
      cityName: INITIAL_CITY_NAME,
    };
    const fakeCityName = address.cityName();

    expect(offersList(state, setCity(fakeCityName)))
      .toEqual({cityName: fakeCityName});
  });

});
