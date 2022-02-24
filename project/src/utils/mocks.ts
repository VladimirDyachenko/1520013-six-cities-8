import { address, datatype, internet, lorem, random } from 'faker';
import { Offer } from '../types/offer';
import { OfferType } from '../types/offer-type';
import { Comment } from '../types/comment';
import { PublicAuthInfo } from '../types/auth-info';
import { HotelRes } from '../types/api-response';

export const makeUniqueNumberGenerator = (min = 100) => (): number => min++;

const getUniqueNumber = makeUniqueNumberGenerator();

export const generateFakeUserProfile = (): PublicAuthInfo => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
});

export const generateFakeOffer = (id?: number, isFavorite?: boolean): Offer => ({
  bedrooms: datatype.number(5),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(20),
    },
    name: address.cityName(),
  },
  description: lorem.paragraph(),
  goods: lorem.slug().split(' '),
  host: generateFakeUserProfile(),
  id: id ? id: getUniqueNumber(),
  images: new Array(datatype.number({min: 1, max:10})).fill(null).map(() => internet.avatar()),
  isFavorite: isFavorite ? isFavorite : datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(20),
  },
  maxAdults: datatype.number(10),
  previewImage: random.image(),
  price: datatype.number(),
  rating: datatype.number(5),
  title: lorem.slug(3),
  type: random.objectElement(OfferType) as OfferType,
});

export const generateFakeComment = ():Comment => ({
  id: getUniqueNumber(),
  comment: lorem.sentences(),
  rating: datatype.number() + datatype.float(2),
  date: datatype.datetime().toString(),
  user: generateFakeUserProfile(),
});

export const generateFakeOfferApiRes = (id?: number, isFavorite?: boolean): HotelRes => ({
  'bedrooms': datatype.number(5),
  'city': {
    'location': {
      'latitude': Number(address.latitude()),
      'longitude': Number(address.longitude()),
      'zoom': datatype.number(20),
    },
    'name': address.cityName(),
  },
  'description': lorem.paragraph(),
  'goods': lorem.slug().split(' '),
  'host': {
    'avatarUrl': internet.avatar(),
    'id': datatype.number(),
    'isPro': datatype.boolean(),
    'name': internet.userName(),
  },
  'id': id ? id: getUniqueNumber(),
  'images': new Array(datatype.number({min: 1, max:10})).fill(null).map(() => internet.avatar()),
  'isFavorite': isFavorite ? isFavorite : datatype.boolean(),
  'isPremium': datatype.boolean(),
  'location': {
    'latitude': Number(address.latitude()),
    'longitude': Number(address.longitude()),
    'zoom': datatype.number(20),
  },
  'maxAdults': datatype.number(10),
  'previewImage': random.image(),
  'price': datatype.number(),
  'rating': datatype.number(5),
  'title': lorem.slug(3),
  'type': random.objectElement(OfferType) as OfferType,
});
