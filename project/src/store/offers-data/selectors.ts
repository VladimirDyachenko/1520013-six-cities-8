import { createSelector } from 'reselect';
import { Offer } from '../../types/offer';
import { State } from '../../types/store/state';
import { offersSortOptions } from '../../utils/const';
import { getSelectedCity, getSelectedSort } from '../offers-list/selectors';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;

export const getIsDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const getOffersForCity = createSelector(
  getOffers,
  getSelectedCity,
  getSelectedSort,
  (offers, city, sortName) => {
    const sortOption = offersSortOptions.find((option) => option.name === sortName);
    const offersForCity = offers.filter((offer) => offer.city.name.toLowerCase() === city.toLowerCase());
    if (sortOption) {
      offersForCity.sort(sortOption.sortFunction);
    }

    return offersForCity;
  },
);

export const getNearByOffers = (state: State): Offer[] => state[NameSpace.Data].nearByPlaces;

export const getOfferDetails = (state: State): Offer | undefined => state[NameSpace.Data].offerDetails;

export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
