import { createSelector } from 'reselect';
import { Offer } from '../../types/offer';
import { State } from '../../types/store/state';
import { getSelectedCity } from '../offers-list/selectors';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;

export const getIsDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const getOffersForCity = createSelector(
  getOffers,
  getSelectedCity,
  (offers, city) => offers.filter((offer) => offer.city.name.toLowerCase() === city.toLowerCase()),
);

export const getNearByOffers = (state: State): Offer[] => state[NameSpace.Data].nearByPlaces;

export const getOfferDetails = (state: State): Offer | undefined => state[NameSpace.Data].offerDetails;

export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
