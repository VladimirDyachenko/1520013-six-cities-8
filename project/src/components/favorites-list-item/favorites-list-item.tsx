import { Offer } from '../../types/offer';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritesListItemProps = {
  cityName: string;
  offers: Offer[]
};

function FavoritesListItem({cityName, offers}: FavoritesListItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#temp">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => <FavoritesCard key={offer.id} offer={offer}/>)}
      </div>
    </li>
  );
}

export default FavoritesListItem;
