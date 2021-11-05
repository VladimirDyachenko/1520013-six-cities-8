import { useFetch } from '../../../hooks/useFetch';
import { CommentGetRes, HotelRes } from '../../../types/api-response';
import { useEffect, useState } from 'react';
import { Offer } from '../../../types/offer';
import { APIAdapter } from '../../../utils/adapter';
import { useHistory, useParams } from 'react-router';
import { APIRoute, AppRoute, HttpCode } from '../../../utils/const';
import ApartmentCard from '../../apartment-card/apartment-card';
import OfferDetails from '../../offer-details/offer-details';
import Header from '../../header/header';
import { Comment } from '../../../types/comment';

type RouterParams = {
  id: string;
};

function PropertyPage(): JSX.Element {
  const params = useParams<RouterParams>();
  const routerHistory = useHistory();
  const { data: offerDetailsRes, errorCode: offerErrorCode } = useFetch<HotelRes>(`${APIRoute.Hotels}/${params.id}`);
  const { data: nearByRes } = useFetch<HotelRes[]>(`${APIRoute.Hotels}/${params.id}/nearby`);
  const { data: commentRes } = useFetch<CommentGetRes[]>(`${APIRoute.Comments}/${params.id}`);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [nearBy, setNearBy] = useState<Offer[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

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
    commentRes ? setComments(commentRes.map(APIAdapter.commentToClient)) : setComments([]);
  }, [commentRes]);

  return (
    <div className='page'>
      <Header/>
      <main className='page__main page__main--property'>
        {currentOffer && <OfferDetails offer={currentOffer} comments={comments} nearOffers={nearBy}/>}

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

export default PropertyPage;
