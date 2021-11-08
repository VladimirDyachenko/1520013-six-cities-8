import { combineReducers } from 'redux';
import { offersData } from './offers-data/offers-data';
import { offersList } from './offers-list/offers-list';
import { propertyComments } from './property-comments/property-comments';
import { userData } from './user-data/user-data';

export enum NameSpace {
  comments = 'PROPERTY_COMMENTS',
  data = 'OFFERS',
  offerList = 'OFFER_LIST',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.comments]: propertyComments,
  [NameSpace.data]: offersData,
  [NameSpace.offerList]: offersList,
  [NameSpace.user]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
