import { ThunkActionResult } from '../types/store/actions';
import { loadOffers } from './action';
import { APIRoute } from '../utils/const';
import { HotelRes } from '../types/api-response';
import { APIAdapter } from '../utils/adapter';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<HotelRes[]>(APIRoute.Hotels);
    const adaptedData = data.map(APIAdapter.offersToClient);
    dispatch(loadOffers(adaptedData));
  };
