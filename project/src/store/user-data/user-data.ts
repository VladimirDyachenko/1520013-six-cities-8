import { Actions, ActionType } from '../../types/store/actions';
import { UserData } from '../../types/store/state';
import { AuthorizationStatus } from '../../utils/const';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: undefined,
};

const userData = (state = initialState, action: Actions): UserData => {
  switch (action.type) {
    case ActionType.SetAuthorizationStatus:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.SetUserData:
      return {
        ...state,
        userData: action.payload,
      };
    case ActionType.LogOut:
      return {
        ...state,
        userData: undefined,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };
    default:
      return state;
  }
};

export { userData };
