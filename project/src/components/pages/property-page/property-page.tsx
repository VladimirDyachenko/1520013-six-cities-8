import { useFetch } from '../../../hooks/useFetch';
import { HotelRes } from '../../../types/api-response';
import { useCallback, useEffect, useState } from 'react';
import { Offer } from '../../../types/offer';
import { APIAdapter } from '../../../utils/adapter';
import { useHistory, useParams } from 'react-router';
import { APIRoute, AppRoute, HttpCode } from '../../../utils/const';
import ApartmentCard from '../../apartment-card/apartment-card';
import OfferDetails from '../../offer-details/offer-details';
import Header from '../../header/header';
import { State } from '../../../types/store/state';
import { ThunkAppDispatch } from '../../../types/store/actions';
import { CommentPost } from '../../../types/api-request';
import { addPropertyComments, loadPropertyComments } from '../../../store/api-action';
import { connect, ConnectedProps } from 'react-redux';
import { getIsAuthorized } from '../../../store/user-data/selectors';
import { getPropertyComments } from '../../../store/property-comments/selectors';

type RouterParams = {
  id: string;
};

const mapStateToProps = (state: State) => ({
  isAuthorized: getIsAuthorized(state),
  propertyComments: getPropertyComments(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  addPropertyComment(offerId: number, comment: CommentPost) {
    dispatch(addPropertyComments(offerId, comment));
  },
  loadComments(offerId: number) {
    dispatch(loadPropertyComments(offerId));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function PropertyPage(props: ConnectedComponentProps): JSX.Element {
  const { isAuthorized, propertyComments, addPropertyComment, loadComments } = props;
  const params = useParams<RouterParams>();
  const routerHistory = useHistory();
  const { data: offerDetailsRes, errorCode: offerErrorCode } = useFetch<HotelRes>(`${APIRoute.Hotels}/${params.id}`);
  const { data: nearByRes } = useFetch<HotelRes[]>(`${APIRoute.Hotels}/${params.id}/nearby`);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [nearBy, setNearBy] = useState<Offer[]>([]);
  const addCommentHandler = useCallback((comment: CommentPost) => {
    addPropertyComment(Number(params.id), comment);
  }, [params.id, addPropertyComment]);

  useEffect(() => {
    offerDetailsRes ? setCurrentOffer(APIAdapter.offersToClient(offerDetailsRes)) : setCurrentOffer(null);
  }, [offerDetailsRes]);

  useEffect(() => {
    if (offerErrorCode === HttpCode.NotFound) {
      routerHistory.push(AppRoute.NotFound);
    }
  }, [offerErrorCode, routerHistory]);

  useEffect(() => {
    nearByRes ? setNearBy(nearByRes.map(APIAdapter.offersToClient)) : setNearBy([]);
  }, [nearByRes]);

  useEffect(() => {
    loadComments(Number(params.id));
  }, [params.id, loadComments]);

  return (
    <div className='page'>
      <Header/>
      <main className='page__main page__main--property'>
        {currentOffer && (
          <OfferDetails
            offer={currentOffer}
            comments={propertyComments}
            nearOffers={nearBy}
            isAuthorized={isAuthorized}
            addCommentHandler={addCommentHandler}
          />
        )}

        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              {nearBy.map((offer) => <ApartmentCard key={offer.id} offer={offer} isNearByCard/>)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { PropertyPage };
export default connector(PropertyPage);
