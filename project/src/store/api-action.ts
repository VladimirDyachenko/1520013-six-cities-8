import { ThunkActionResult } from '../types/store/actions';
import { loadOffers, logOut, setAuthorizationStatus, setPropertyComments, setUserData } from './action';
import { APIRoute, AuthorizationStatus } from '../utils/const';
import { AuthInfoRes, CommentGetRes, HotelRes } from '../types/api-response';
import { APIAdapter } from '../utils/adapter';
import { CommentPost, UserRequest } from '../types/api-request';
import { dropToken, setToken } from '../services/token';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<HotelRes[]>(APIRoute.Hotels);
    const adaptedData = data.map(APIAdapter.offersToClient);
    dispatch(loadOffers(adaptedData));
  };


export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<AuthInfoRes | undefined>(APIRoute.Login);
      if (data) {
        const adaptedData = APIAdapter.authInfoToClient(data);
        dispatch(setUserData(adaptedData));
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      }
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  };

export const loginAction = ({ email, password }: UserRequest): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<AuthInfoRes | undefined>(APIRoute.Login, { email, password });
      if (data) {
        const adaptedData = APIAdapter.authInfoToClient(data);
        setToken(adaptedData.token);
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUserData(adaptedData));
      }
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  };

export const logOutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.LogOut);
    dropToken();
    dispatch(logOut());
  };

export const loadPropertyComments = (offerId: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<CommentGetRes[] | undefined>(`${APIRoute.Comments}/${offerId}`);
      if (data) {
        const comments = data.map(APIAdapter.commentToClient);
        dispatch(setPropertyComments(comments));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

export const addPropertyComments = (offerId: number, comment: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<CommentGetRes[] | undefined>(`${APIRoute.Comments}/${offerId}`, comment);
      if (data) {
        const comments = data.map(APIAdapter.commentToClient);
        dispatch(setPropertyComments(comments));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
