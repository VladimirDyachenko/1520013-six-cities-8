import { PublicAuthInfo } from './auth-info';
import { GeoLocation } from './geo-location';
import { OfferType } from './offer-type';

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: PublicAuthInfo;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: GeoLocation
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: OfferType;
}

export type City = {
  location: GeoLocation;
  name: string;
}

export type OfferSortOptionName =
  'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

export interface IOfferSortOption {
  name: OfferSortOptionName;
  sortFunction: (a: Offer, b: Offer) => number;
}
