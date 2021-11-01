import { OfferType } from './offer-type';

export type HotelRes = {
  'bedrooms': number;
  'city': CityRes;
  'description': string;
  'goods': string[];
  'host': PublicAuthInfoRes;
  'id': number;
  'images': string[];
  'is_favorite': boolean;
  'is_premium': boolean;
  'location': GeoLocationRes;
  'max_adults': number;
  'preview_image': string;
  'price': number;
  'rating': number;
  'title': string;
  'type': OfferType;
}

export type PublicAuthInfoRes = {
  'avatar_url': string;
  'id': number;
  'is_pro': boolean;
  'name': string;
}

export type CityRes = {
  'location': GeoLocationRes;
  'name': string;
}

export type GeoLocationRes = {
  'latitude': number;
  'longitude': number;
  'zoom': number;
}

export type CommentGetRes = {
  'comment': string;
  'date': string;
  'id': number;
  'rating': number;
  'user': PublicAuthInfoRes;
}

export type CommentPost = {
  'comment': string;
  'rating': number;
}

export type UserLogin = {
  'email': string;
  'password': string;
}

export type AuthInfoRes = {
  'avatar_url': string;
  'id': number;
  'is_pro': boolean;
  'name': string;
  'email': string;
  'token': string;
}
