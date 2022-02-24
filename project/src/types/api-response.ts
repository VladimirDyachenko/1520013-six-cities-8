import { OfferType } from './offer-type';

export type HotelRes = {
  'bedrooms': number;
  'city': CityRes;
  'description': string;
  'goods': string[];
  'host': PublicAuthInfoRes;
  'id': number;
  'images': string[];
  'isFavorite': boolean;
  'isPremium': boolean;
  'location': GeoLocationRes;
  'maxAdults': number;
  'previewImage': string;
  'price': number;
  'rating': number;
  'title': string;
  'type': OfferType;
};

export type PublicAuthInfoRes = {
  'avatarUrl': string;
  'id': number;
  'isPro': boolean;
  'name': string;
};

export type CityRes = {
  'location': GeoLocationRes;
  'name': string;
};

export type GeoLocationRes = {
  'latitude': number;
  'longitude': number;
  'zoom': number;
};

export type CommentGetRes = {
  'comment': string;
  'date': string;
  'id': number;
  'rating': number;
  'user': PublicAuthInfoRes;
};

export type UserLogin = {
  'email': string;
  'password': string;
};

export type AuthInfoRes = {
  'avatarUrl': string;
  'id': number;
  'isPro': boolean;
  'name': string;
  'email': string;
  'token': string;
};
