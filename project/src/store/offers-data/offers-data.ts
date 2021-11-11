import { Actions, ActionType } from '../../types/store/actions';
import { OffersData } from '../../types/store/state';

const initialState: OffersData = {
  offers: [],
  isDataLoaded: false,
};

const offersData = (state = initialState, action: Actions): OffersData => {
  switch (action.type) {
    case ActionType.LoadOffers:
      return {
        ...state,
        isDataLoaded: true,
        offers: action.payload.offers,
      };
    case ActionType.SetOffers:
      return {
        ...state,
        offers: action.payload,
      };
    case ActionType.UpdateOffer: {
      const offers = state.offers.map((offer) => offer.id === action.payload.id ? action.payload : offer);
      return {
        ...state,
        offers: offers,
      };
    }
    default:
      return state;
  }
};

export { offersData };
