import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavoriteStatus } from '../../store/api-action';
import { Offer } from '../../types/offer';
import { HumaneFriendlyOfferType } from '../../types/offer-type';
import { ThunkAppDispatch } from '../../types/store/actions';
import { AppRoute } from '../../utils/const';
import { floor } from '../../utils/function';

type FavoritesCardProps = {
  offer: Offer
};

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onToggleFavorite(offerId: number, isFavorite: boolean) {
    dispatch(toggleFavoriteStatus(offerId, isFavorite));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FavoritesCardProps;

function FavoritesCard({offer, onToggleFavorite}: ConnectedComponentProps): JSX.Element {
  const { id, previewImage, price, rating, title, type } = offer;

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt="Place"
          />
        </Link>
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
            onClick={() => onToggleFavorite(offer.id, !offer.isFavorite)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${floor(rating) / 10 * 100 * 2}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{HumaneFriendlyOfferType[type]}</p>
      </div>
    </article>
  );
}

export { FavoritesCard };
export default connector(FavoritesCard);
