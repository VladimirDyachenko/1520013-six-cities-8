import { createSelector } from 'reselect';
import { Comment } from '../../types/comment';
import { State } from '../../types/store/state';
import { NameSpace } from '../root-reducer';

export const getAllPropertyComments = (state: State): Comment[] => state[NameSpace.Comments].propertyComments;

const getLimit = (_: State, limit = 10) => limit;

export const getPropertyComments = createSelector(
  getAllPropertyComments,
  getLimit,
  (comments, limit) => (
    [...comments]
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .slice(0, limit)
  ),
);
