import { Offer } from '../offer';

export enum ActionType {
  SetCity = 'city/setCity',
  SetOffers = 'offers/setOffers',
}

export type SetCityAction = {
  type: ActionType.SetCity,
  payload: string,
}

export type SetOffersAction = {
  type: ActionType.SetOffers,
  payload: Offer[],
}

export type Actions = SetCityAction | SetOffersAction;
