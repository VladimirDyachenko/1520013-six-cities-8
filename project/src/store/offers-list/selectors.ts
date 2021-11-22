import { State } from '../../types/store/state';
import { NameSpace } from '../root-reducer';

export const getSelectedCity = (state: State): string => state[NameSpace.OfferList].cityName;

export const getSelectedSort = (state: State): string => state[NameSpace.OfferList].selectedSort;
