import { ThunkActionResult } from '../types/store/actions';
import { loadOffers, logOut, redirectToRoute, setAuthorizationStatus, setFavoriteOffers, setNearByOffers, setOfferDetails, setPropertyComments, setUserData, updateOffer } from './action';
import { APIRoute, AppRoute, AuthorizationStatus, HttpCode } from '../utils/const';
import { AuthInfoRes, CommentGetRes, HotelRes } from '../types/api-response';
import { APIAdapter } from '../utils/adapter';
import { CommentPost, UserRequest } from '../types/api-request';
import { dropToken, setToken } from '../services/token';
import axios from 'axios';

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

export const loadPropertyCommentsAction = (offerId: number): ThunkActionResult =>
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

export const addPropertyCommentsAction = (offerId: number, comment: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<CommentGetRes[] | undefined>(`${APIRoute.Comments}/${offerId}`, comment);
      if (data) {
        const comments = data.map(APIAdapter.commentToClient);
        dispatch(setPropertyComments(comments));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.Unauthorized) {
          dispatch(redirectToRoute(AppRoute.SignIn));
        }
      }
    }
  };

export const toggleFavoriteStatus = (offerId: number, isFavorite: boolean): ThunkActionResult =>
  async (dispatch, _getState, api) => {

    const newFavoriteStatus = isFavorite ? 1 : 0;
    try {
      const { data } = await api.post<HotelRes | undefined>(`${APIRoute.Favorite}/${offerId}/${newFavoriteStatus}`);
      if (data) {
        const adaptedOffer = APIAdapter.offersToClient(data);
        dispatch(updateOffer(adaptedOffer));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.Unauthorized) {
          dispatch(redirectToRoute(AppRoute.SignIn));
        }
      }
    }
  };

export const loadNearByAction = (offerId: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<HotelRes[] | undefined>(`${APIRoute.Hotels}/${offerId}/nearby`);
      if (data) {
        const adaptedOffers = data.map(APIAdapter.offersToClient);
        dispatch(setNearByOffers(adaptedOffers));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

export const loadOfferDetailsAction = (offerId: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<HotelRes | undefined>(`${APIRoute.Hotels}/${offerId}`);
      if (data) {
        const adaptedOffer = APIAdapter.offersToClient(data);
        dispatch(setOfferDetails(adaptedOffer));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<HotelRes[]>(APIRoute.Favorite);
      const adaptedData = data.map(APIAdapter.offersToClient);
      dispatch(setFavoriteOffers(adaptedData));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.Unauthorized) {
          dispatch(redirectToRoute(AppRoute.SignIn));
        }
      }
    }
  };
