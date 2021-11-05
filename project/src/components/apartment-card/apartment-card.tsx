import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { HumaneFriendlyOfferType } from '../../types/offer-type';
import { AppRoute } from '../../utils/const';

type ApartmentCardProps = {
  offer: Offer;
  onMouseEnter?: (id: number) => void;
  isNearByCard?: boolean;
}

function ApartmentCard({offer, onMouseEnter, isNearByCard}: ApartmentCardProps): JSX.Element {
  const { id, isPremium, previewImage, price, isFavorite, rating, title, type } = offer;
  const favoriteButtonClassName = `place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`;
  const articleClassName = isNearByCard ? 'near-places__card place-card' : 'cities__place-card place-card';
  const imageWrapperClassName = isNearByCard ? 'near-places__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper';

  const mouseEnterHandler = () => {
    if (onMouseEnter !== undefined) {
      onMouseEnter(id);
    }
  };

  return (
    <article className={articleClassName} onMouseEnter={mouseEnterHandler}>
      {isPremium ?
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
        : ''}
      <div className={imageWrapperClassName}>
        <Link to={`${AppRoute.Room}/${id}`}>
          <img
            className='place-card__image'
            src={previewImage}
            width='260'
            height='200'
            alt='Place'
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>
              &#47;&nbsp;night
            </span>
          </div>
          <button
            className={favoriteButtonClassName}
            type='button'
          >
            <svg
              className='place-card__bookmark-icon'
              width='18'
              height='19'
            >
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: `${(rating / 10 * 100) * 2}%`}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`${AppRoute.Room}/${id}`}>{title}</Link>
        </h2>
        <p className='place-card__type'>{HumaneFriendlyOfferType[type]}</p>
      </div>
    </article>
  );
}

export default ApartmentCard;
