import { Comment } from '../../types/comment';
import { State } from '../../types/store/state';
import { NameSpace } from '../root-reducer';

export const getPropertyComments = (state: State): Comment[] => state[NameSpace.comments].propertyComments;
