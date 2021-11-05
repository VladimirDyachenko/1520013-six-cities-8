import { ActionType, Actions } from '../types/store/actions';
import { State } from '../types/store/state';
import { AuthorizationStatus, INITIAL_CITY_NAME } from '../utils/const';

const initialState: State = {
  cityName: INITIAL_CITY_NAME,
  offers: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: undefined,
  propertyComments: [],
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
    case ActionType.SetAuthorizationStatus:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.SetUserData:
      return {
        ...state,
        userData: action.payload,
      };
    case ActionType.LogOut:
      return {
        ...state,
        userData: undefined,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };
    case ActionType.SetPropertyComments:
      return {
        ...state,
        propertyComments: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };
