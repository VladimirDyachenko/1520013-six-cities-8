import { Actions, ActionType } from '../../types/store/actions';
import { PropertyComments } from '../../types/store/state';

const initialState: PropertyComments = {
  propertyComments: [],
};

const propertyComments = (state = initialState, action: Actions): PropertyComments => {
  switch (action.type) {
    case ActionType.SetPropertyComments:
      return {
        ...state,
        propertyComments: action.payload,
      };
    default:
      return state;
  }
};

export { propertyComments };
