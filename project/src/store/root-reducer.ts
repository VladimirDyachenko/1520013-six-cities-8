import { combineReducers } from 'redux';
import { offersData } from './offers-data/offers-data';
import { offersList } from './offers-list/offers-list';
import { propertyComments } from './property-comments/property-comments';
import { userData } from './user-data/user-data';

export enum NameSpace {
  Comments = 'PROPERTY_COMMENTS',
  Data = 'OFFERS',
  OfferList = 'OFFER_LIST',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Comments]: propertyComments,
  [NameSpace.Data]: offersData,
  [NameSpace.OfferList]: offersList,
  [NameSpace.User]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
