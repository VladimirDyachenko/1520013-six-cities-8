import { address, datatype, lorem, internet, random } from 'faker';
import { loadOffers, setFavoriteOffers, setNearByOffers, setOfferDetails, setOffers, updateOffer } from '../action';
import { offersData } from './offers-data';
import { OffersData } from '../../types/store/state';
import { Offer } from '../../types/offer';
import { OfferType } from '../../types/offer-type';

const makeUniqueNumberGenerator = (min = 100) => () => min++;

const getUniqueNumber = makeUniqueNumberGenerator();

const generateFakeOffer = (id?: number, isFavorite?: boolean): Offer => ({
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
  goods: lorem.words().split(' '),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
  id: id ? id: getUniqueNumber(),
  images: new Array(datatype.number(10)).fill(null).map(() => internet.avatar()),
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

describe('Reducer: offersData', () => {
  it('without additional parameters should return initial state', () => {
    const state: OffersData = {
      offers: [],
      isDataLoaded: false,
      nearByPlaces: [],
      offerDetails: undefined,
      favoriteOffers: [],
    };
    expect(offersData(void 0, { type: ('UNKNOWN_ACTION') }))
      .toEqual(state);
  });

  it('should set isDataLoaded to "true" and set offers', () => {
    const state: OffersData = {
      offers: [],
      isDataLoaded: false,
      nearByPlaces: [],
      offerDetails: undefined,
      favoriteOffers: [],
    };

    const fakeOffer = generateFakeOffer();

    expect(offersData(state, loadOffers([fakeOffer])))
      .toEqual({
        offers: [fakeOffer],
        isDataLoaded: true,
        nearByPlaces: [],
        offerDetails: undefined,
        favoriteOffers: [],
      });
  });

  it('should set offers', () => {
    const state: OffersData = {
      offers: [],
      isDataLoaded: true,
      nearByPlaces: [],
      offerDetails: undefined,
      favoriteOffers: [],
    };

    const fakeOffers = new Array(datatype.number(20)).fill(null).map(() => generateFakeOffer());

    expect(offersData(state, setOffers(fakeOffers)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        nearByPlaces: [],
        offerDetails: undefined,
        favoriteOffers: [],
      });
  });

  it('should set nearByPlaces', () => {
    const fakeOffers = new Array(10).fill(null).map(() => generateFakeOffer());
    const state: OffersData = {
      offers: fakeOffers,
      isDataLoaded: true,
      nearByPlaces: [],
      offerDetails: undefined,
      favoriteOffers: [],
    };
    const fakeNearByPlaces = new Array(10).fill(null).map(() => generateFakeOffer());

    expect(offersData(state, setNearByOffers(fakeNearByPlaces)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        nearByPlaces: fakeNearByPlaces,
        offerDetails: undefined,
        favoriteOffers: [],
      });
  });

  it('should set offerDetails', () => {
    const fakeOffers = new Array(10).fill(null).map(() => generateFakeOffer());
    const fakeNearByPlaces = new Array(10).fill(null).map(() => generateFakeOffer());
    const state: OffersData = {
      offers: fakeOffers,
      isDataLoaded: true,
      nearByPlaces: fakeNearByPlaces,
      offerDetails: undefined,
      favoriteOffers: [],
    };

    const fakeOfferDetails = generateFakeOffer();

    expect(offersData(state, setOfferDetails(fakeOfferDetails)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        nearByPlaces: fakeNearByPlaces,
        offerDetails: fakeOfferDetails,
        favoriteOffers: [],
      });
  });

  it('should set favoriteOffers', () => {
    const fakeOffers = new Array(10).fill(null).map(() => generateFakeOffer());
    const fakeNearByPlaces = new Array(10).fill(null).map(() => generateFakeOffer());
    const fakeOfferDetails = generateFakeOffer();
    const state: OffersData = {
      offers: fakeOffers,
      isDataLoaded: true,
      nearByPlaces: fakeNearByPlaces,
      offerDetails: fakeOfferDetails,
      favoriteOffers: [],
    };
    const fakeFavoriteOffers = new Array(4).fill(null).map(() => generateFakeOffer(undefined, true));

    expect(offersData(state, setFavoriteOffers(fakeFavoriteOffers)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        nearByPlaces: fakeNearByPlaces,
        offerDetails: fakeOfferDetails,
        favoriteOffers: fakeFavoriteOffers,
      });
  });

  it('should update offer with same id in "offers"', () => {
    const fakeOfferToBeUpdated = generateFakeOffer(1, false);
    const fakeOffers = new Array(10).fill(null).map(() => generateFakeOffer());

    const state: OffersData = {
      isDataLoaded: true,
      offers: [fakeOfferToBeUpdated, ...fakeOffers],
      nearByPlaces: [],
      offerDetails: undefined,
      favoriteOffers: [],
    };

    const fakeUpdatedOffer: Offer = JSON.parse(JSON.stringify(fakeOfferToBeUpdated));
    fakeUpdatedOffer.isFavorite = true;
    fakeUpdatedOffer.title = 'New Title';

    expect(offersData(state, updateOffer(fakeUpdatedOffer)))
      .toEqual({
        isDataLoaded: true,
        offers: [fakeUpdatedOffer, ...fakeOffers],
        nearByPlaces: [],
        offerDetails: undefined,
        favoriteOffers: [],
      });
  });

  it('should update offer with same id in "nearByPlaces"', () => {
    const fakeOfferToBeUpdated = generateFakeOffer(1, false);
    const fakeOffers = new Array(10).fill(null).map(() => generateFakeOffer());

    const state: OffersData = {
      isDataLoaded: true,
      offers: [],
      nearByPlaces: [fakeOfferToBeUpdated, ...fakeOffers],
      offerDetails: undefined,
      favoriteOffers: [],
    };

    const fakeUpdatedOffer: Offer = JSON.parse(JSON.stringify(fakeOfferToBeUpdated));
    fakeUpdatedOffer.isFavorite = true;
    fakeUpdatedOffer.title = 'New Title';

    expect(offersData(state, updateOffer(fakeUpdatedOffer)))
      .toEqual({
        isDataLoaded: true,
        offers: [],
        nearByPlaces: [fakeUpdatedOffer, ...fakeOffers],
        offerDetails: undefined,
        favoriteOffers: [],
      });
  });

  it('should update offer with same id in "offerDetails"', () => {
    const fakeOfferToBeUpdated = generateFakeOffer(1, false);

    const state: OffersData = {
      isDataLoaded: true,
      offers: [],
      nearByPlaces: [],
      offerDetails: fakeOfferToBeUpdated,
      favoriteOffers: [],
    };

    const fakeUpdatedOffer: Offer = JSON.parse(JSON.stringify(fakeOfferToBeUpdated));
    fakeUpdatedOffer.isFavorite = true;
    fakeUpdatedOffer.title = 'New Title';

    expect(offersData(state, updateOffer(fakeUpdatedOffer)))
      .toEqual({
        isDataLoaded: true,
        offers: [],
        nearByPlaces: [],
        offerDetails: fakeUpdatedOffer,
        favoriteOffers: [],
      });
  });

  it('should update offer with same id in "favoriteOffers"', () => {
    const fakeOfferToBeUpdated = generateFakeOffer(1, false);
    const fakeOffers = new Array(datatype.number(20)).fill(null).map(() => generateFakeOffer(undefined, true));

    const state: OffersData = {
      isDataLoaded: true,
      offers: [],
      nearByPlaces: [],
      offerDetails: undefined,
      favoriteOffers: [fakeOfferToBeUpdated, ...fakeOffers],
    };

    const fakeUpdatedOffer: Offer = JSON.parse(JSON.stringify(fakeOfferToBeUpdated));
    fakeUpdatedOffer.isFavorite = true;
    fakeUpdatedOffer.title = 'New Title';

    expect(offersData(state, updateOffer(fakeUpdatedOffer)))
      .toEqual({
        isDataLoaded: true,
        offers: [],
        nearByPlaces: [],
        offerDetails: undefined,
        favoriteOffers: [fakeUpdatedOffer, ...fakeOffers],
      });
  });

  it('should update offer with same id in "offers", "offerDetails", "nearByPlaces" and "favoriteOffers"', () => {
    const fakeOfferToBeUpdated = generateFakeOffer(1, false);
    const fakeOffers = new Array(10).fill(null).map(() => generateFakeOffer());
    const fakeNearByPlaces = new Array(10).fill(null).map(() => generateFakeOffer());
    const fakeOfferDetails = fakeOfferToBeUpdated;
    const fakeFavoriteOffers = new Array(4).fill(null).map(() => generateFakeOffer(undefined, true));

    const state: OffersData = {
      isDataLoaded: true,
      offers: [fakeOfferToBeUpdated, ...fakeOffers],
      nearByPlaces: [fakeOfferToBeUpdated, ...fakeNearByPlaces],
      offerDetails: fakeOfferDetails,
      favoriteOffers: [fakeOfferToBeUpdated, ...fakeFavoriteOffers],
    };

    const fakeUpdatedOffer: Offer = JSON.parse(JSON.stringify(fakeOfferToBeUpdated));
    fakeUpdatedOffer.isFavorite = true;
    fakeUpdatedOffer.title = 'New Title';

    expect(offersData(state, updateOffer(fakeUpdatedOffer)))
      .toEqual({
        isDataLoaded: true,
        offers: [fakeUpdatedOffer, ...fakeOffers],
        nearByPlaces: [fakeUpdatedOffer, ...fakeNearByPlaces],
        offerDetails: fakeUpdatedOffer,
        favoriteOffers: [fakeUpdatedOffer, ...fakeFavoriteOffers],
      });
  });

});
