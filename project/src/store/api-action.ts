import { ThunkActionResult } from '../types/store/actions';
import { loadOffers, setAuthorizationStatus } from './action';
import { APIRoute, AuthorizationStatus } from '../utils/const';
import { AuthInfoRes, HotelRes } from '../types/api-response';
import { APIAdapter } from '../utils/adapter';

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
