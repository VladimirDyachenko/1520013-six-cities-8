import { Offer } from '../../types/offer';
import { HumaneFriendlyOfferType } from '../../types/offer-type';

type FavoritesCardProps = {
  offer: Offer
};

function FavoritesCard({offer}: FavoritesCardProps): JSX.Element {
  const { previewImage, price, rating, title, type } = offer;

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#temp">
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt="Place"
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating / 10 * 100 * 2}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#temp">{title}</a>
        </h2>
        <p className="place-card__type">{HumaneFriendlyOfferType[type]}</p>
      </div>
    </article>
  );
}

export default FavoritesCard;
