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

export interface IOfferSortOption {
  name: string;
  sortFunction: (a: Offer, b: Offer) => number;
}
