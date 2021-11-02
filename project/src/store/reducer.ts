import { ActionType, Actions } from '../types/store/actions';
import { State } from '../types/store/state';
import { INITIAL_CITY_NAME } from '../utils/const';

const initialState: State = {
  cityName: INITIAL_CITY_NAME,
  offers: [],
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetCity:
      return {...state, cityName: action.payload};
    case ActionType.SetOffers:
      return {...state, offers: action.payload};
    case ActionType.LoadOffers:
      return {
        ...state,
        isDataLoaded: true,
        offers: action.payload.offers,
      };
    default:
      return state;
  }
};

export { reducer };
