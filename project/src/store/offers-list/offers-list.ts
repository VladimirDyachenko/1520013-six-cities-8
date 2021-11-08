import { Actions, ActionType } from '../../types/store/actions';
import { OffersList } from '../../types/store/state';
import { INITIAL_CITY_NAME } from '../../utils/const';

const initialState: OffersList = {
  cityName: INITIAL_CITY_NAME,
};

const offersList = (state = initialState, action: Actions): OffersList => {
  switch (action.type) {
    case ActionType.SetCity:
      return {
        ...state,
        cityName: action.payload,
      };
    default:
      return state;
  }
};

export { offersList };
