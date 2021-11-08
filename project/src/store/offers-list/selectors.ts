import { State } from '../../types/store/state';
import { NameSpace } from '../root-reducer';

export const getSelectedCity = (state: State): string => state[NameSpace.offerList].cityName;
