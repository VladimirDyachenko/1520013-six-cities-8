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

export const INITIAL_CITY_NAME = 'Amsterdam';
