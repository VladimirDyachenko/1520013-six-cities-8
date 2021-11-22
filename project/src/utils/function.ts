import { OfferType } from '../types/offer-type';

export const floorRating = (rating: number): number => {
  if (rating % 1 === 0) {
    return rating;
  }

  return rating % 1 < 0.5 ? Math.floor(rating) : Math.ceil(rating);
};

export const getHumaneFriendlyOfferType = (offerType: OfferType): string => {
  switch (offerType) {
    case OfferType.Apartment:
      return 'Apartment';
    case OfferType.Room:
      return 'Private Room';
    case OfferType.House:
      return 'House';
    case OfferType.Hotel:
      return 'Hotel';
    default:
      throw new Error(`Missing offer type: ${offerType}`);
  }
};
