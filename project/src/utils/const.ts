import { Offer, IOfferSortOption } from '../types/offer';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  NotFound = '/404',
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

export enum AvailableCity {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const INITIAL_CITY_NAME = AvailableCity.Paris;

export const offersSortOptions: IOfferSortOption[] = [
  {
    name: 'Popular',
    sortFunction(_: Offer, __: Offer): number { return 0; },
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
  Login = '/login',
  LogOut = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export const BACKEND_URL = 'https://8.react.pages.academy/six-cities';

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

//https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
export const emailRegExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

//1 цифра и 1 буква латинского алфавита
export const passwordRegExp = new RegExp(/([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*/, 'g');
