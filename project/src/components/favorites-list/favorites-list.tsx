import { Offer } from '../../types/offer';
import FavoritesListItem from '../favorites-list-item/favorites-list-item';

type FavoritesListProps = {
  offers: Offer[];
};

type FavoritesOfferByCity = {[city: string]: Offer[]};

function FavoritesList({offers}: FavoritesListProps): JSX.Element {
  const favoriteOffersByCity: FavoritesOfferByCity = {};

  offers.forEach((offer) => {
    if (offer.isFavorite) {
      if (favoriteOffersByCity[offer.city.name]) {
        favoriteOffersByCity[offer.city.name].push(offer);
      } else {
        favoriteOffersByCity[offer.city.name] = [offer];
      }
    }
  });

  return (
    <ul className='favorites__list'>
      {Object.entries(favoriteOffersByCity).map((city) => <FavoritesListItem key={city[0]} cityName={city[0]} offers={city[1]}/>)}
    </ul>
  );
}

export default FavoritesList;
