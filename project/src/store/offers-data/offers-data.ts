import { Actions, ActionType } from '../../types/store/actions';
import { OffersData } from '../../types/store/state';

const initialState: OffersData = {
  offers: [],
  isDataLoaded: false,
  nearByPlaces: [],
  offerDetails: undefined,
  favoriteOffers: [],
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
      const nearByPlaces = state.nearByPlaces.map((offer) => offer.id === action.payload.id ? action.payload : offer);
      const offerDetails = state.offerDetails?.id === action.payload.id ? action.payload : state.offerDetails;
      const favoriteOffers = state.favoriteOffers
        .map((offer) => offer.id === action.payload.id ? action.payload : offer)
        .filter((offer) => offer.isFavorite);

      return {
        ...state,
        offers,
        offerDetails,
        nearByPlaces,
        favoriteOffers,
      };
    }
    case ActionType.SetNearBy:
      return {
        ...state,
        nearByPlaces: action.payload,
      };
    case ActionType.SetOfferDetails:
      return {
        ...state,
        offerDetails: action.payload,
      };
    case ActionType.SetFavoriteOffers:
      return {
        ...state,
        favoriteOffers: action.payload.offers,
      };
    default:
      return state;
  }
};

export { offersData };
