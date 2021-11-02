import { Offer, IOfferSortOption } from '../types/offer';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const defaultMapIcon = {
  iconUrl: './img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
};

export const selectedMapIcon = {
  iconUrl: './img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
};

export const INITIAL_CITY_NAME = 'Paris';

export enum AvailableCity {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const offersSortOptions: IOfferSortOption[] = [
  {
    name: 'Popular',
    sortFunction(a: Offer, b: Offer): number { return 0; },
  },
  {
    name: 'Price: low to high',
    sortFunction(a: Offer, b: Offer): number { return a.price - b.price; },
  },
  {
    name: 'Price: high to low',
    sortFunction(a: Offer, b: Offer): number { return b.price - a.price; },
  },
  {
    name: 'Top rated first',
    sortFunction(a: Offer, b: Offer): number { return b.rating - a.rating; },
  },
];

export enum APIRoute {
  Hotels = '/hotels',
}
