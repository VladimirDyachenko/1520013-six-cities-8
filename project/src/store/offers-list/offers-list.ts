import { Actions, ActionType } from '../../types/store/actions';
import { OffersList } from '../../types/store/state';
import { INITIAL_CITY_NAME, INITIAL_OFFERS_SORT_NAME } from '../../utils/const';

const initialState: OffersList = {
  cityName: INITIAL_CITY_NAME,
  selectedSort: INITIAL_OFFERS_SORT_NAME,
};

const offersList = (state = initialState, action: Actions): OffersList => {
  switch (action.type) {
    case ActionType.SetCity:
      return {
        ...state,
        cityName: action.payload,
      };
    case ActionType.SetSortName:
      return {
        ...state,
        selectedSort: action.payload,
      };
    default:
      return state;
  }
};

export { offersList };
