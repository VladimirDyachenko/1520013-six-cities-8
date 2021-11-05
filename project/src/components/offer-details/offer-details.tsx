import { useMemo, useState } from 'react';
import { Comment } from '../../types/comment';
import { Offer } from '../../types/offer';
import { HumaneFriendlyOfferType } from '../../types/offer-type';
import Map from '../map/map';
import ReviewList from '../review-list/review-list';

type OfferDetailsProps = {
  offer: Offer;
  comments: Comment[],
  nearOffers: Offer[],
}

function OfferDetails({offer, comments, nearOffers }: OfferDetailsProps): JSX.Element {
  const [images, setImages] = useState<Array<string>>([]);
  useMemo(() => {
    setImages(offer.images.slice(0, Math.min(offer.images.length, 6)));
  }, [offer]);

  return (
    <section className='property'>
      <div className='property__gallery-container container'>
        <div className='property__gallery'>
          {images.map((image) => (
            <div key={image} className='property__image-wrapper'>
              <img className='property__image' src={image} alt='Apartment'/>
            </div>
          ))}
        </div>
      </div>
      <div className='property__container container'>
        <div className='property__wrapper'>
          {
            offer.isPremium &&
            <div className='property__mark'>
              <span>Premium</span>
            </div>
          }
          <div className='property__name-wrapper'>
            <h1 className='property__name'>
              {offer.title}
            </h1>
            <button className='property__bookmark-button button' type='button'>
              <svg className='property__bookmark-icon' width='31' height='33'>
                <use xlinkHref='#icon-bookmark'></use>
              </svg>
              <span className='visually-hidden'>To bookmarks</span>
            </button>
          </div>
          <div className='property__rating rating'>
            <div className='property__stars rating__stars'>
              <span style={{width: '80%'}}></span>
              <span className='visually-hidden'>Rating</span>
            </div>
            <span className='property__rating-value rating__value'>4.8</span>
          </div>
          <ul className='property__features'>
            <li className='property__feature property__feature--entire'>
              {HumaneFriendlyOfferType[offer.type]}
            </li>
            <li className='property__feature property__feature--bedrooms'>
              {offer.bedrooms} Bedrooms
            </li>
            <li className='property__feature property__feature--adults'>
              Max {offer.maxAdults} adults
            </li>
          </ul>
          <div className='property__price'>
            <b className='property__price-value'>&euro;{offer.price}</b>
            <span className='property__price-text'>&nbsp;night</span>
          </div>
          <div className='property__inside'>
            <h2 className='property__inside-title'>What&apos;s inside</h2>
            <ul className='property__inside-list'>
              {offer.goods.map((good) => <li key={good} className='property__inside-item'>{good}</li>) }
            </ul>
          </div>
          <div className='property__host'>
            <h2 className='property__host-title'>Meet the host</h2>
            <div className='property__host-user user'>
              <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
                <img className='property__avatar user__avatar' src={offer.host.avatarUrl} width='74' height='74' alt='Host avatar'/>
              </div>
              <span className='property__user-name'>
                {offer.host.name}
              </span>
              {
                offer.host.isPro
                && <span className='property__user-status'>Pro</span>
              }
            </div>
            <div className='property__description'>
              <p className='property__text'>
                {offer.description}
              </p>
            </div>
          </div>
          <ReviewList reviews={comments}/>
        </div>
      </div>
      <Map city={offer.city.location} offers={nearOffers} activeOfferId={offer.id} className='property__map'/>
    </section>
  );
}

export default OfferDetails;
