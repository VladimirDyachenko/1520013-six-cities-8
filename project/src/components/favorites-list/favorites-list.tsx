import { FavoriteOffersInCity } from '../../types/offer';
import FavoritesListItem from '../favorites-list-item/favorites-list-item';

type FavoritesListProps = {
  favoriteOffersByCity: FavoriteOffersInCity[];
  onSetCity: (city: string) => void;
};

function FavoritesList({favoriteOffersByCity, onSetCity}: FavoritesListProps): JSX.Element {

  if (favoriteOffersByCity.length === 0) {
    return (
      <main className='page__main page__main--favorites page__main--favorites-empty'>
        <div className='page__favorites-container container'>
          <section className='favorites favorites--empty'>
            <h1 className='visually-hidden' data-testid='favorites-empty'>Favorites (empty)</h1>
            <div className='favorites__status-wrapper'>
              <b className='favorites__status'>Nothing yet saved.</b>
              <p className='favorites__status-description'>Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className='page__main page__main--favorites'>
      <div className='page__favorites-container container'>
        <section className='favorites'>
          <h1 className='favorites__title' data-testid='favorites-not-empty'>Saved listing</h1>
          <ul className='favorites__list'>
            {favoriteOffersByCity.map((city) => <FavoritesListItem key={city[0]} cityName={city[0]} offers={city[1]} onSetCity={onSetCity}/>)}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesList;
