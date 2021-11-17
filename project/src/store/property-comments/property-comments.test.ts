import { lorem, internet, datatype } from 'faker';
import { setPropertyComments } from '../action';
import { propertyComments } from './property-comments';

describe('Reducer: propertyComments', () => {
  it('without additional parameters should return initial state', () => {
    expect(propertyComments(void 0, { type: ('UNKNOWN_ACTION') }))
      .toEqual({propertyComments: []});
  });

  it('should set propertyComments', () => {
    const state = {
      propertyComments: [],
    };
    const fakeComments = new Array(datatype.number(15)).fill(null).map(() => ({
      id: datatype.number(),
      comment: lorem.paragraph(),
      rating: datatype.number(5),
      date: datatype.datetime().toString(),
      user: {
        avatarUrl: internet.avatar(),
        id: datatype.number(),
        isPro: datatype.boolean(),
        name: internet.userName(),
      },
    }));

    expect(propertyComments(state, setPropertyComments(fakeComments)))
      .toEqual({propertyComments: fakeComments});
  });

  it('should set propertyComments to empty array', () => {
    const fakeComments = new Array(datatype.number(15)).fill(null).map(() => ({
      id: datatype.number(),
      comment: lorem.paragraph(),
      rating: datatype.number(5),
      date: datatype.datetime().toString(),
      user: {
        avatarUrl: internet.avatar(),
        id: datatype.number(),
        isPro: datatype.boolean(),
        name: internet.userName(),
      },
    }));
    const state = {
      propertyComments: fakeComments,
    };

    expect(propertyComments(state, setPropertyComments([])))
      .toEqual({propertyComments: []});
  });
});
