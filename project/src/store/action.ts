import { Offer } from '../types/offer';
import { ActionType, SetCityAction, SetOffersAction } from '../types/store/actions';

export const setCity = (cityName: string): SetCityAction => ({
  type: ActionType.SetCity,
  payload: cityName,
});

export const setOffers = (offers: Offer[]): SetOffersAction => ({
  type: ActionType.SetOffers,
  payload: offers,
});
