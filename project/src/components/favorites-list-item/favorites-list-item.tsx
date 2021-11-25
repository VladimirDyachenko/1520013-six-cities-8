import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoritesListItemProps = {
  cityName: string;
  offers: Offer[];
  onSetCity: (city: string) => void;
};

function FavoritesListItem({cityName, offers, onSetCity}: FavoritesListItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            to={`/#${cityName}`}
            className="locations__item-link"
            onClick={() => onSetCity(cityName)}
            data-testid="link-to-main-page"
          >
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => <FavoriteCard key={offer.id} offer={offer}/>)}
      </div>
    </li>
  );
}

export default FavoritesListItem;
