import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import ApartmentCard from '../../apartment-card/apartment-card';
import OfferDetails from '../../offer-details/offer-details';
import Header from '../../header/header';
import { State } from '../../../types/store/state';
import { ThunkAppDispatch } from '../../../types/store/actions';
import { CommentPost } from '../../../types/api-request';
import { addPropertyCommentsAction, loadNearByAction, loadOfferDetailsAction, loadPropertyCommentsAction, toggleFavoriteStatusAction } from '../../../store/api-action';
import { connect, ConnectedProps } from 'react-redux';
import { getIsAuthorized } from '../../../store/user-data/selectors';
import { getPropertyComments } from '../../../store/property-comments/selectors';
import { getNearByOffers, getOfferDetails } from '../../../store/offers-data/selectors';
import { setNearByOffers, setOfferDetails, setPropertyComments } from '../../../store/action';
import LoadingScreen from '../../loading-screen/loading-screen';

type RouterParams = {
  id: string;
};

const mapStateToProps = (state: State) => ({
  isAuthorized: getIsAuthorized(state),
  propertyComments: getPropertyComments(state),
  nearBy: getNearByOffers(state),
  currentOffer: getOfferDetails(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  addPropertyComment(offerId: number, comment: CommentPost) {
    dispatch(addPropertyCommentsAction(offerId, comment));
  },
  loadData(offerId: number) {
    dispatch(loadPropertyCommentsAction(offerId));
    dispatch(loadNearByAction(offerId));
    dispatch(loadOfferDetailsAction(offerId));
  },
  resetData() {
    dispatch(setPropertyComments([]));
    dispatch(setOfferDetails(undefined));
    dispatch(setNearByOffers([]));
  },
  onToggleFavorite(offerId: number, isFavorite: boolean) {
    dispatch(toggleFavoriteStatusAction(offerId, isFavorite));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function PropertyPage(props: ConnectedComponentProps): JSX.Element {
  const {
    isAuthorized,
    propertyComments,
    nearBy,
    currentOffer,
    addPropertyComment,
    loadData,
    resetData,
    onToggleFavorite,
  } = props;
  const params = useParams<RouterParams>();

  const addCommentHandler = useCallback((comment: CommentPost) => {
    addPropertyComment(Number(params.id), comment);
  }, [params.id, addPropertyComment]);

  useEffect(() => {
    loadData(Number(params.id));

    return () => resetData();
  }, [params.id, loadData, resetData]);

  return (
    <div className='page'>
      <Header/>
      <main className='page__main page__main--property'>
        {currentOffer ? (
          <OfferDetails
            offer={currentOffer}
            comments={propertyComments}
            nearOffers={nearBy}
            isAuthorized={isAuthorized}
            addCommentHandler={addCommentHandler}
            onToggleFavorite={onToggleFavorite}
          />
        ) : <LoadingScreen/>}

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
