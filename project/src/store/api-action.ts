import { ThunkActionResult } from '../types/store/actions';
import { loadOffers, setAuthorizationStatus, setUserData } from './action';
import { APIRoute, AuthorizationStatus } from '../utils/const';
import { AuthInfoRes, HotelRes } from '../types/api-response';
import { APIAdapter } from '../utils/adapter';
import { UserRequest } from '../types/api-request';
import { setToken } from '../services/token';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<HotelRes[]>(APIRoute.Hotels);
    const adaptedData = data.map(APIAdapter.offersToClient);
    dispatch(loadOffers(adaptedData));
  };


export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get<AuthInfoRes | undefined>(APIRoute.Login);
    if (data) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    }
  };

export const loginAction = ({ email, password }: UserRequest): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<AuthInfoRes | undefined>(APIRoute.Login, { email, password });
    if (data) {
      const adaptedData = APIAdapter.authInfoToClient(data);
      setToken(adaptedData.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserData(adaptedData));
    }
  };
